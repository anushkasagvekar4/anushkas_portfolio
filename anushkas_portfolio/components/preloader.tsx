"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SESSION_KEY = "intro-shown";

// Warm illustration tones (paired with the brand brown for hair/accents).
const SKIN = "#f1d6bb";
const BLUSH = "#e7a98a";
const LID = "#d4d9e1";
const KEYS = "#b9bfc8";

/**
 * One-time brand intro: a flat-design illustration of a girl in glasses
 * typing at her laptop. Parts animate in, her hands tap, the logo writes,
 * a loading bar fills, then the screen lifts to reveal the site.
 * Shown once per session; respects prefers-reduced-motion.
 */
export function Preloader() {
  const [visible, setVisible] = useState(true);
  const overlay = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // In dev, always replay so the intro can be reviewed on every reload.
      // In production, show it only once per browser session.
      const replayAlways = process.env.NODE_ENV !== "production";
      let seen = false;
      try {
        seen = sessionStorage.getItem(SESSION_KEY) === "1";
      } catch {}
      if (seen && !replayAlways) {
        setVisible(false);
        return;
      }

      const finish = () => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {}
        setVisible(false);
      };

      const root = overlay.current!;
      const parts = root.querySelectorAll("[data-part]");
      const textEl = root.querySelector<HTMLElement>("[data-caption-text]");
      const MESSAGE = "Welcome to my portfolio — take a sip & explore my work.";
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (textEl) textEl.textContent = MESSAGE;
        gsap
          .timeline({ onComplete: finish })
          .to({}, { duration: 2.4 })
          .to(root, { autoAlpha: 0, duration: 0.4 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Continuous "life" while the intro is on screen.
        const typing = gsap.to("[data-hand]", {
          y: -4,
          duration: 0.22,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.11,
        });
        const bob = gsap.to("[data-illustration]", {
          y: -7,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        const steam = gsap.fromTo(
          "[data-steam]",
          { opacity: 0.45, y: 0 },
          { opacity: 0, y: -12, duration: 1.8, repeat: -1, ease: "sine.out", stagger: 0.5 }
        );
        const caret = gsap.to("[data-caret]", {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        });

        const typer = { n: 0 };
        const tl = gsap.timeline({
          onComplete: () => {
            [typing, bob, steam, caret].forEach((t) => t.kill());
            finish();
          },
        });

        tl.from(parts, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          transformOrigin: "center",
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.12,
        })
          .from(
            "[data-logo]",
            { opacity: 0, y: 18, duration: 0.7, ease: "power3.out" },
            "-=0.1"
          )
          .from(
            "[data-caption]",
            { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" },
            "-=0.2"
          )
          // she types the welcome message
          .to(
            typer,
            {
              n: MESSAGE.length,
              duration: 2.6,
              ease: "none",
              onUpdate: () => {
                if (textEl) textEl.textContent = MESSAGE.slice(0, Math.round(typer.n));
              },
            },
            "+=0.1"
          )
          // hold so it can be read, then reveal the site
          .to({}, { duration: 1.3 })
          .to(root, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
      });
    },
    { scope: overlay }
  );

  if (!visible) return null;

  return (
    <div
      ref={overlay}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-background"
      aria-hidden
    >
      <svg
        data-illustration
        viewBox="0 0 360 340"
        className="w-[min(72vw,330px)]"
        fill="none"
      >
        {/* desk */}
        <g data-part>
          <rect x="28" y="300" width="304" height="10" rx="5" fill="var(--primary)" opacity="0.18" />
        </g>

        {/* sweater + arms (behind) */}
        <g data-part fill="var(--foreground)">
          <path d="M122 252 C122 200 148 186 180 186 C212 186 238 200 238 252 Z" />
          <path d="M126 206 C107 222 103 252 112 286 L142 286 C135 254 139 228 152 212 Z" />
          <path d="M234 206 C253 222 257 252 248 286 L218 286 C225 254 221 228 208 212 Z" />
        </g>

        {/* hair (back) — brand brown */}
        <g data-part>
          <path
            fill="var(--primary)"
            d="M180 60 C131 60 117 104 120 152 C121 172 129 188 139 200 L152 200 C141 184 138 162 138 140 C138 116 152 92 180 92 C208 92 222 116 222 140 C222 162 219 184 208 200 L221 200 C231 188 239 172 240 152 C243 104 229 60 180 60 Z"
          />
        </g>

        {/* neck */}
        <g data-part>
          <rect x="168" y="160" width="24" height="32" rx="11" fill={SKIN} />
        </g>

        {/* face */}
        <g data-part>
          <ellipse cx="180" cy="122" rx="44" ry="50" fill={SKIN} />
          <circle cx="137" cy="128" r="8" fill={SKIN} />
          <circle cx="223" cy="128" r="8" fill={SKIN} />
          <circle cx="156" cy="140" r="7" fill={BLUSH} opacity="0.45" />
          <circle cx="204" cy="140" r="7" fill={BLUSH} opacity="0.45" />
          {/* bangs */}
          <path
            fill="var(--primary)"
            d="M137 112 C146 90 162 82 180 82 C198 82 214 90 223 112 C208 100 195 95 180 95 C165 95 152 100 137 112 Z"
          />
          {/* brows */}
          <path d="M150 108 Q160 103 170 107" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M190 107 Q200 103 210 108" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          {/* content eyes */}
          <path d="M153 121 Q160 127 167 121" stroke="var(--foreground)" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M193 121 Q200 127 207 121" stroke="var(--foreground)" strokeWidth="2.6" strokeLinecap="round" />
          {/* nose + smile */}
          <path d="M180 132 L176 142 L183 142" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
          <path d="M170 150 Q180 159 190 150" stroke="var(--foreground)" strokeWidth="2.6" strokeLinecap="round" />
        </g>

        {/* glasses */}
        <g data-part>
          <circle cx="160" cy="123" r="16" fill="#ffffff" fillOpacity="0.25" stroke="var(--foreground)" strokeWidth="3.5" />
          <circle cx="200" cy="123" r="16" fill="#ffffff" fillOpacity="0.25" stroke="var(--foreground)" strokeWidth="3.5" />
          <line x1="174" y1="121" x2="186" y2="121" stroke="var(--foreground)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="144" y1="121" x2="133" y2="124" stroke="var(--foreground)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="216" y1="121" x2="227" y2="124" stroke="var(--foreground)" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* laptop lid (covers lower torso) */}
        <g data-part>
          <rect x="118" y="210" width="124" height="74" rx="11" fill={LID} stroke="var(--foreground)" strokeWidth="2.5" />
          <circle cx="180" cy="247" r="7" fill="var(--primary)" />
        </g>

        {/* keyboard deck */}
        <g data-part>
          <path d="M110 284 L250 284 L268 302 L92 302 Z" fill={KEYS} stroke="var(--foreground)" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="120" y1="293" x2="240" y2="293" stroke="var(--foreground)" strokeWidth="1.5" opacity="0.4" />
        </g>

        {/* coffee mug + steam ("take a sip") */}
        <g data-part>
          <path data-steam d="M80 266 c-5 -5 5 -9 0 -16" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path data-steam d="M89 266 c-5 -5 5 -9 0 -16" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path d="M68 272 L68 292 C68 300 74 303 82 303 L88 303 C96 303 102 300 102 292 L102 272 Z" fill="var(--card)" stroke="var(--foreground)" strokeWidth="2.5" strokeLinejoin="round" />
          <ellipse cx="85" cy="272" rx="17" ry="4.5" fill="var(--card)" stroke="var(--foreground)" strokeWidth="2.5" />
          <rect x="70" y="283" width="30" height="6" fill="var(--primary)" />
          <path d="M102 279 C114 279 114 295 102 295" stroke="var(--foreground)" strokeWidth="2.5" fill="none" />
        </g>

        {/* hands (typing) */}
        <g data-hand>
          <rect x="112" y="282" width="36" height="15" rx="7.5" fill={SKIN} stroke="var(--foreground)" strokeWidth="2" />
        </g>
        <g data-hand>
          <rect x="212" y="282" width="36" height="15" rx="7.5" fill={SKIN} stroke="var(--foreground)" strokeWidth="2" />
        </g>
      </svg>

      {/* name + typed welcome */}
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span
          data-logo
          className="whitespace-nowrap font-script text-[clamp(1.9rem,7vw,3.2rem)] leading-none text-foreground"
        >
          Anushka Sagvekar
        </span>
        <p
          data-caption
          className="flex min-h-[1.6em] max-w-sm items-center justify-center text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          <span data-caption-text />
          <span
            data-caret
            className="ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[2px] bg-primary"
          />
        </p>
      </div>
    </div>
  );
}
