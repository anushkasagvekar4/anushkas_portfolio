"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";

const experiences = [
  {
    title: "Junior AI Developer (Full Stack)",
    company: "AI Mishqat",
    location: "Mumbai, India (Marol, Andheri)",
    period: "Dec 2025 - Present",
    description: "Built and deployed 35+ production applications end-to-end, integrated AI features, mentored interns, and collaborated with clients.",
    points: [
      "Developed central AI chatbot to automate workflows, reducing manual work by ~70%",
      "Built AI features like voice-to-form and invoice extraction, improving efficiency by 60–80%",
      "Improved system performance by ~40% and reduced load time by 30–50%",
      "Mentored interns, reviewed code, and led client requirement analysis",
    ],
    isLatest: true,
  },
  {
    title: "Junior AI Developer Full Stack Intern",
    company: "AI Mishqat",
    location: "Mumbai, India (Marol, Andheri)",
    period: "Sep 2025 - Dec 2025",
    description: "Contributed to real-world features, workflow improvements, and full-stack application development.",
    points: [
      "Built an exhibition kiosk system for registration, badge printing, and email automation",
      "Developed landing pages from scratch using Tailwind CSS and UI libraries",
      "Worked on full-stack apps end-to-end encompassing frontend, backend, DB, and AI integrations",
    ],
  },
  {
    title: "Full Stack Developer Intern (Freelance)",
    company: "SoloCraft",
    location: "Remote",
    period: "Aug 2025 - Dec 2025",
    description: "Built multiple full-stack applications from scratch focusing on scalable architecture and secure APIs.",
    points: [
      "Built apps including Expense Tracker, Multi-vendor Cake Ordering System, and CRUD apps",
      "Worked with MERN stack, Next.js, and PostgreSQL",
      "Implemented secure authentication, CRUD ops, and form validation libraries",
    ],
  },
];

export function Experience() {
  return (
    <section className="flex flex-col gap-12 py-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Experience
        </h2>
        <p className="text-muted-foreground italic">Building my journey in AI and Software Engineering.</p>
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
                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full uppercase tracking-wider">
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
