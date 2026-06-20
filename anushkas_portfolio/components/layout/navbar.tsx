"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FileText, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "./logo";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/experience" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/workflows" },
  { label: "Insights", href: "/thinking" },
  { label: "Space", href: "/#blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed right-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background/85 px-6 backdrop-blur-md md:left-16 md:w-auto">
      <div className="flex items-center gap-4">
        <Logo size="sm" />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-7 md:flex">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:text-foreground",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Toggle theme"
        >
          <Sun size={16} className="hidden dark:block" />
          <Moon size={16} className="block dark:hidden" />
        </button>

        <a
          href="https://flowcv.com/resume/ebu6gfqrs0sp"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-xl bg-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground transition-all hover:brightness-110 md:flex"
        >
          <FileText size={12} />
          <span>Resume</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-border bg-background p-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "font-mono text-sm uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="https://flowcv.com/resume/ebu6gfqrs0sp"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground"
            >
              <FileText size={18} />
              Resume
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
