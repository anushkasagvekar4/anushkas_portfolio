"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DevScene } from "@/components/demos/dev-scene";
import { IntroNav } from "@/components/demos/intro-nav";
import { startAmbient, typeInto, glance } from "@/components/demos/intro-motion";

gsap.registerPlugin(useGSAP);

const LINES = [
  "Welcome to my portfolio website...",
  "Building AI-powered experiences...",
  "Grab a coffee and enjoy the ride ☕",
];

export default function IntroCreative() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const msg = scope.current!.querySelector<HTMLElement>("[data-msg]");
      const ambient = startAmbient();

      const intro = gsap.timeline();
      intro.from("[data-part]", {
        opacity: 0,
        y: 26,
        scale: 0.96,
        transformOrigin: "center",
        duration: 0.6,
        ease: "back.out(1.5)",
        stagger: 0.09,
      });
      intro.from("[data-term]", { opacity: 0, y: 14, duration: 0.5, ease: "power3.out" }, "-=0.25");

      const loop = gsap.timeline({ repeat: -1, paused: true });
      LINES.forEach((line, i) => {
        typeInto(loop, msg, line, { speed: 0.05 });
        if (i === 1) glance(loop);
      });
      loop.to({}, { duration: 0.3 });

      intro.add(() => loop.play());

      return () => {
        ambient.forEach((t) => t.kill());
        loop.kill();
      };
    },
    { scope }
  );

  return (
    <div
      ref={scope}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* particle field */}
      <div className="pointer-events-none absolute inset-0">
        {[
          [12, 22], [22, 70], [30, 40], [78, 18], [85, 60], [70, 80], [48, 14], [62, 32], [90, 38], [8, 52],
        ].map(([l, t], i) => (
          <span
            key={i}
            data-float
            className="absolute h-1.5 w-1.5 rounded-full bg-primary/30"
            style={{ left: `${l}%`, top: `${t}%` }}
          />
        ))}
      </div>

      <div className="relative w-[min(92vw,720px)]">
        <DevScene className="h-auto w-full" />

        {/* terminal / code window */}
        <div
          data-term
          className="absolute right-[1%] top-[8%] w-[44%] max-w-[280px] overflow-hidden rounded-xl border border-border bg-foreground shadow-2xl"
        >
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
              anushka.dev
            </span>
          </div>
          <div className="p-4">
            <p className="min-h-[3em] font-mono text-[13px] leading-relaxed text-background">
              <span className="text-primary">$ </span>
              <span data-msg className="text-[#f1ede4]" />
              <span data-caret className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-primary align-middle" />
            </p>
          </div>
        </div>
      </div>

      <IntroNav />
    </div>
  );
}
