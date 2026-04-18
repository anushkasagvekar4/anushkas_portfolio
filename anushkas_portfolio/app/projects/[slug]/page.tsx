import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Target, Zap, Wrench, Info } from "lucide-react";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-12 bg-background min-h-screen">
      {/* Back Button */}
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            {project.category}
          </span>
          <span className="text-sm font-mono text-muted-foreground">
            @{project.company}
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* Impact Metric & Stack Strip */}
      <div className="flex flex-col md:flex-row gap-4 border-y border-border py-8">
        <div className="flex flex-1 flex-col gap-2 border-r-0 md:border-r border-border md:pr-8">
          <span className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
            <Zap size={14} className="text-primary" /> Key Outcome
          </span>
          <span className="text-xl font-bold text-foreground">
            {project.outcome}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 md:pl-8">
          <span className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
            <Wrench size={14} className="text-primary" /> Tech Stack
          </span>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-card border border-border px-3 py-1 text-xs font-mono text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Problem */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Info className="text-destructive" size={20} /> The Problem
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </div>

        {/* Approach */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Target className="text-[#2dd4bf]" size={20} /> The Approach & Solution
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {project.approach}
          </p>
        </div>
      </div>
      
      {/* Demo Section Placeholder (For Workflow Viz if added later) */}
      <div className="mt-8 rounded-3xl border border-border bg-card/30 p-8 flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-sm font-mono text-muted-foreground">
          // Interactive Demo / Diagram Space
        </span>
      </div>
    </div>
  );
}
