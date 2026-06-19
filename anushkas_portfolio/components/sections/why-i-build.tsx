"use client";

import { motion } from "framer-motion";

const philosophyPillars = [
  {
    id: "automation",
    label: "Automation First",
    headline: "Remove the layer, not the person.",
    body: "The most interesting engineering challenges are operational. I build systems that remove repetitive manual work — not by being clever, but by understanding the workflow deeply enough to make the technology invisible.",
  },
  {
    id: "systems",
    label: "Systems Over Features",
    headline: "The architecture outlasts the sprint.",
    body: "Features are temporary; architecture is permanent. I prioritize scalable data models and resilient API contracts that can handle 10x growth before the first line of UI is written.",
  },
  {
    id: "operational",
    label: "Operational Depth",
    headline: "Logic is the real challenge.",
    body: "True value lies in understanding business logic exceptions and edge cases. Engineering a solution requires listening to the people performing the task today before proposing the system of tomorrow.",
  },
];

export function WhyIBuild() {
  return (
    <section
      id="why-i-build"
      className="flex flex-col gap-12 py-12 border-t border-border/40"
    >
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Engineering Philosophy
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Why I Build
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        {/* Narrative Intro — spans 5 cols */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
            <p>
              I am drawn to <span className="text-foreground font-medium">operational complexity</span>. 
              The systems I find most satisfying to build are the ones that quietly remove friction from a business.
            </p>
            <p>
              Every system I&apos;ve shipped at AI Mishqat started with a human performing a manual, repetitive task. 
              Whether it was copying data between screens or re-typing numbers from a PDF, my job was to understand 
              that workflow well enough to automate it away.
            </p>
          </div>
        </motion.div>

        {/* Philosophy Pillars — spans 7 cols */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          {philosophyPillars.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-6 hover:bg-muted/30 transition-colors duration-200"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-primary">
                {p.label}
              </span>
              <h3 className="text-sm font-bold text-foreground leading-snug">
                {p.headline}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
