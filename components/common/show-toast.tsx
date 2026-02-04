"use client";

import { Toaster, toast } from "sonner";
import { Pill, AlertCircle, CheckCircle2, Info } from "lucide-react";
import type { ReactNode } from "react";

export type PharmacyToastVariant = "success" | "error" | "info" | "warning";

export interface PharmacyToastOptions {
  title: string;
  description?: string; // จะใส่หรือไม่ใส่ก็ได้
  variant?: PharmacyToastVariant;
}

/**
 * ฟังก์ชันยิง Toast ใช้เรียกจากทุกหน้าได้เลย
 */
export function showToast({
  title,
  description,
  variant = "info",
}: PharmacyToastOptions) {
  const base = {
    description,
    duration: 4000,
  } as const;

  const iconClass = "h-5 w-5";

  let icon: ReactNode = <Info className={iconClass} />;
  let className =
    "border-sky-500/40 bg-slate-950/90 text-sky-50 shadow-lg shadow-sky-500/30";

  switch (variant) {
    case "success":
      icon = <CheckCircle2 className={`${iconClass} text-emerald-400`} />;
      className =
        "border-emerald-400/50 bg-emerald-950/90 text-emerald-50 shadow-lg shadow-emerald-500/30";
      break;
    case "error":
      icon = <AlertCircle className={`${iconClass} text-rose-400`} />;
      className =
        "border-rose-400/50 bg-slate-950 text-rose-50 shadow-lg shadow-rose-500/30";
      break;
    case "warning":
      icon = <AlertCircle className={`${iconClass} text-amber-400`} />;
      className =
        "border-amber-400/50 bg-slate-950 text-amber-50 shadow-lg shadow-amber-500/30";
      break;
    case "info":
    default:
      icon = <Pill className={`${iconClass} text-sky-400`} />; // แคปซูล = mood ห้องยา
      className =
        "border-sky-400/50 bg-slate-950 text-sky-50 shadow-lg shadow-sky-500/30";
      break;
  }

  return toast(title, {
    ...base,
    icon,
    className:
      "rounded-2xl px-4 py-3 text-sm font-medium backdrop-blur-md " + className,
  });
}

export function ShowToaster() {
  return (
    <Toaster
      position="top-right"
      richColors
      toastOptions={{
        className:
          "rounded-2xl border border-sky-500/30 bg-slate-950/90 text-slate-50 shadow-xl shadow-sky-500/30",
      }}
    />
  );
}
