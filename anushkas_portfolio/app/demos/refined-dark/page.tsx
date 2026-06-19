import { DemoNav } from "@/components/demos/demo-nav";
import {
  WordReveal,
  CountUp,
  SystemsDiagram,
  RevealOnScroll,
} from "@/components/demos/motion";
import { PERSON, METRICS } from "@/lib/demo-content";

export default function RefinedDark() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30">
      {/* ambient glows */}
      <div className="pointer-events-none fixed -top-40 right-0 h-[40rem] w-[40rem] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 -left-40 h-[36rem] w-[36rem] rounded-full bg-teal-500/[0.07] blur-[120px]" />

      <main className="relative mx-auto max-w-5xl px-6 py-28 md:px-10">
        {/* HERO */}
        <section className="flex flex-col gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-zinc-500">
            {PERSON.kicker}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.1] tracking-tight md:text-7xl">
            <WordReveal
              text={PERSON.headline}
              emphasis={PERSON.emphasis}
              emphasisClassName="font-script font-normal text-indigo-400"
            />
          </h1>
          <p className="max-w-lg text-zinc-400 md:text-lg">{PERSON.blurb}</p>
        </section>

        {/* METRICS */}
        <section className="mt-28 grid grid-cols-2 gap-4 md:grid-cols-4">
          {METRICS.map((m) => (
            <RevealOnScroll
              key={m.label}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm"
            >
              <CountUp
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                className="text-3xl font-bold text-white md:text-4xl"
              />
              <div className="mt-2 text-sm font-medium text-zinc-300">
                {m.label}
              </div>
              <div className="text-xs text-zinc-500">{m.sub}</div>
            </RevealOnScroll>
          ))}
        </section>

        {/* SYSTEMS DIAGRAM */}
        <section className="mt-32">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-indigo-400/70">
              How the work flows
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              The invisible system, made visible.
            </h2>
          </RevealOnScroll>
          <div className="mt-12 text-indigo-300">
            <SystemsDiagram />
          </div>
        </section>

        <section className="mt-32 flex h-[40vh] items-center">
          <p className="max-w-2xl text-2xl font-light leading-snug text-zinc-400 md:text-3xl">
            Restrained, fast, and precise — the motion never gets in the way of
            the work. <span className="text-white">That&apos;s the point.</span>
          </p>
        </section>
      </main>

      <DemoNav />
    </div>
  );
}
