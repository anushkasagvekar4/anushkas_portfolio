"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const BLOG_POSTS = [
  {
    id: 1,
    title: "Beyond Code: Real-World Problem Solving",
    date: "Recent Post",
    preview: "At first, I thought development was mostly about writing code. But working on real-world projects changed that perspective. True value is created when a business moves from manual processes to a connected web application...",
    link: "https://www.linkedin.com/posts/anushkasagvekar_softwaredevelopment-fullstack-webdevelopment-activity-7448727543718817794-L6zJ?utm_source=share&utm_medium=member_android&rcm=ACoAAEMn23YBlHfhbFoOBHS498LnWqz2vTAh294",
    category: "Software Development",
  },
  {
    id: 2,
    title: "AI Assists, But Doesn't Replace Human Problem Solving",
    date: "Recent Post",
    preview: "Ever noticed how your brain feels different when you’re writing code line by line versus when you’re guiding an AI to do it? Both ways matter. One builds depth. The other opens possibilities...",
    link: "https://www.linkedin.com/posts/anushkasagvekar_softwaredevelopment-artificialintelligence-share-7453718108499755008-dIoh?utm_source=social_share_send&utm_medium=android_app&rcm=ACoAAEMn23YBlHfhbFoOBHS498LnWqz2vTAh294&utm_campaign=copy_link",
    category: "AI & Tech",
  },
  {
    id: 3,
    title: "Grateful for the Opportunity",
    date: "Recent Post",
    preview: "I want to take a moment to say thank you for the incredible opportunity. Working on real-world projects and learning alongside great people has been a huge stepping stone in my career...",
    link: "https://www.linkedin.com/posts/activity-7445675197896007680-Zcen?utm_source=share&utm_medium=member_android&rcm=ACoAAEMn23YBlHfhbFoOBHS498LnWqz2vTAh294",
    category: "Career Journey",
  },
  {
    id: 4,
    title: "Building Software for the Real World",
    date: "Recent Post",
    preview: "The moment a real company starts running its business on software you built, you realize something important. Coding is not just about writing features. It is about responsibility...",
    link: "https://www.linkedin.com/posts/anushkasagvekar_the-moment-a-real-company-starts-running-activity-7444578783279595521-_O34?utm_source=social_share_video_v2&utm_medium=android_app&rcm=ACoAAEMn23YBlHfhbFoOBHS498LnWqz2vTAh294&utm_campaign=copy_link",
    category: "Insights",
  },
];

export function Blog() {
  return (
    <section id="blog" className="relative flex flex-col gap-8 py-16">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-4xl">
          My <span className="text-primary italic">Space</span>
        </h2>
        <p className="text-sm text-muted-foreground md:text-base max-w-2xl">
          A place where I share my thoughts on AI, development, and the future of technology. I regularly post deep-dives and insights on LinkedIn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post, idx) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="group relative flex flex-col gap-4 rounded-3xl border border-border bg-card/30 p-6 backdrop-blur-md transition-all hover:border-primary/30 hover:bg-card/50"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar size={12} />
                <span className="text-[10px] font-medium">{post.date}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {post.preview}
              </p>
            </div>

            <div className="mt-auto pt-4 flex items-center justify-end border-t border-border/50">
              <Link
                href={post.link}
                target="_blank"
                className="flex items-center gap-2 text-xs font-bold text-foreground hover:text-primary transition-colors"
              >
                <LinkedinIcon width={14} height={14} className="text-[#0077b5]" />
                View Post
                <ExternalLink size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LinkedIn CTA */}
      <div className="flex justify-center mt-4">
        <Link
          href="https://www.linkedin.com/in/anushkasagvekar"
          target="_blank"
          className="group flex items-center gap-3 rounded-2xl bg-card border border-border px-8 py-4 text-sm font-bold transition-all hover:border-primary/50 hover:bg-primary/5"
        >
          <LinkedinIcon width={20} height={20} className="text-[#0077b5]" />
          <span>Follow my insights on LinkedIn</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
