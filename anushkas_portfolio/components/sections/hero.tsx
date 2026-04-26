"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Send, FileText, StopCircle } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

const metrics = [
  { label: "Apps shipped", value: "35+", sub: "end-to-end" },
  { label: "Manual work cut", value: "~70%", sub: "AI chatbot" },
  { label: "Efficiency gain", value: "60-80%", sub: "AI features" },
  { label: "Perf improved", value: "~40%", sub: "system-wide" },
];

const SUGGESTED_PROMPTS = [
  "What's your tech stack?",
  "Tell me about the AI chatbot",
  "Are you available to hire?",
  "What's your biggest project?",
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm Anushka's portfolio assistant. Ask me about her projects, stack, experience, or availability. 👋",
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
    <section className="relative flex flex-col gap-12 pt-8">
      {/* Name & Title */}
      <div className="flex flex-col md:flex-row gap-8 md:items-start justify-between">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              <Sparkles size={12} />
              Full Stack AI Engineer • Mumbai
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-[10px] font-bold text-primary uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Open for Collaboration
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                Freelance • Full-Time • Remote
              </span>
            </div>
          </div>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Engineering{" "}
            <span className="text-primary italic">intelligent</span> experiences
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            I build production-ready AI systems that solve real human problems.
            From automation to immersive interfaces, I turn ideas into
            high-performance reality.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://flowcv.com/resume/ebu6gfqrs0sp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              <FileText size={16} />
              Download Resume
            </a>
          </div>
        </div>

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group shrink-0"
        >
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary to-[#2dd4bf] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative h-44 w-44 md:h-72 md:w-72 overflow-hidden rounded-full border-2 border-primary/20 bg-muted shadow-2xl transition-all duration-500 group-hover:border-primary/50 group-hover:scale-[1.02]">
            <Image
              src="/image.png"
              alt="Anushka Sagvekar"
              fill
              sizes="(max-width: 768px) 176px, 288px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>
          <div className="absolute bottom-4 right-4 flex items-center justify-center h-12 w-12 rounded-full bg-card border border-border shadow-xl">
            <Sparkles size={20} className="text-primary" />
          </div>
        </motion.div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="flex flex-col gap-1 rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/20 hover:bg-card"
          >
            <span className="text-2xl font-bold text-foreground md:text-3xl">
              {metric.value}
            </span>
            <span className="text-xs font-medium text-foreground">
              {metric.label}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {metric.sub}
            </span>
          </motion.div>
        ))}
      </div>

      {/* AI Chat Assistant */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/30 p-6 md:p-8 backdrop-blur-md"
      >
        {/* Decorative glows */}
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-foreground">
                Anushka's Studio Assistant
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                Ask about projects, stack, or availability
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
              <span
                className={`h-1.5 w-1.5 rounded-full bg-primary ${
                  isStreaming ? "animate-pulse" : ""
                }`}
              />
              <span className="text-[10px] font-bold text-primary uppercase">
                {isStreaming ? "Typing..." : "Active"}
              </span>
            </div>
          </div>

          {/* Message thread */}
          <div className="flex flex-col gap-4 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div key={idx} className="flex gap-3">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    msg.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.role === "assistant" ? "A" : "U"}
                </div>
                {msg.role === "assistant" ? (
                  <div className="rounded-2xl bg-muted/50 p-4 text-sm leading-relaxed text-foreground max-w-[85%]">
                    {msg.content ||
                      (isStreaming && idx === messages.length - 1 ? (
                        <span className="inline-flex gap-1 items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                        </span>
                      ) : null)}
                    {/* Show project link hint when relevant */}
                    {msg.content.toLowerCase().includes("voice-to-form") && (
                      <Link
                        href="/projects/voice-to-form"
                        className="mt-2 inline-flex items-center gap-1 text-primary hover:underline text-xs"
                      >
                        See the case study <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-foreground self-center">
                    {msg.content}
                  </div>
                )}
              </div>
            ))}
            {error && <p className="text-xs text-destructive pl-11">{error}</p>}
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
                  className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-[11px] text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground hover:bg-muted disabled:opacity-50"
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
              className="h-14 w-full rounded-2xl border border-border bg-background px-6 pr-32 text-sm outline-none transition-all focus:border-primary/50 disabled:opacity-60"
            />
            <div className="absolute right-2 flex items-center gap-2">
              {isStreaming ? (
                <button
                  onClick={handleStop}
                  className="flex h-10 items-center gap-2 rounded-xl border border-border bg-muted px-4 text-xs font-bold text-muted-foreground transition-all hover:text-foreground"
                >
                  <StopCircle size={14} />
                  Stop
                </button>
              ) : (
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                >
                  Send <Send size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}