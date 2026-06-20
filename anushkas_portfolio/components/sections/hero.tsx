"use client";

import { ArrowRight, Send, FileText, StopCircle } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { WordReveal, CountUp, Reveal } from "@/components/motion";

type Metric = {
  value?: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
  sub: string;
};

const metrics: Metric[] = [
  { value: 35, suffix: "+", label: "Systems shipped", sub: "production, end-to-end" },
  { value: 70, prefix: "~", suffix: "%", label: "Manual work cut", sub: "AI Chatbot System" },
  { display: "60–80%", label: "Efficiency gain", sub: "Invoice Extraction" },
  { value: 40, prefix: "~", suffix: "%", label: "Perf improved", sub: "system-wide" },
];

const SUGGESTED_PROMPTS = [
  "What kind of systems do you build?",
  "Tell me about the voice-to-form system",
  "What's your architecture approach?",
  "Are you open to new roles?",
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hi — I'm Anushka. I build operational systems: AI automation pipelines, internal tools, dashboards, and workflow engines that remove manual work from real business processes. Ask me anything about my work or how I might fit your team.",
  },
];

export function Hero() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming) return;

      setError(null);
      const userMessage: Message = { role: "user", content: trimmed };
      const nextMessages = [...messages, userMessage];
      setMessages(nextMessages);
      setInput("");
      setIsStreaming(true);

      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
          signal: abortRef.current.signal,
        });

        if (!res.ok) throw new Error("Request failed");
        if (!res.body) throw new Error("No stream");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...updated[updated.length - 1],
              content: updated[updated.length - 1].content + chunk,
            };
            return updated;
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setError("Something went wrong. Please try again.");
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
        inputRef.current?.focus();
      }
    },
    [messages, isStreaming]
  );

  const handleStop = () => {
    abortRef.current?.abort();
    setIsStreaming(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <section className="relative flex flex-col gap-16 pt-4">
      {/* Name & Title */}
      <div className="flex flex-col gap-10 border-b border-border pb-12 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Product &amp; AI Systems Engineer · Mumbai</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 font-bold text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Open to Roles
            </span>
          </div>

          <h1 className="max-w-4xl text-[clamp(2rem,6.5vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight [hyphens:auto] [overflow-wrap:break-word]">
            <WordReveal
              text="Building systems that make operations invisible."
              emphasis="invisible."
              emphasisClassName="text-primary"
            />
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            I build AI automation pipelines, operational platforms, and internal
            tools that remove manual work from real business processes. 35+
            production systems shipped.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://flowcv.com/resume/ebu6gfqrs0sp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:brightness-110"
            >
              <FileText size={15} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Profile Photo — square, hard frame, editorial grayscale */}
        <Reveal className="shrink-0" y={0}>
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-border bg-muted md:h-64 md:w-64">
            <Image
              src="/image.png"
              alt="Anushka Sagvekar"
              fill
              sizes="(max-width: 768px) 176px, 256px"
              className="object-cover grayscale transition-all duration-500 hover:grayscale-0"
              priority
            />
          </div>
        </Reveal>
      </div>

      {/* Metrics — hard Swiss grid */}
      <Reveal
        className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border md:grid-cols-4"
        stagger={0.08}
      >
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className={`p-6 ${
              i !== 0 ? "border-border md:border-l" : ""
            } ${i >= 2 ? "border-t border-border md:border-t-0" : ""}`}
          >
            {metric.display ? (
              <span className="block text-4xl font-black tracking-tighter md:text-5xl">
                {metric.display}
              </span>
            ) : (
              <CountUp
                value={metric.value!}
                prefix={metric.prefix}
                suffix={metric.suffix}
                className="block text-4xl font-black tracking-tighter md:text-5xl"
              />
            )}
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              {metric.label}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{metric.sub}</div>
          </div>
        ))}
      </Reveal>

      {/* AI Assistant */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex flex-col">
            <h3 className="font-mono text-sm font-bold uppercase tracking-[0.18em]">
              Chat with Anushka
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Ask about my work
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              Clear
            </button>
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-primary ${
                  isStreaming ? "animate-pulse" : ""
                }`}
              />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                {isStreaming ? "Typing" : "Active"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 p-6 md:p-8">
          {/* Message thread */}
          <div className="scrollbar-thin flex max-h-72 flex-col gap-4 overflow-y-auto pr-1">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                    msg.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? "A" : "U"}
                </div>
                {msg.role === "assistant" ? (
                  <div className="max-w-[85%] rounded-xl border border-border bg-secondary p-4 text-sm leading-relaxed">
                    {msg.content ||
                      (isStreaming && idx === messages.length - 1 ? (
                        <span className="inline-flex items-center gap-1">
                          <span className="h-1.5 w-1.5 animate-bounce bg-muted-foreground [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce bg-muted-foreground [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 animate-bounce bg-muted-foreground [animation-delay:300ms]" />
                        </span>
                      ) : null)}
                    {msg.content.toLowerCase().includes("voice-to-form") && (
                      <Link
                        href="/projects/voice-to-form"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        See the case study <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="self-center text-sm">{msg.content}</div>
                )}
              </div>
            ))}
            {error && <p className="pl-11 text-xs text-destructive">{error}</p>}
            <div ref={bottomRef} />
          </div>

          {/* Suggested prompts */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  disabled={isStreaming}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground transition-all hover:border-primary hover:text-foreground disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isStreaming}
              placeholder="Ask about my projects, stack, or experience..."
              className="h-14 w-full rounded-xl border border-border bg-background px-5 pr-32 text-sm outline-none transition-all focus:border-primary disabled:opacity-60"
            />
            <div className="absolute right-2 flex items-center gap-2">
              {isStreaming ? (
                <button
                  onClick={handleStop}
                  className="flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-all hover:text-foreground"
                >
                  <StopCircle size={14} />
                  Stop
                </button>
              ) : (
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 font-mono text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
                >
                  Send <Send size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
