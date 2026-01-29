import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

import { ShowToaster } from "@/components/common/show-toast";
import { IBMPlexSansThai } from "@/constants/fonts";
import { TailwindIndicator } from "@/providers/tailwind-indicator";
import { ThemeProvider } from "@/providers/theme-provider";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "ระบบการบริหารจัดการพฤติกรรมนักเรียน",
  description: "Student Behavior Management System: SBMS",
  icons: "/images/logo/Logo.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${IBMPlexSansThai.className} antialiased`}>
        <SessionProvider>
          {" "}
          <ThemeProvider
            attribute="class"
            defaultTheme="Light"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <ShowToaster />
              {children}
              <TailwindIndicator />
            </NextIntlClientProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
