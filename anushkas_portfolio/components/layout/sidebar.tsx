"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Lightbulb, Briefcase, GraduationCap, User, Mail, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Layers, label: "Systems", href: "/#systems" },
  { icon: Lightbulb, label: "Insights", href: "/#logic-studio" },
  { icon: Briefcase, label: "Experience", href: "/#experience" },
  { icon: GraduationCap, label: "Stack", href: "/#education" },
  { icon: User, label: "About", href: "/#about" },
  { icon: Mail, label: "Contact", href: "/contact" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-14 flex-col items-center border-r border-border bg-background py-6 md:flex">
      <div className="flex flex-1 flex-col items-center gap-8">
        <Link 
          href="/" 
          className="group flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/5 transition-all hover:bg-foreground/10"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
        </Link>

        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-foreground/10 text-foreground" 
                    : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                <item.icon size={18} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </aside>
  );
}
