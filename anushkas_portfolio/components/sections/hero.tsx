"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, ArrowRight, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const metrics = [
  { label: "Apps shipped", value: "35+", sub: "end-to-end" },
  { label: "Manual work cut", value: "~70%", sub: "AI chatbot" },
  { label: "Efficiency gain", value: "60-80%", sub: "AI features" },
  { label: "Perf improved", value: "~40%", sub: "system-wide" },
];

export function Hero() {
  return (
    <section className="relative flex flex-col gap-12 pt-8">
      {/* Name Title */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
          <Terminal size={12} />
          AI Full Stack Developer • Mumbai
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Building <span className="text-primary italic">AI systems</span> that ship to production
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground md:text-base">
          35+ real-world apps • Automation • CRM • AI workflows. AnushkaOS helps visitors experience building through direct interaction.
        </p>
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

      {/* Ask AI Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Ask Anushka AI
            </h3>
            <Sparkles size={16} className="text-primary" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                R
              </div>
              <div className="text-sm text-foreground">
                Do you have experience with voice AI?
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                A
              </div>
              <div className="rounded-2xl bg-muted/50 p-4 text-sm leading-relaxed text-foreground">
                Yes — I built a voice-to-form system at AI Mishqat. Audio input → Gemini transcription → structured form data, auto-populated. Improved data entry speed by ~60%.{" "}
                <button className="inline-flex items-center gap-1 text-primary hover:underline">
                  See the workflow <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="relative flex items-center">
            <input 
              type="text"
              placeholder="Ask about my projects, stack, or experience..."
              className="h-14 w-full rounded-2xl border border-border bg-background px-6 pr-16 text-sm outline-none transition-all focus:border-primary/50"
            />
            <button className="absolute right-2 flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95">
              Send <Send size={12} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
