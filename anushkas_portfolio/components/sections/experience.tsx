"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    title: "AI Full Stack Developer",
    company: "AI Mishqat",
    location: "Mumbai, India",
    period: "Feb 2024 - Present",
    description: "Leading the development of enterprise-grade AI systems and automation workflows.",
    points: [
      "Built 'Central AI Chatbot' reducing manual work by ~70%",
      "Developed Voice-to-Form system with 60% data entry speedup",
      "Architected Invoice Extraction pipeline using Gemini Vision API",
      "Integrated multi-role access control for internal AI tools",
    ],
    isLatest: true,
  },
  {
    title: "Full Stack Intern",
    company: "AI Mishqat",
    location: "Mumbai, India",
    period: "Sep 2023 - Jan 2024",
    description: "Supported the core engineering team in building visitor management and internal tools.",
    points: [
      "Developed Exhibition Kiosk System for event registrations",
      "Automated badge generation and email confirmation flows",
      "Optimized database queries for real-time visitor tracking",
    ],
  },
  {
    title: "Freelance Full Stack Developer",
    company: "SoloCraft / Personal",
    location: "Remote",
    period: "Jan 2023 - Aug 2023",
    description: "Built scalable web applications for local businesses and personal ventures.",
    points: [
      "Developed 'Pest Control CRM' with online booking and service tracking",
      "Built 'Multi-Vendor Cake Shop' with separate role-based dashboards",
      "Mastered MERN stack and Next.js through end-to-end production builds",
    ],
  },
];

export function Experience() {
  return (
    <section className="flex flex-col gap-12 py-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Experience <span className="text-muted-foreground font-mono text-sm ml-2">/ work-history.log</span>
        </h2>
        <p className="text-muted-foreground">My professional journey in AI and Software Engineering.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-border before:to-transparent md:before:ml-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={`${exp.company}-${idx}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative pl-12 md:pl-16"
          >
            {/* Timeline Dot */}
            <div className={`absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-card shadow-sm md:h-12 md:w-12 ${exp.isLatest ? "text-primary" : "text-muted-foreground"}`}>
              <Briefcase size={exp.isLatest ? 20 : 18} />
            </div>

            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 backdrop-blur-sm transition-all hover:bg-card">
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-foreground">
                    {exp.title}
                  </h3>
                  <div className="text-sm font-medium text-primary">
                    @{exp.company} • {exp.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                  <Calendar size={12} />
                  {exp.period}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {exp.description}
              </p>

              <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {exp.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-xs text-foreground/80">
                    <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-primary" />
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
