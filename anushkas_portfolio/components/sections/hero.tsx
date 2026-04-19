"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, ArrowRight, Send, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

import Image from "next/image";

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
            Engineering <span className="text-primary italic">intelligent</span> experiences
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            I build production-ready AI systems that solve real human problems. From automation to immersive interfaces, I turn ideas into high-performance reality.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a 
              href="https://lingering-sound-567.linkyhost.com" 
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

      {/* Attention-Grabbing AI Assistant Section */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="relative overflow-hidden rounded-3xl border border-border bg-card/30 p-6 md:p-8 backdrop-blur-md"
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />
        
        <div className="relative flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-foreground">
                Anushka's Studio Assistant
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                Ask about my projects, stack, or availability
              </p>
            </div>
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase">Active</span>
            </div>
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
