"use client";

import { useRef, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// All motion is gated on prefers-reduced-motion. useGSAP() is layout-effect
// based, so hidden start states are set before paint (no flash); reduced-motion
// users keep natural CSS and see fully-rendered content.
const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";
const EASE = "power3.out";

/**
 * Masked word-by-word reveal for headlines. Splits in render (SSR-stable).
 * `onScroll` triggers when scrolled into view; otherwise plays on mount.
 */
export function WordReveal({
  text,
  as,
  className,
  emphasis,
  emphasisClassName,
  onScroll = false,
  delay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  emphasis?: string;
  emphasisClassName?: string;
  onScroll?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "span") as ElementType;
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        gsap.from(ref.current!.querySelectorAll("[data-word]"), {
          yPercent: 115,
          duration: 0.9,
          ease: EASE,
          stagger: 0.07,
          delay,
          ...(onScroll
            ? { scrollTrigger: { trigger: ref.current, start: "top 85%" } }
            : {}),
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
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
    </Tag>
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
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    },
    { scope: ref }
  );
  return (
    <span ref={ref} className={className}>
      {`${prefix}${value}${suffix}`}
    </span>
  );
}

/** Fades/rises children in on scroll. Optional stagger over direct children. */
export function Reveal({
  children,
  className,
  style,
  y = 24,
  stagger,
  onScroll = true,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
  stagger?: number;
  onScroll?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(NO_REDUCED_MOTION, () => {
        const targets =
          stagger != null ? ref.current!.children : ref.current;
        gsap.from(targets, {
          opacity: 0,
          y,
          duration: 0.8,
          ease: EASE,
          stagger,
          ...(onScroll
            ? { scrollTrigger: { trigger: ref.current, start: "top 88%" } }
            : {}),
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
