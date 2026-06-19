import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const runtime = "edge";

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 messages per IP per hour
    analytics: false,
});

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "anushkasagvekar1211@gmail.com";
// Resend lets you send from onboarding@resend.dev to your own account email
// without verifying a domain — fine for a personal contact form.
const FROM_EMAIL = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
            req.headers.get("x-real-ip") ??
            "unknown";

        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return Response.json(
                { error: "Too many messages. Please try again in an hour." },
                { status: 429 }
            );
        }

        const { name, email, message } = (await req.json()) as {
            name?: string;
            email?: string;
            message?: string;
        };

        // Validation
        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return Response.json(
                { error: "Name, email, and message are all required." },
                { status: 400 }
            );
        }
        if (!EMAIL_RE.test(email.trim())) {
            return Response.json(
                { error: "Please enter a valid email address." },
                { status: 400 }
            );
        }
        if (message.length > 5000) {
            return Response.json(
                { error: "Message is too long (5000 characters max)." },
                { status: 400 }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY not configured");
            return Response.json(
                { error: "Messaging is not configured yet. Please email me directly." },
                { status: 503 }
            );
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [TO_EMAIL],
                reply_to: email.trim(),
                subject: `Portfolio enquiry from ${name.trim()}`,
                text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
            }),
        });

        if (!res.ok) {
            const detail = await res.text();
            console.error("Resend API error:", detail);
            return Response.json(
                { error: "Could not send your message. Please email me directly." },
                { status: 502 }
            );
        }

        return Response.json({ ok: true });
    } catch (error) {
        console.error("Contact API error:", error);
        return Response.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
