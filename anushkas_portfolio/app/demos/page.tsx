import Link from "next/link";
import { DEMOS } from "@/lib/demo-content";

export const metadata = {
  title: "Aesthetic Demos",
};

export default function DemosIndex() {
  return (
    <div className="min-h-screen bg-[#0b0b0e] px-6 py-20 text-white md:px-12">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Direction studies
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Three takes on the same portfolio.
        </h1>
        <p className="mt-4 max-w-xl text-white/60">
          Same content, same GSAP motion language (headline reveal, count-up
          metrics, the systems diagram that draws itself). Only the aesthetic
          changes. Pick the one that feels like you.
        </p>

        <div className="mt-12 grid gap-4">
          {DEMOS.map((d, i) => (
            <Link
              key={d.slug}
              href={`/demos/${d.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/30 hover:bg-white/[0.06]"
            >
              <div>
                <span className="font-mono text-xs text-white/40">
                  0{i + 1}
                </span>
                <h2 className="mt-1 text-xl font-semibold">{d.name}</h2>
                <p className="text-sm text-white/50">{d.tagline}</p>
              </div>
              <span className="text-white/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-16 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
          Intro character scenes
        </p>
        <div className="mt-4 grid gap-4">
          {[
            { slug: "intro-friendly", name: "1 · Friendly", tagline: "Chat bubble · wave + sip + type" },
            { slug: "intro-creative", name: "2 · Creative", tagline: "On-screen terminal · particles" },
            { slug: "intro-memorable", name: "3 · Memorable", tagline: "Floating text in the air" },
          ].map((d) => (
            <Link
              key={d.slug}
              href={`/demos/${d.slug}`}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/30 hover:bg-white/[0.06]"
            >
              <div>
                <h2 className="text-xl font-semibold">{d.name}</h2>
                <p className="text-sm text-white/50">{d.tagline}</p>
              </div>
              <span className="text-white/40 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-12 inline-block font-mono text-xs uppercase tracking-widest text-white/40 hover:text-white"
        >
          ← Back to live site
        </Link>
      </div>
    </div>
  );
}
