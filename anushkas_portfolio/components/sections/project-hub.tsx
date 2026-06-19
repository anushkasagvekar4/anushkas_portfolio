"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import Link from "next/link";

const CATEGORIES = ["All", "AI", "Automation", "Full Stack", "CRM"] as const;
type Filter = (typeof CATEGORIES)[number];

const categoryColors: Record<string, string> = {
  AI: "text-[#2dd4bf] border-[#2dd4bf]/20",
  Automation: "text-[#a78bfa] border-[#a78bfa]/20",
  "Full Stack": "text-[#fb923c] border-[#fb923c]/20",
  CRM: "text-[#60a5fa] border-[#60a5fa]/20",
};

export function ProjectHub() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section id="systems" className="flex flex-col gap-8 border-t border-border/40 py-12">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Systems
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Case Studies
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Architecting operational systems that solve high-stakes business problems.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              "rounded-lg border px-3.5 py-1.5 text-xs font-mono transition-all duration-150",
              activeFilter === cat
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="group flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6 transition-all duration-200 hover:border-foreground/10 hover:bg-muted/10"
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-[10px] font-mono font-bold uppercase tracking-widest",
                  categoryColors[project.category] || "text-muted-foreground"
                )}>
                  {project.category}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground opacity-50">
                  @{project.company}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-bold text-foreground">
                  {project.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {project.problem}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Zap size={11} className="text-primary fill-primary/10" />
                <span className="text-[11px] font-mono font-bold text-foreground">
                  {project.impactMetric}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mt-auto">
                {project.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-muted/30 px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground uppercase"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="text-[9px] font-mono text-muted-foreground opacity-30 px-1.5 py-0.5">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors group/link"
              >
                Deep Dive <ArrowUpRight size={12} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
