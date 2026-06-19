import { DemoNav } from "@/components/demos/demo-nav";
import {
  WordReveal,
  CountUp,
  SystemsDiagram,
  RevealOnScroll,
} from "@/components/demos/motion";
import { PERSON, METRICS } from "@/lib/demo-content";

// Swiss/editorial: off-white paper, near-black ink, one hot accent,
// oversized type, a visible structural grid, mono labels.
const ACCENT = "#e4572e";

export default function Editorial() {
  return (
    <div className="min-h-screen bg-[#f4f2ec] text-[#111] selection:bg-[#e4572e]/20">
      <main className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        {/* HERO */}
        <section className="border-b-2 border-[#111] pb-12">
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-[#111]/60">
            <span>{PERSON.name}</span>
            <span>{PERSON.kicker}</span>
          </div>
          <h1 className="mt-10 text-[15vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[9rem]">
            <WordReveal
              text="Operations, invisible."
              emphasis="invisible."
              emphasisClassName="italic"
              className="block"
            />
          </h1>
          <p className="mt-10 max-w-xl text-lg leading-snug">{PERSON.blurb}</p>
        </section>

        {/* METRICS — big numerals in a hard grid */}
        <section className="grid grid-cols-2 border-b-2 border-[#111] md:grid-cols-4">
          {METRICS.map((m, i) => (
            <RevealOnScroll
              key={m.label}
              className={`border-[#111] p-6 md:p-8 ${
                i !== 0 ? "border-l-2" : ""
              }`}
            >
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                className="block text-5xl font-black tracking-tighter md:text-6xl"
              />
              <div className="mt-3 font-mono text-[11px] uppercase tracking-widest">
                {m.label}
              </div>
              <div className="mt-1 text-xs text-[#111]/50">{m.sub}</div>
            </RevealOnScroll>
          ))}
        </section>

        {/* SYSTEMS DIAGRAM */}
        <section className="grid gap-10 py-24 md:grid-cols-[1fr_2fr] md:items-center">
          <RevealOnScroll>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.25em]"
              style={{ color: ACCENT }}
            >
              Fig. 01 — Pipeline
            </span>
            <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-tighter md:text-5xl">
              The system,
              <br />
              drawn.
            </h2>
          </RevealOnScroll>
          <div style={{ color: "#111" }}>
            <SystemsDiagram />
          </div>
        </section>

        <section className="border-t-2 border-[#111] py-20">
          <p className="text-3xl font-black uppercase leading-[0.95] tracking-tighter md:text-6xl">
            Type-led. Grid-locked.{" "}
            <span style={{ color: ACCENT }}>Impossible to ignore.</span>
          </p>
        </section>
      </main>

      <DemoNav />
    </div>
  );
}
