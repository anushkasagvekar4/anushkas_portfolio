import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Zap, Wrench, AlertCircle, Lightbulb, GitMerge, Scale, TrendingUp } from "lucide-react";

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

  const arch = project.architecture;

  const archSections = arch
    ? [
        {
          icon: AlertCircle,
          label: "The Problem",
          color: "text-red-400",
          bgColor: "bg-red-500/5 border-red-500/10",
          content: arch.problem,
        },
        {
          icon: Scale,
          label: "The Constraint",
          color: "text-amber-400",
          bgColor: "bg-amber-500/5 border-amber-500/10",
          content: arch.constraint,
        },
        {
          icon: Lightbulb,
          label: "The Key Decision",
          color: "text-primary",
          bgColor: "bg-primary/5 border-primary/10",
          content: arch.decision,
        },
        {
          icon: GitMerge,
          label: "The Tradeoff",
          color: "text-violet-400",
          bgColor: "bg-violet-500/5 border-violet-500/10",
          content: arch.tradeoff,
        },
        {
          icon: TrendingUp,
          label: "Scaling Concern",
          color: "text-teal-400",
          bgColor: "bg-teal-500/5 border-teal-500/10",
          content: arch.scalingConcern,
        },
      ]
    : [];

  return (
    <div className="flex flex-col gap-12 bg-background min-h-screen">
      {/* Back Button */}
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      {/* TL;DR Row */}
      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground border border-border rounded-xl px-4 py-3 bg-card/30">
        <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-widest text-primary">
          {project.category}
        </span>
        <span className="opacity-30">·</span>
        <span>{project.stack.join(" + ")}</span>
        <span className="opacity-30">·</span>
        <span>@{project.company}</span>
        <span className="opacity-30">·</span>
        <span className="flex items-center gap-1 text-primary font-bold">
          <Zap size={11} /> {project.impactMetric}
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* Outcome Strip */}
      <div className="flex flex-col md:flex-row gap-4 border-y border-border py-6">
        <div className="flex flex-1 flex-col gap-1.5 border-r-0 md:border-r border-border md:pr-8">
          <span className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
            <Zap size={13} className="text-primary" /> Outcome
          </span>
          <span className="text-base font-semibold text-foreground">
            {project.outcome}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 md:pl-8">
          <span className="flex items-center gap-2 text-xs font-mono uppercase text-muted-foreground">
            <Wrench size={13} className="text-primary" /> Stack
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

      {/* Approach */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-muted-foreground">
          Approach & Solution
        </h2>
        <p className="text-base text-foreground/80 leading-relaxed max-w-3xl">
          {project.approach}
        </p>
      </div>

      {/* Behind the Architecture */}
      {arch && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Behind the Architecture
            </h2>
            <p className="text-sm text-muted-foreground">
              The engineering decisions, constraints, and tradeoffs that shaped this system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archSections.map(({ icon: Icon, label, color, bgColor, content }) => (
              <div
                key={label}
                className={`flex flex-col gap-3 rounded-2xl border p-5 ${bgColor}`}
              >
                <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest ${color}`}>
                  <Icon size={13} />
                  {label}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Demo / Diagram Space */}
      <div className="rounded-3xl border border-border bg-card/30 p-8 flex flex-col items-center justify-center min-h-[280px]">
        <span className="text-xs font-mono text-muted-foreground opacity-40 uppercase tracking-[0.2em]">
          {"// Interactive Demo · Diagram · Coming Soon"}
        </span>
      </div>
    </div>
  );
}
