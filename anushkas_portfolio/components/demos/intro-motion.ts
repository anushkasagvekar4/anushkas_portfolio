import { gsap } from "gsap";

// Shared motion for the intro-character demos. Call these inside a useGSAP
// callback so selector scoping applies. Returns the infinite "ambient"
// tweens so the caller can kill them on cleanup.

export function startAmbient() {
  const tweens: gsap.core.Tween[] = [];

  // floating background shapes
  tweens.push(
    gsap.to("[data-float]", {
      y: "-=14",
      rotation: "+=10",
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: { each: 0.4, from: "random" },
    })
  );

  // typing hand tap
  tweens.push(
    gsap.to("[data-hand]", {
      y: -3,
      duration: 0.18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  );

  // coffee steam
  tweens.push(
    gsap.fromTo(
      "[data-steam]",
      { opacity: 0.5, y: 0 },
      { opacity: 0, y: -14, duration: 1.8, repeat: -1, ease: "sine.out", stagger: 0.5 }
    )
  );

  // soft screen glow pulse
  tweens.push(
    gsap.to("[data-screen]", {
      opacity: 0.32,
      duration: 1.6,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    })
  );

  // occasional blink
  tweens.push(
    gsap.to("[data-blink]", {
      scaleY: 0.1,
      duration: 0.09,
      repeat: -1,
      repeatDelay: 2.8,
      yoyo: true,
      ease: "none",
      svgOrigin: "210 111",
    })
  );

  // caret blink (if present)
  tweens.push(
    gsap.to("[data-caret]", {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: "steps(1)",
    })
  );

  return tweens;
}

/** Append a typewriter step (type → hold → clear) onto a timeline. */
export function typeInto(
  tl: gsap.core.Timeline,
  el: HTMLElement | null,
  text: string,
  { speed = 0.045, hold = 1.5, clear = true } = {}
) {
  const o = { n: 0 };
  tl.to(o, {
    n: text.length,
    duration: Math.max(0.4, text.length * speed),
    ease: "none",
    onUpdate: () => {
      if (el) el.textContent = text.slice(0, Math.round(o.n));
    },
  });
  tl.to({}, { duration: hold });
  if (clear) tl.add(() => {
    if (el) el.textContent = "";
  });
}

/** She glances up at the visitor, then back to the screen. */
export function glance(tl: gsap.core.Timeline) {
  tl.to("[data-head]", { rotation: -8, svgOrigin: "250 152", duration: 0.5, ease: "power2.out" }, "+=0.15");
  tl.to({}, { duration: 0.6 });
  tl.to("[data-head]", { rotation: 0, svgOrigin: "250 152", duration: 0.5, ease: "power2.in" });
}
