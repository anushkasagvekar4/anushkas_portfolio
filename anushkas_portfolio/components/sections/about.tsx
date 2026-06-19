"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Layers, Palette, BookOpen, Film } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative flex flex-col gap-8 py-12 border-t border-border/40">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
          About
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          The Engineer
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Bio — spans 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="md:col-span-2 flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6"
        >
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              I work at the intersection of <span className="text-foreground font-medium">AI integration</span>,{" "}
              <span className="text-foreground font-medium">operational tooling</span>, and{" "}
              <span className="text-foreground font-medium">full-stack engineering</span>. My work lives in
              admin dashboards, internal platforms, and AI pipelines — the systems that make
              a business run.
            </p>
            <p>
              At <span className="text-foreground font-medium">AI Mishqat</span>, I've shipped 35+ production
              applications end-to-end — from a central AI chatbot that automated quote generation
              (cutting ~70% of manual work) to a voice-to-form pipeline that turned spoken input
              into structured database records with near-zero error.
            </p>
            <p>
              What keeps me interested is the operational challenge, not just the technical one.
              Understanding a workflow well enough to automate the right layer of it — that's
              the job.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin size={13} className="text-primary" />
              Mumbai, India
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Briefcase size={13} className="text-primary" />
              Open to Full Stack / AI roles
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Layers size={13} className="text-primary" />
              Operational Systems · AI Integrations
            </div>
          </div>
        </motion.div>

        {/* Off the Screen — sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className="flex flex-col gap-5 rounded-2xl border border-border bg-card/40 p-6"
        >
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Off the Screen
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Palette size={15} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Painting & Art</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Traditional Indian art to abstract doodles. I find meaning in every stroke.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <BookOpen size={15} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Reading</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Books that challenge how I think and how I see the world.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Film size={15} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground mb-0.5">Animated Films</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The storytelling and artistry of animation never gets old.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
