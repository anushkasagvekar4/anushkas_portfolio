"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Demo routes render on a clean full-bleed canvas (no sidebar/navbar)
  // so each aesthetic direction can be judged on its own.
  if (pathname?.startsWith("/demos")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-1 flex-col md:ml-16">
        <Navbar />
        <main className="flex-1 px-6 pt-24 pb-12 md:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
