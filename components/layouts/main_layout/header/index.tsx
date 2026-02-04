// import LocaleSwitcher from "@/components/common/LocaleSwitcher/LocaleSwitcher";
// import Logout from "@/components/common/LogoutModel/logout";
// import { ThemeSwitch } from "@/components/common/ThemeSwitch/ThemeSwitch";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useSession } from "next-auth/react";
// import { useTranslations } from "next-intl";
// import Image from "next/image";

// export default function Header() {
//   const t = useTranslations("Navbar");
//   const { data: session } = useSession();
//   const user = session?.user;
//   const initials = (user?.fullname ?? user?.name ?? "?")
//     .split(" ")
//     .map((p) => p[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
//   return (
//     <header className="flex h-14 items-center justify-between px-4">
//       {/* ด้านซ้าย: โลโก้ + เวลา */}

//       {/* กล่องโลโก้ดำแบบสี่เหลี่ยม */}
//       <div className="flex h-14 w-14 items-center justify-center rounded-md">
//         <Image
//           src="/images/logo/Logo.png"
//           alt="logo"
//           width={500}
//           height={500}
//           className="size-20"
//           priority
//         />
//       </div>

//       {/* ด้านขวา: weather + theme + language */}
//       <div className="flex items-center gap-3">
//         <ThemeSwitch />
//         <LocaleSwitcher />
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant={"ghost"} className="flex items-center gap-2">
//               <Avatar>
//                 <AvatarImage
//                   src="https://github.com/shadcn.png"
//                   alt="@shadcn"
//                 />
//                 <AvatarFallback className="text-[11px] font-semibold">
//                   {initials}
//                 </AvatarFallback>
//               </Avatar>
//               <span className="max-w-[120px] truncate">{user?.fullname}</span>
//             </Button>
//           </DropdownMenuTrigger>

//           <DropdownMenuContent
//             align="end"
//             className="w-48 rounded-lg shadow-xl"
//           >
//             <DropdownMenuLabel className="text-xs">
//               {t("account")}
//             </DropdownMenuLabel>
//             <DropdownMenuLabel className="text-xs">
//               <span className="max-w-[120px] truncate">
//                 {user?.email} ({user?.role})
//               </span>
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator />

//             <Logout />
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//     </header>
//   );
// }

"use client";

import LocaleSwitcher from "@/components/common/LocaleSwitcher/LocaleSwitcher";
import Logout from "@/components/common/LogoutModel/logout";
import { ThemeSwitch } from "@/components/common/ThemeSwitch/ThemeSwitch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Bell } from "lucide-react";
import { SettingsIcon } from "@/components/ui/settings";

type Role =
  | "SYSTEM_ADMIN"
  | "SCHOOL_ADMIN"
  | "STUDENT_AFFAIRS"
  | "GRADE_HEAD"
  | "HOMEROOM_TEACHER"
  | "STUDENT"
  | "PARENT";

const ROLE_LABEL_TH: Record<string, string> = {
  SYSTEM_ADMIN: "ผู้ดูแลระบบ",
  SCHOOL_ADMIN: "ผู้บริหารสถานศึกษา",
  STUDENT_AFFAIRS: "ฝ่ายปกครอง",
  GRADE_HEAD: "หัวหน้าระดับชั้น",
  HOMEROOM_TEACHER: "ครูประจำชั้น",
  STUDENT: "นักเรียน",
  PARENT: "ผู้ปกครอง",
};

const canSeeSettings = (role?: string | null) => {
  // ปรับได้ตามนโยบายของคุณ
  // ให้ role กลุ่มผู้บริหาร/ครู/แอดมินเห็น "ตั้งค่า"
  return [
    "SYSTEM_ADMIN",
    "SCHOOL_ADMIN",
    "STUDENT_AFFAIRS",
    "GRADE_HEAD",
    "HOMEROOM_TEACHER",
  ].includes(String(role));
};

export default function Header() {
  const t = useTranslations("Navbar");
  const { data: session } = useSession();
  const user = session?.user;

  const role = (user?.role as Role | undefined) ?? undefined;
  const roleLabel = role ? (ROLE_LABEL_TH[role] ?? role) : "ไม่ระบุบทบาท";

  const initials = (user?.fullname ?? user?.name ?? "?")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      {/* ซ้าย: โลโก้ + ชื่อระบบ */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md">
          <Image
            src="/images/logo/Logo.png"
            alt="logo"
            width={120}
            height={120}
            className="size-10"
            priority
          />
        </div>

        {/* ชื่อระบบ */}
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">SBMS</span>
          <span className="text-[11px] text-muted-foreground">
            {/* Student Behavior Management System */}
            {t("SBMS")}
          </span>
        </div>
      </div>

      {/* ขวา: actions */}
      <div className="flex items-center gap-2">
        {/* แจ้งเตือน */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <ThemeSwitch />
        <LocaleSwitcher />
        {/* โปรไฟล์ */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback className="text-[11px] font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden min-w-0 flex-col items-start sm:flex">
                <div className="flex items-center gap-2">
                  <span className="max-w-35 truncate text-sm font-medium">
                    {user?.fullname ?? "-"}
                  </span>

                  {/* Role Badge */}
                  <Badge variant="secondary" className="h-5 px-2 text-[10px]">
                    {roleLabel}
                  </Badge>
                </div>

                <span className="max-w-50 truncate text-[11px] text-muted-foreground">
                  {user?.email ?? "-"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 rounded-lg shadow-xl"
          >
            <DropdownMenuLabel className="text-xs">
              {t("account")}
            </DropdownMenuLabel>

            <div className="px-2 pb-2">
              <div className="text-sm font-medium truncate">
                {user?.fullname ?? "-"}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">
                {user?.email ?? "-"}
              </div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-[10px]">
                  {roleLabel}
                </Badge>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* ตั้งค่า (ในเมนู) */}
            {canSeeSettings(role) && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    <span>ตั้งค่า</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            {/* ออกจากระบบ (ของเดิมคุณ) */}
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
