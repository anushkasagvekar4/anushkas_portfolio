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
  AI: "text-[#2dd4bf] bg-[#2dd4bf]/10 border-[#2dd4bf]/20",
  Automation: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
  "Full Stack": "text-[#fb923c] bg-[#fb923c]/10 border-[#fb923c]/20",
  CRM: "text-[#60a5fa] bg-[#60a5fa]/10 border-[#60a5fa]/20",
};

export function ProjectHub() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = projects.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Featured Projects
        </h2>
        <p className="text-muted-foreground italic">
          Selected works showcasing the intersection of AI and human-centered design.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-all duration-200",
              activeFilter === cat
                ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/20 hover:bg-card hover:shadow-[0_0_30px_rgba(167,139,250,0.08)]"
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest",
                    categoryColors[project.category] ?? "text-muted-foreground bg-muted/50 border-border"
                  )}
                >
                  {project.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  @{project.company}
                </span>
              </div>

              {/* Title & Impact */}
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground leading-relaxed">
                  {project.problem}
                </div>
              </div>

              {/* Impact Metric */}
              <div className="flex items-center gap-2 rounded-2xl bg-muted/50 px-4 py-2.5">
                <Zap size={14} className="text-primary shrink-0" />
                <span className="text-sm font-bold text-foreground">
                  {project.impactMetric}
                </span>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-muted/60 px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              <Link
                href={`/projects/${project.slug}`}
                className="mt-auto flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                View case study <ArrowUpRight size={12} />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
