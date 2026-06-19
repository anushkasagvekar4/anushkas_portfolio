"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type Highlight = {
  value: string;
  label: string;
  sub: string;
  className?: string;
};

const highlights: Highlight[] = [
  { 
    value: "35+", 
    label: "Production apps shipped", 
    sub: "Full-stack systems from ideation to deployment.",
    className: "md:col-span-2 md:row-span-2 bg-primary/5 border-primary/10" 
  },
  { 
    value: "~70%", 
    label: "Manual work eliminated", 
    sub: "Achieved through central AI orchestration.",
    className: "md:col-span-2" 
  },
  { 
    value: "60–80%", 
    label: "Efficiency gain", 
    sub: "Invoice extraction pipeline automation.",
    className: "md:col-span-2" 
  },
  { 
    value: "~40%", 
    label: "Perf improvement", 
    sub: "System-wide optimization and caching.",
    className: "md:col-span-1" 
  },
  { 
    value: "5+", 
    label: "AI systems", 
    sub: "Multi-modal vision & speech.",
    className: "md:col-span-2" 
  },
  { 
    value: "~60%", 
    label: "Faster data entry", 
    sub: "Voice-to-form automation.",
    className: "md:col-span-2" 
  },
];

function CountUp({ target, duration = 1200 }: { target: string; duration?: number }) {
  const [display, setDisplay] = useState("0");
  const hasRun = useRef(false);

  const match = target.match(/^([~]?)(\d+(?:\.\d+)?)([\+\-%–]?.*)$/);
  const prefix = match?.[1] ?? "";
  const num = parseFloat(match?.[2] ?? "0");
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    if (hasRun.current || isNaN(num)) return;
    hasRun.current = true;

    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [num, prefix, suffix, duration]);

  return <>{display}</>;
}

export function EngineeringHighlights() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="flex flex-col gap-8 py-12 border-t border-border/40">
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Impact Metrics
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Engineering Highlights
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:grid-rows-2">
        {highlights.map((h, idx) => (
          <div
            key={h.label}
            className={cn(
              "flex flex-col justify-between gap-3 rounded-2xl border border-border bg-card/40 p-6 transition-all duration-300 hover:border-foreground/10",
              h.className,
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-foreground font-mono tabular-nums tracking-tighter">
                {inView ? <CountUp target={h.value} duration={1000 + idx * 80} /> : "0"}
              </span>
              <span className="text-sm font-semibold text-foreground">
                {h.label}
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground leading-relaxed">
              {h.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
