import { Lightbulb, Code2, Layers, Cpu } from "lucide-react";

const principles = [
  {
    icon: <Code2 size={24} className="text-primary" />,
    title: "1. Outcome Over Output",
    description: "Writing code is easy; solving the actual business problem is hard. I focus on what the code enables, not just lines written. The Central AI Chatbot is a prime example—built not just to use AI, but to cut manual quoting time by 70%.",
  },
  {
    icon: <Layers size={24} className="text-[#2dd4bf]" />,
    title: "2. The Right Tool for the Job",
    description: "I don't force a specific tech stack onto a problem. If a structured JSON output is needed, OpenAI might be better; if multimodal context is key, Gemini Vision is the choice. MongoDB is great for flexible document storage, but PostgreSQL is strictly used for relational integrity.",
  },
  {
    icon: <Cpu size={24} className="text-[#fb923c]" />,
    title: "3. Systems Thinking",
    description: "Features don't exist in a vacuum. A voice-to-form integration isn't just an API call; it involves handling audio latency, transcription errors, parsing the structure, and returning a predictable object. Architecting systems ensures end-to-end reliability.",
  },
];

export default function ThinkingPage() {
  return (
    <section className="flex flex-col gap-12 py-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          How I Think <span className="font-mono text-sm text-muted-foreground ml-2">/ systems.md</span>
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
          The mental models and principles that drive my engineering decisions. A look at the "why" behind the code.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {principles.map((p, idx) => (
          <div key={idx} className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-8 transition-all hover:border-primary/30 hover:bg-card">
            <div className="p-3 bg-muted/50 rounded-2xl w-fit">
              {p.icon}
            </div>
            <h3 className="text-xl font-bold text-foreground mt-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
