"use client";

import { motion } from "framer-motion";
import { User, Palette, BookOpen, Film, Code, MapPin, Briefcase } from "lucide-react";

export function About() {
  return (
    <section id="about" className="relative flex flex-col gap-8 py-16 border-t border-border/40">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
          About <span className="text-primary italic">Me</span>
        </h2>
        <p className="text-sm text-muted-foreground md:text-base max-w-2xl">
          A glimpse into my background, my current focus, and what I do when I step away from the keyboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Professional Bio */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 rounded-3xl border border-border bg-card/30 p-8 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 text-primary">
            <User size={24} />
            <h3 className="text-xl font-bold text-foreground">My Journey</h3>
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm an AI-focused Full-Stack Developer building automation-first products for real businesses. Currently at <strong>AI Mishqat</strong>, I've built and shipped over 35 production applications—including central AI chatbots and voice-to-form systems that have cut manual workflows by up to 70%.
            </p>
            <p>
              What excites me most is creating systems that make operations faster, smarter, and more accessible. I don't just write code; I design how everything comes together—from scalable system architecture and seamless AI integrations to intuitive UI/UX. I love taking complex, real-world problems and turning them into powerful, easy-to-use MERN stack applications.
            </p>
            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm">
                <MapPin size={16} className="text-primary" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase size={16} className="text-primary" />
                <span>Open to Full Stack / AI Developer roles</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Code size={16} className="text-primary" />
                <span>Building with MERN Stack & AI</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Hobbies */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 rounded-3xl border border-border bg-card/30 p-8 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 text-primary">
            <Palette size={24} />
            <h3 className="text-xl font-bold text-foreground">Off the Screen</h3>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div className="flex gap-4">
              <div className="mt-1 shrink-0 rounded-full bg-primary/10 p-2 text-primary">
                <Palette size={18} />
              </div>
              <div>
                <h4 className="text-foreground font-bold mb-1">Painting & Art</h4>
                <p className="text-sm">I don’t just paint — I translate thoughts into colors. From traditional Indian art to messy doodles and abstract swirls, I find meaning in every stroke.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="mt-1 shrink-0 rounded-full bg-primary/10 p-2 text-primary">
                <BookOpen size={18} />
              </div>
              <div>
                <h4 className="text-foreground font-bold mb-1">Reading</h4>
                <p className="text-sm">Books shape my mind. I love diving into stories and perspectives that challenge the way I think and view the world.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 shrink-0 rounded-full bg-primary/10 p-2 text-primary">
                <Film size={18} />
              </div>
              <div>
                <h4 className="text-foreground font-bold mb-1">Animated Films</h4>
                <p className="text-sm">Animated films color my heart with timeless lessons. I appreciate the storytelling, artistry, and emotional depth they bring.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
