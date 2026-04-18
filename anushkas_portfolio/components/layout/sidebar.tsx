"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, MessageSquare, Activity, Settings, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "Chat", href: "/chat" },
  { icon: Activity, label: "Activity", href: "/activity" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-16 flex-col items-center border-r border-border bg-card py-6 md:flex">
      <div className="flex flex-1 flex-col items-center gap-8">
        <Link 
          href="/" 
          className="group flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors hover:bg-primary/20"
        >
          <div className="h-2 w-2 rounded-full bg-primary group-hover:animate-pulse" />
        </Link>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon size={20} />
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Settings size={20} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Moon size={20} />
        </button>
      </div>
    </aside>
  );
}
