"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Junior AI Developer (Full Stack)",
    company: "AI Mishqat",
    location: "Mumbai · Marol, Andheri",
    period: "Dec 2025 — Present",
    points: [
      "Built and deployed 35+ production applications end-to-end",
      "Built central AI chatbot automating workflows, cutting manual work by ~70%",
      "Built voice-to-form pipeline (audio → Gemini → JSON → auto-filled form), improving data entry by ~60%",
      "Built invoice extraction system (PDF → Gemini Vision → structured data → DB), 60–80% efficiency gain",
      "Improved system performance by ~40% and reduced load times by 30–50%",
      "Mentored interns, reviewed code, led client requirement analysis",
    ],
    isLatest: true,
  },
  {
    title: "Junior AI Developer — Intern",
    company: "AI Mishqat",
    location: "Mumbai · Marol, Andheri",
    period: "Sep 2025 — Dec 2025",
    points: [
      "Built exhibition kiosk system: registration, badge printing, email automation",
      "Developed landing pages and full-stack apps with frontend, backend, DB, and AI integrations",
    ],
    isLatest: false,
  },
  {
    title: "Full Stack Developer — Intern (Freelance)",
    company: "SoloCraft",
    location: "Remote",
    period: "Aug 2025 — Dec 2025",
    points: [
      "Built Expense Tracker, Multi-vendor Cake Ordering System, and CRUD apps",
      "Stack: MERN, Next.js, PostgreSQL — with auth, form validation, and REST APIs",
    ],
    isLatest: false,
  },
];

export function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-8 py-12 border-t border-border/40">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Experience
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Where I&apos;ve Shipped
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col gap-0">
        {/* Vertical line */}
        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-border md:left-[7px]" />

        {experiences.map((exp, idx) => (
          <motion.div
            key={`${exp.company}-${idx}`}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.08 }}
            className="relative pl-8 md:pl-10 pb-8 last:pb-0"
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-background md:h-3.5 md:w-3.5 ${
                exp.isLatest ? "bg-primary" : "bg-border"
              }`}
            />

            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5 hover:bg-card transition-colors duration-200">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-foreground">{exp.title}</p>
                  <p className="text-xs text-primary font-mono font-medium">
                    {exp.company} · {exp.location}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground bg-muted/50 border border-border px-2.5 py-1 rounded-lg whitespace-nowrap shrink-0 h-fit">
                  {exp.period}
                </span>
              </div>

              {/* Bullet points */}
              <ul className="flex flex-col gap-1.5">
                {exp.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
