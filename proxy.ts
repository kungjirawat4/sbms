// // proxy.ts
// import { NextRequest, NextResponse } from "next/server";
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/config";
// import { auth } from "@/auth";

// const intl = createMiddleware(routing);
// export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };

// export default async function proxy(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const session = await auth();

//   const seg = pathname.split("/")[1];
//   const locales = routing.locales as readonly string[];
//   const locale = locales.includes(seg) ? seg : routing.defaultLocale;
//   const mode = (routing as any).localePrefix as
//     | "always"
//     | "as-needed"
//     | "never";

//   // สร้าง path ตามโหมด
//   const withLocale = (p: string) => {
//     if (mode === "always") return `/${locale}${p}`;
//     if (mode === "as-needed")
//       return locale !== routing.defaultLocale ? `/${locale}${p}` : p;
//     return p; // never
//   };
//   const loginPath = withLocale("/login");
//   const homePath = withLocale("/");

//   const publicPaths = ["/login", "/register"];
//   const isPublic = publicPaths.some(
//     (p) => pathname === p || pathname === withLocale(p),
//   );

//   // ถ้าล็อกอินแล้ว แต่ยังเปิดหน้า public (เช่น /login) → เด้งไป home ที่ถูกต้องตามโหมด
//   if (session && isPublic) {
//     if (pathname !== homePath)
//       return NextResponse.redirect(new URL(homePath, req.url));
//     return intl(req);
//   }

//   // ถ้ายังไม่ล็อกอิน และไม่ใช่ public → เด้งไป login ที่ถูกต้องตามโหมด
//   if (!session && !isPublic) {
//     if (pathname !== loginPath)
//       return NextResponse.redirect(new URL(loginPath, req.url));
//   }

//   return intl(req);
// }

// proxy.ts
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/config";
import { auth } from "@/auth";

const intl = createMiddleware(routing);
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await auth();

  const seg = pathname.split("/")[1];
  const locales = routing.locales as readonly string[];
  const locale = locales.includes(seg) ? seg : routing.defaultLocale;
  const mode = (routing as any).localePrefix as
    | "always"
    | "as-needed"
    | "never";

  // สร้าง path ตามโหมด
  const withLocale = (p: string) => {
    if (mode === "always") return `/${locale}${p}`;
    if (mode === "as-needed")
      return locale !== routing.defaultLocale ? `/${locale}${p}` : p;
    return p; // never
  };

  // ✅ เปลี่ยน home เป็น dashboard
  const dashboardPath = withLocale("/dashboard");
  const loginPath = withLocale("/login");

  // ✅ หน้า Landing ที่เข้าได้โดยไม่ต้อง login:
  // "/" หรือ "/th" หรือ "/en" (แล้วแต่ locale ที่มี)
  const isLocaleRoot = locales.some((l) => pathname === `/${l}`);
  const isLanding = pathname === "/" || isLocaleRoot;

  // Public pages (เข้าได้ไม่ต้อง login)
  const publicPaths = ["/login", "/register"];
  const isPublic =
    isLanding ||
    publicPaths.some((p) => pathname === p || pathname === withLocale(p));

  // ✅ ล็อกอินแล้ว แต่ยังอยู่หน้า public/landing -> เด้งเข้า dashboard
  if (session && isPublic) {
    if (pathname !== dashboardPath) {
      return NextResponse.redirect(new URL(dashboardPath, req.url));
    }
    return intl(req);
  }

  // ✅ ยังไม่ล็อกอิน และไม่ใช่ public -> เด้งไป login
  if (!session && !isPublic) {
    if (pathname !== loginPath) {
      return NextResponse.redirect(new URL(loginPath, req.url));
    }
  }

  return intl(req);
}
