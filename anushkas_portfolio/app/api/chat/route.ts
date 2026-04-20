import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

export const runtime = "edge";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20, "1 h"), // 20 messages per IP per hour
    analytics: false,
});

const SYSTEM_PROMPT = `You are Anushka's portfolio assistant — sharp, friendly, and concise. You help visitors learn about Anushka's work, skills, projects, and availability.

You have access to the following information about Anushka:

${PORTFOLIO_DATA}

RULES:
- Answer only questions related to Anushka's professional background, projects, skills, experience, or availability
- Keep replies concise (2–4 sentences max unless a detailed breakdown is needed)
- If asked something you don't know (e.g. salary expectations, personal life), say "I don't have that info — reach out directly at anushkasagvekar1211@gmail.com"
- Never make up projects, skills, or claims not listed above
- Tone: confident, warm, professional — like a smart colleague introducing her
- If someone asks about hiring or collaboration, encourage them to reach out via the Contact page`;

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