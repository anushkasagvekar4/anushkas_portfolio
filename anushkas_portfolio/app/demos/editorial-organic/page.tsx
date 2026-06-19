import { DemoNav } from "@/components/demos/demo-nav";
import {
  WordReveal,
  CountUp,
  SystemsDiagram,
  RevealOnScroll,
} from "@/components/demos/motion";
import { PERSON, METRICS } from "@/lib/demo-content";

// Editorial × Organic:
// Swiss bones — oversized grotesk, hard grid, mono labels, high contrast —
// warmed by paper texture, an earthy palette, and brush-script accents.
const PAPER = "#f1ebde";
const INK = "#1b1714";
const TERRACOTTA = "#b8552f";

export default function EditorialOrganic() {
  return (
    <div
      className="min-h-screen selection:bg-[#b8552f]/20"
      style={{ background: PAPER, color: INK }}
    >
      {/* paper grain (organic) */}
      <div
        className="pointer-events-none fixed inset-0 opacity-50 mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />

      <main className="relative mx-auto max-w-6xl px-6 py-24 md:px-10">
        {/* HERO — Swiss top rule + grid, organic script emphasis */}
        <section
          className="border-b-2 pb-12"
          style={{ borderColor: INK }}
        >
          <div
            className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em]"
            style={{ color: `${INK}99` }}
          >
            <span>{PERSON.name}</span>
            <span>{PERSON.kicker}</span>
          </div>

          <h1 className="mt-10 text-[14vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[8.5rem]">
            <WordReveal text="Operations," className="block" />
            <span className="relative inline-block">
              <WordReveal
                text="invisible."
                className="font-script text-[0.9em] font-normal normal-case lowercase tracking-normal"
                emphasis="invisible."
                emphasisClassName=""
              />
              {/* hand-drawn underline (organic) */}
              <svg
                viewBox="0 0 400 20"
                className="absolute -bottom-2 left-0 h-4 w-[80%]"
                style={{ color: TERRACOTTA }}
              >
                <path
                  d="M3 12 C 80 4, 140 18, 200 9 S 340 4, 397 11"
                  stroke="currentColor"
                  strokeWidth={4}
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-12 max-w-xl text-lg leading-relaxed">
            {PERSON.blurb}
          </p>
        </section>

        {/* METRICS — hard Swiss grid, warm card fill, big black numerals */}
        <section
          className="grid grid-cols-2 border-b-2 md:grid-cols-4"
          style={{ borderColor: INK }}
        >
          {METRICS.map((m, i) => (
            <RevealOnScroll
              key={m.label}
              className={`p-6 md:p-8 ${i !== 0 ? "border-l-2" : ""}`}
              style={{ borderColor: INK }}
            >
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                className="block text-5xl font-black tracking-tighter md:text-6xl"
              />
              <div
                className="mt-3 font-mono text-[11px] uppercase tracking-widest"
                style={{ color: TERRACOTTA }}
              >
                {m.label}
              </div>
              <div className="mt-1 text-xs" style={{ color: `${INK}80` }}>
                {m.sub}
              </div>
            </RevealOnScroll>
          ))}
        </section>

        {/* SYSTEMS DIAGRAM */}
        <section className="grid gap-10 py-24 md:grid-cols-[1fr_2fr] md:items-center">
          <RevealOnScroll>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: TERRACOTTA }}
            >
              Fig. 01 — Pipeline
            </span>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">
              The system,
              <br />
              <span className="font-script text-[1.4em] font-normal normal-case lowercase tracking-normal">
                drawn by hand.
              </span>
            </h2>
          </RevealOnScroll>
          <div style={{ color: TERRACOTTA }}>
            <SystemsDiagram />
          </div>
        </section>

        {/* CLOSING */}
        <section
          className="border-t-2 py-20"
          style={{ borderColor: INK }}
        >
          <p className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-6xl">
            Structured like Swiss.{" "}
            <span
              className="font-script text-[1.3em] font-normal normal-case lowercase tracking-normal"
              style={{ color: TERRACOTTA }}
            >
              warm like a person.
            </span>
          </p>
        </section>
      </main>

      <DemoNav />
    </div>
  );
}
