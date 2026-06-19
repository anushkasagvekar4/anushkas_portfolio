"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DEMOS } from "@/lib/demo-content";

/** Floating switcher so all three looks can be compared quickly. */
export function DemoNav() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black/70 p-1 text-xs text-white shadow-2xl backdrop-blur-md">
      <Link
        href="/demos"
        className="rounded-full px-3 py-1.5 text-white/60 transition-colors hover:text-white"
      >
        All
      </Link>
      {DEMOS.map((d) => {
        const active = pathname === `/demos/${d.slug}`;
        return (
          <Link
            key={d.slug}
            href={`/demos/${d.slug}`}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              active ? "bg-white text-black" : "text-white/60 hover:text-white"
            }`}
          >
            {d.name}
          </Link>
        );
      })}
    </div>
  );
}
