import { DemoNav } from "@/components/demos/demo-nav";
import {
  WordReveal,
  CountUp,
  SystemsDiagram,
  RevealOnScroll,
} from "@/components/demos/motion";
import { PERSON, METRICS } from "@/lib/demo-content";

// Organic/handcrafted: warm paper, brush script led, hand-drawn accents,
// earthy palette. Leans into the Rockybilly/Yellowtail character.
const INK = "#2b2118";
const TERRACOTTA = "#b8552f";

export default function Organic() {
  return (
    <div
      className="min-h-screen bg-[#f3ebdd] selection:bg-[#b8552f]/20"
      style={{ color: INK }}
    >
      {/* paper grain */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.5] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />

      <main className="relative mx-auto max-w-4xl px-6 py-28 md:px-10">
        {/* HERO */}
        <section className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#2b2118]/50">
            {PERSON.kicker}
          </p>
          <h1 className="font-script text-6xl leading-[1.05] md:text-8xl">
            <WordReveal
              text={PERSON.headline}
              emphasis={PERSON.emphasis}
              emphasisClassName="text-[#b8552f]"
            />
          </h1>
          {/* hand-drawn underline */}
          <svg
            viewBox="0 0 400 20"
            className="h-4 w-64"
            style={{ color: TERRACOTTA }}
          >
            <path
              d="M3 12 C 80 4, 140 18, 200 9 S 340 4, 397 11"
              stroke="currentColor"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <p className="max-w-lg text-lg leading-relaxed text-[#2b2118]/75">
            {PERSON.blurb}
          </p>
        </section>

        {/* METRICS */}
        <section className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-4">
          {METRICS.map((m) => (
            <RevealOnScroll
              key={m.label}
              className="rounded-[1.5rem] border border-[#2b2118]/15 bg-[#faf4e8] p-6 shadow-[0_2px_0_rgba(43,33,24,0.12)]"
            >
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                className="font-script text-5xl text-[#b8552f]"
              />
              <div className="mt-2 text-sm font-semibold">{m.label}</div>
              <div className="text-xs text-[#2b2118]/50">{m.sub}</div>
            </RevealOnScroll>
          ))}
        </section>

        {/* SYSTEMS DIAGRAM */}
        <section className="mt-28">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#2b2118]/50">
              How it all connects
            </p>
            <h2 className="mt-2 font-script text-5xl text-[#2b2118] md:text-6xl">
              every piece, by hand.
            </h2>
          </RevealOnScroll>
          <div className="mt-10" style={{ color: TERRACOTTA }}>
            <SystemsDiagram />
          </div>
        </section>

        <section className="mt-28 flex items-center">
          <p className="font-script text-4xl leading-snug text-[#2b2118]/80 md:text-5xl">
            Warm, textured, and unmistakably{" "}
            <span className="text-[#b8552f]">human.</span>
          </p>
        </section>
      </main>

      <DemoNav />
    </div>
  );
}
