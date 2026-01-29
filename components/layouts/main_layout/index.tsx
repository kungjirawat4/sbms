"use client";

import { ReactNode } from "react";
import { Footer } from "./footer/footer";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

export default function Main_Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* ทำเป็น flex: header page / scroll area / footer */}

      {/* แถวที่ 2: โซนที่สกรอล */}
      <main className="flex min-h-0 flex-1">{children}</main>
      {/* แถวที่ 3: ฟุตเตอร์ (ชิดล่างเสมอ) */}
      <Footer />
    </div>
  );
}
