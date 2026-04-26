"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { FileText, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { label: "Home", href: "/" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/workflows" },
  { label: "Insights", href: "/thinking" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed right-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md md:left-16 md:w-auto">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          Anushka<span className="text-primary">.Studio</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
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

      <div className="flex items-center gap-4">
        {/* Theme Toggle (Universal visibility) */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground hover:scale-105 active:scale-95"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <a
          href="https://flowcv.com/resume/ebu6gfqrs0sp"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-[10px] font-bold text-primary transition-all hover:bg-primary/20 uppercase tracking-widest"
        >
          <FileText size={12} />
          <span>Resume</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <span className="hidden items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-muted-foreground md:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/50" />
          Mumbai, IN
        </span>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-16 w-full border-b border-border bg-background p-6 shadow-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors",
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
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary/10 py-3 text-sm font-bold text-primary"
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
