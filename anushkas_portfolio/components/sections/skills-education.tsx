"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const skillGroups = [
  {
    layer: "UI & Frontend",
    color: "text-[#34d399]",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "TailwindCSS", "Framer Motion", "Shadcn UI", "HTML/CSS"],
  },
  {
    layer: "API & Backend",
    color: "text-[#60a5fa]",
    skills: ["Node.js", "Express.js", "REST API design", "RBAC middleware", "Auth systems"],
  },
  {
    layer: "Data & Persistence",
    color: "text-[#fb923c]",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Schema design", "Aggregation pipelines"],
  },
  {
    layer: "AI & Automation",
    color: "text-[#a78bfa]",
    skills: ["Gemini API", "Gemini Vision", "Multi-modal pipelines", "Prompt engineering", "Workflow automation"],
  },
  {
    layer: "Systems & Infra",
    color: "text-[#f472b6]",
    skills: ["Vercel", "Render", "Google Cloud", "GitHub", "Postman"],
  },
];

const education = [
  {
    degree: "BSc Computer Science",
    institution: "Mulund College of Commerce",
    location: "Mumbai",
    period: "Sep 2022 – Apr 2025",
    grade: "8.61",
    coursework: "Web Programming · MERN Stack · Advanced Web Tech · C#",
  },
  {
    degree: "HSC, Science",
    institution: "DG Ruparel College of Arts, Science and Commerce",
    location: "Mumbai",
    period: "Jul 2020 – Apr 2022",
    grade: null,
    coursework: null,
  },
];

export function SkillsEducation() {
  return (
    <section id="education" className="flex flex-col gap-12 py-12 border-t border-border/40">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Education
            </span>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Academic Background
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <div
                key={edu.degree}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card/40 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{edu.degree}</p>
                      <p className="text-xs text-primary font-medium">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-[10px] font-mono text-muted-foreground">{edu.period}</span>
                    {edu.grade && (
                      <span className="text-[10px] font-mono font-bold text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded">
                        GPA {edu.grade}
                      </span>
                    )}
                  </div>
                </div>
                {edu.coursework && (
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    {edu.coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Tech Stack
            </span>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              By Layer
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {skillGroups.map((group) => (
              <div
                key={group.layer}
                className="flex flex-col gap-2.5 rounded-2xl border border-border bg-card/40 p-4"
              >
                <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.15em] ${group.color}`}>
                  {group.layer}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-muted/60 border border-border/50 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
