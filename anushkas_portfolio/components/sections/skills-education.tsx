"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Database, Wrench, Globe, Award, Palette, LayoutTemplate, Layers } from "lucide-react";

export function SkillsEducation() {
  return (
    <section className="flex flex-col gap-12 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Education <span className="text-muted-foreground font-mono text-sm ml-2">/ acad.log</span>
            </h2>
            <p className="text-muted-foreground">My academic background.</p>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card/50 p-6 md:p-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">BSc Computer Science</h3>
                  <div className="text-sm text-primary font-medium">Mulund College Of Commerce • Mumbai</div>
                </div>
              </div>
              <div className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full w-fit">
                2022 – 2025
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Gained practical experience in full-stack web development through coursework in Web Programming (HTML, CSS, JavaScript, XML, AJAX, jQuery, JSON, PHP, MySQL) and Advanced Web Technologies (MERN stack), C# focusing on both front-end and back-end skills.
            </p>
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Skills <span className="text-muted-foreground font-mono text-sm ml-2">/ tech.stack</span>
            </h2>
            <p className="text-muted-foreground">Technologies and tools I work with.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Frontend & UI */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <LayoutTemplate size={16} className="text-[#34d399]" />
                Frontend & UI
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Next.js", "React.js", "TypeScript", "JavaScript", "HTML/CSS", "TailwindCSS", "Bootstrap", "Framer Motion", "Shadcn UI", "Radix UI", "Aceternity UI"].map(s => (
                  <span key={s} className="bg-muted/80 px-2.5 py-1 rounded-lg text-xs font-mono text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>

            {/* Backend & DB */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Database size={16} className="text-[#60a5fa]" />
                Backend & Database
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Node.js", "Express.js", "MongoDB", "PostgreSQL", "MySQL", "REST APIs"].map(s => (
                  <span key={s} className="bg-muted/80 px-2.5 py-1 rounded-lg text-xs font-mono text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>

            {/* Tools & AI */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Wrench size={16} className="text-[#a78bfa]" />
                Tools, AI & DevOps
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Gemini API", "AI Integrations", "Workflow Automation", "Vercel", "Render", "Google Cloud", "VS Code", "Windsurf", "GitHub", "Postman"].map(s => (
                  <span key={s} className="bg-muted/80 px-2.5 py-1 rounded-lg text-xs font-mono text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>

            {/* Certificates & Soft Skills */}
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card/50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                <Award size={16} className="text-[#fbbf24]" />
                Certificates & Other
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["Tableau", "DevOps", "Graphic Designing", "Animation & Graphics", "Client Req Analysis", "Communication"].map(s => (
                  <span key={s} className="bg-muted/80 px-2.5 py-1 rounded-lg text-xs font-mono text-muted-foreground">{s}</span>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
