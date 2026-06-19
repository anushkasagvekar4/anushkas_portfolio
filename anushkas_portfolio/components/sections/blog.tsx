"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Beyond Code: Real-World Problem Solving",
    category: "Operations",
    preview: "Development isn't just about syntax. It's about business value. Moving from manual processes to automated systems is where real impact lives...",
    link: "https://www.linkedin.com/posts/anushkasagvekar_softwaredevelopment-fullstack-webdevelopment-activity-7448727543718817794-L6zJ",
  },
  {
    id: 2,
    title: "AI as a Reasoning Engine",
    category: "AI",
    preview: "AI assists, but doesn't replace human logic. One builds depth; the other opens possibilities. Using multi-modal models to solve legacy problems...",
    link: "https://www.linkedin.com/posts/anushkasagvekar_softwaredevelopment-artificialintelligence-share-7453718108499755008-dIoh",
  },
  {
    id: 3,
    title: "The Responsibility of Software",
    category: "Insights",
    preview: "The moment a company runs its business on code you built, you realize coding isn't just about features. It's about responsibility and operational stability...",
    link: "https://www.linkedin.com/posts/anushkasagvekar_the-moment-a-real-company-starts-running-activity-7444578783279595521-_O34",
  },
];

export function Blog() {
  return (
    <section id="blog" className="flex flex-col gap-8 py-12 border-t border-border/40">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
          My Space
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Insights
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Thoughts on AI integration, operational systems, and building for the real world.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BLOG_POSTS.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card/40 p-6 hover:bg-muted/30 transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary">
                {post.category}
              </span>
              <ExternalLink size={12} className="text-muted-foreground opacity-30" />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold text-foreground leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                {post.preview}
              </p>
            </div>

            <Link
              href={post.link}
              target="_blank"
              className="mt-auto flex items-center gap-1.5 text-[11px] font-bold text-foreground hover:text-primary transition-colors"
            >
              Read on LinkedIn <ArrowRight size={10} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
