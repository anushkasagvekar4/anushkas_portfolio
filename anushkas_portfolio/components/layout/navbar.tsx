"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Workflows", href: "/workflows" },
  { label: "Thinking", href: "/thinking" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md md:left-16 md:w-auto">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          Anushka<span className="text-primary">OS.dev</span>
        </Link>
      </div>

      <nav className="hidden items-center gap-8 md:flex">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
              {isActive && (
                <div className="mt-1 h-0.5 w-full rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          v1.0 - Live
        </span>
      </div>
    </header>
  );
}
