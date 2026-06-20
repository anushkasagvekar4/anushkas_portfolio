"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Lightbulb, Briefcase, GraduationCap, User, Mail, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Layers, label: "Systems", href: "/projects" },
  { icon: Lightbulb, label: "Insights", href: "/thinking" },
  { icon: Briefcase, label: "Experience", href: "/experience" },
  { icon: GraduationCap, label: "Stack", href: "/#education" },
  { icon: User, label: "About", href: "/#about" },
  { icon: Mail, label: "Contact", href: "/contact" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-16 flex-col items-center border-r border-border bg-background py-5 md:flex">
      <div className="flex flex-1 flex-col items-center gap-8">
        <Link
          href="/"
          aria-label="Home"
          className="group flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-all hover:border-primary"
        >
          <div className="h-2 w-2 rounded-full bg-primary transition-transform group-hover:scale-150" />
        </Link>

        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon size={17} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Toggle theme"
        >
          <Sun size={17} className="hidden dark:block" />
          <Moon size={17} className="block dark:hidden" />
        </button>
      </div>
    </aside>
  );
}
