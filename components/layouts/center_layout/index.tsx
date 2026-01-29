"use client";

import { ReactNode } from "react";
import { Footer } from "./footer/footer";
import LocaleSwitcher from "@/components/common/LocaleSwitcher/LocaleSwitcher";
import { ThemeSwitch } from "@/components/common/ThemeSwitch/ThemeSwitch";

interface LayoutProps {
  children: ReactNode;
}

export default function Center_Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ทำเป็น flex: header page / scroll area / footer */}
      <div className="fixed z-10 top-5 right-5">
        <LocaleSwitcher />
      </div>

 
      <div className="fixed z-10 top-5 right-16">
        <ThemeSwitch />
      </div>
      {/* แถวที่ 2: โซนที่สกรอล */}
      <main className="flex min-h-0 flex-1">{children}</main>
      {/* แถวที่ 3: ฟุตเตอร์ (ชิดล่างเสมอ) */}
      <Footer />
    </div>
  );
}
