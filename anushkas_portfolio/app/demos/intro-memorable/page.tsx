"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DevScene } from "@/components/demos/dev-scene";
import { IntroNav } from "@/components/demos/intro-nav";
import { startAmbient, typeInto, glance } from "@/components/demos/intro-motion";

gsap.registerPlugin(useGSAP);

const LINES = [
  "Welcome to my world of code.",
  "AI • Web Development • Innovation",
  "Take a sip of coffee and explore my journey.",
];

export default function IntroMemorable() {
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

      const loop = gsap.timeline({ repeat: -1, paused: true });
      LINES.forEach((line, i) => {
        // float the line container in as it types
        loop.fromTo(
          "[data-floattext]",
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
        typeInto(loop, msg, line, { clear: false });
        loop.to("[data-floattext]", { y: -14, opacity: 0, duration: 0.5, ease: "power2.in", delay: 0.2 });
        loop.add(() => {
          if (msg) msg.textContent = "";
        });
        if (i === 0) glance(loop);
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
      {/* warm glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex w-[min(92vw,720px)] flex-col items-center">
        {/* floating text in the air */}
        <div className="flex h-28 items-center justify-center">
          <p
            data-floattext
            className="max-w-xl text-center text-[clamp(1.4rem,4vw,2.4rem)] font-black uppercase leading-tight tracking-tight text-foreground"
          >
            <span data-msg />
            <span data-caret className="ml-1 inline-block h-[1em] w-[3px] translate-y-[3px] bg-primary align-middle" />
          </p>
        </div>

        <DevScene className="h-auto w-full" />
      </div>

      <IntroNav />
    </div>
  );
}
