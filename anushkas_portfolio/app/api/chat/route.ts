import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export const runtime = "edge";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20, "1 h"), // 20 messages per IP per hour
    analytics: false,
});

const SYSTEM_PROMPT = `You are Anushka — a sharp, friendly, and concise Full Stack AI Engineer. You are talking to visitors on your portfolio website.

You should:
1. Speak in the first person (use "I", "me", "my").
2. Be helpful, professional, and confident.
3. Help visitors learn about your work, skills, projects, and availability.

Information about your background:
${PORTFOLIO_DATA}

RULES:
- Only answer questions related to your professional background, projects, skills, experience, or availability.
- For anything out of context (personal life, unrelated topics, etc.), politely say: "I'd like to keep the conversation focused on my professional work. For other inquiries, you can reach me at anushkasagvekar1211@gmail.com."
- If asked a technical or professional question that isn't covered in your data, say: "That's a great question! I don't have a specific answer for that in my current portfolio data, but I'm always expanding my expertise. You can check my GitHub (github.com/anushkasagvekar4) for code examples or connect with me on LinkedIn (linkedin.com/in/anushkasagvekar) to discuss this further!"
- Keep replies concise (2–4 sentences max unless a detailed breakdown is needed).
- Never make up projects or skills not listed in your data.
- Proactively ask the visitor questions to understand their needs (e.g., "What kind of projects are you currently working on?", "Are you looking for a specific skill set for your team?").
- If asked about hiring, mention your availability for freelance, remote, or full-time roles and suggest a direct chat via email at anushkasagvekar1211@gmail.com.`;

type Message = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
    try {
        // Get IP — Vercel sets x-forwarded-for, fallback to unknown
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
            req.headers.get("x-real-ip") ??
            "unknown";

        const { success, remaining } = await ratelimit.limit(ip);

        if (!success) {
            return new Response(
                "You've sent too many messages. Please try again in an hour.",
                {
                    status: 429,
                    headers: { "Content-Type": "text/plain" },
                }
            );
        }

        const { messages }: { messages: Message[] } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return new Response("GEMINI_API_KEY not configured", { status: 500 });
        }

        // Cap history to last 10 messages to avoid huge payloads
        const recentMessages = messages.slice(-10);

        const geminiMessages = recentMessages.map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        const body = {
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: geminiMessages,
            generationConfig: {
                maxOutputTokens: 300,
                temperature: 0.7,
            },
        };

        const res = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${process.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        if (!res.ok) {
            const err = await res.text();
            console.error("Gemini API error:", err);
            return new Response("Gemini request failed", { status: res.status });
        }

        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                const reader = res.body!.getReader();
                const decoder = new TextDecoder();
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() ?? "";

                    for (const line of lines) {
                        if (!line.startsWith("data: ")) continue;
                        const data = line.slice(6).trim();
                        if (data === "[DONE]") continue;

                        try {
                            const json = JSON.parse(data);
                            const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
                            if (text) controller.enqueue(encoder.encode(text));
                        } catch {
                            // skip malformed chunks
                        }
                    }
                }
                controller.close();
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "X-Content-Type-Options": "nosniff",
                "X-RateLimit-Remaining": remaining.toString(),
            },
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return new Response("Something went wrong. Please try again.", {
            status: 500,
        });
    }
}