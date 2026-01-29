"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Logout({ className }: { className?: string }) {
  const t = useTranslations("Logout");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full cursor-pointer text-xs text-red-500 hover:text-red-700"
          title={t("logout")}
        >
          {t("logout")}
          <LogOutIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {/* ยืนยันการออกจากระบบ */}
            {t("confirmTitle")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {/* คุณต้องการออกจากระบบใช่หรือไม่?
            การออกจากระบบจะปิดการใช้งานแชทปัจจุบัน และกลับไปยังหน้าเข้าสู่ระบบ */}
            {t("confirmMessage")}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            {/* ยกเลิก */}
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => signOut()}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {/* ยืนยันออกจากระบบ */}
            {t("confirm")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
