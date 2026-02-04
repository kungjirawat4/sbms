"use client";

import LocaleSwitcher from "@/components/common/LocaleSwitcher/LocaleSwitcher";
import { ThemeSwitch } from "@/components/common/ThemeSwitch/ThemeSwitch";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Login_Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-dvh w-full overflow-hidden">
      {/* ✅ Background gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-zinc-50 via-amber-50 to-zinc-100 dark:from-zinc-950 dark:via-zinc-950 dark:to-black" />

      {/* ✅ Blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 -z-10 h-80 w-80 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-400/10 animate-soft-ping " />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-80 w-80 rounded-full bg-zinc-400/25 blur-3xl dark:bg-zinc-500/10 animate-soft-ping"
        style={{ animationDelay: "3s" }}
      />

      {/* ✅ Fixed controls */}
      <div className="fixed top-5 right-5 z-50">
        <LocaleSwitcher />
      </div>
      <div className="fixed top-5 right-16 z-50">
        <ThemeSwitch />
      </div>

      {/* ✅ Content */}
      <main className="flex min-h-dvh w-full items-center justify-center px-4">
        {children}
      </main>
    </div>
  );
}
