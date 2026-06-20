"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DevScene } from "@/components/demos/dev-scene";
import { IntroNav } from "@/components/demos/intro-nav";
import { startAmbient, typeInto, glance } from "@/components/demos/intro-motion";

gsap.registerPlugin(useGSAP);

const LINES = [
  "Welcome to my portfolio ☕",
  "Take a sip of coffee and explore my journey.",
  "AI Developer • Full Stack Engineer • Problem Solver",
];

export default function IntroFriendly() {
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
      intro.from("[data-bubble]", { opacity: 0, scale: 0.8, y: 10, duration: 0.4, ease: "back.out(2)" }, "-=0.2");

      const loop = gsap.timeline({ repeat: -1, paused: true });
      LINES.forEach((line, i) => {
        typeInto(loop, msg, line);
        if (i === 0) glance(loop);
      });
      loop.to({}, { duration: 0.4 });

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
      <div className="relative w-[min(92vw,720px)]">
        <DevScene className="h-auto w-full" />

        {/* chat bubble */}
        <div
          data-bubble
          className="absolute left-[2%] top-[10%] w-[42%] max-w-[260px] rounded-2xl rounded-bl-sm border border-border bg-card p-4 shadow-xl"
        >
          <div className="mb-2 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Anushka
            </span>
          </div>
          <p className="min-h-[2.6em] text-sm leading-relaxed text-foreground">
            <span data-msg />
            <span data-caret className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-primary align-middle" />
          </p>
        </div>
      </div>

      <IntroNav />
    </div>
  );
}
