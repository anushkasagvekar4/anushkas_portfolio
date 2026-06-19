"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  SYSTEM_EDGES,
  SYSTEM_NODES,
  type Metric,
} from "@/lib/demo-content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Run animations only when the user hasn't asked to reduce motion.
// useGSAP() is layout-effect based, so initial hidden states are set
// before paint (no flash); reduced-motion users keep natural styles.
const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

const EASE = "power3.out";

/**
 * Masked word-by-word reveal. Splits in render (SSR-stable, no hydration
 * mismatch). `onScroll` triggers it when scrolled into view; otherwise it
 * plays on mount (for above-the-fold headlines).
 */
export function WordReveal({
  text,
  className,
  emphasis,
  emphasisClassName,
  onScroll = false,
  delay = 0,
}: {
  text: string;
  className?: string;
  emphasis?: string;
  emphasisClassName?: string;
  onScroll?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.from(ref.current!.querySelectorAll("[data-word]"), {
          yPercent: 115,
          duration: 0.9,
          ease: EASE,
          stagger: 0.08,
          delay,
          ...(onScroll
            ? { scrollTrigger: { trigger: ref.current, start: "top 80%" } }
            : {}),
        });
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const isEmphasis = emphasis && word === emphasis;
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <span
              data-word
              className={`inline-block ${isEmphasis ? emphasisClassName ?? "" : ""}`}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </span>
  );
}

/** Counts a number up from 0 when scrolled into view. */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const counter = { v: 0 };
        gsap.to(counter, {
          v: value,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${Math.round(counter.v)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref }
  );

  // Final value as SSR/no-JS/reduced-motion fallback.
  return (
    <span ref={ref} className={className}>
      {`${prefix}${value}${suffix}`}
    </span>
  );
}

/**
 * The signature moment: a workflow diagram whose connections draw
 * themselves and whose nodes pop in as you scroll — "invisible operations
 * becoming visible." Colors come from `currentColor`, so each demo themes
 * it by setting text color on the wrapper.
 */
export function SystemsDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const nodeById = Object.fromEntries(SYSTEM_NODES.map((n) => [n.id, n]));

  useGSAP(
    () => {
      const root = ref.current!;
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const paths = root.querySelectorAll<SVGPathElement>("[data-edge]");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root, start: "top 75%" },
        });
        tl.to(paths, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.18,
        });
        tl.from(
          root.querySelectorAll("[data-node]"),
          { scale: 0, opacity: 0, transformOrigin: "center", duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
          "-=0.8"
        );
        tl.from(
          root.querySelectorAll("[data-node-label]"),
          { opacity: 0, y: 6, duration: 0.4, stagger: 0.1 },
          "-=0.5"
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      <svg viewBox="0 0 800 360" className="w-full h-auto" fill="none">
        {SYSTEM_EDGES.map(([from, to], i) => {
          const a = nodeById[from];
          const b = nodeById[to];
          const midX = (a.x + b.x) / 2;
          return (
            <path
              key={i}
              data-edge
              d={`M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`}
              stroke="currentColor"
              strokeWidth={2}
              strokeOpacity={0.55}
              strokeLinecap="round"
            />
          );
        })}
        {SYSTEM_NODES.map((n) => (
          <g key={n.id}>
            <circle
              data-node
              cx={n.x}
              cy={n.y}
              r={10}
              fill="currentColor"
            />
            <circle
              data-node
              cx={n.x}
              cy={n.y}
              r={20}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeOpacity={0.4}
            />
            <text
              data-node-label
              x={n.x}
              y={n.y + 42}
              textAnchor="middle"
              className="fill-current text-[13px] font-medium"
              style={{ opacity: 0.75 }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Small wrapper that fades/rises its children in on scroll. */
export function RevealOnScroll({
  children,
  className,
  style,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.from(ref.current, {
          opacity: 0,
          y,
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
      });
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

export type { Metric };
