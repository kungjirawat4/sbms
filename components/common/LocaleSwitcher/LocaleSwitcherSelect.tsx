"use client";

import { usePathname, useRouter, type Locale } from "@/i18n/config";
import { setUserLocale } from "@/i18n/routing";

import { CheckIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useTransition } from "react";

// ✅ shadcn/ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
  className?: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
  className,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const current = (defaultValue || "").toUpperCase();
  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
      router.replace(
        // @ts-expect-error keep same approach as original
        { pathname, params },
        { locale },
      );
    });
  }

  return (
    <div className={clsx("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label={label}
            className={clsx(
              "flex items-center justify-center shadow-2xl transition-all active:scale-105 dark:bg-gray-950",
              isPending && "pointer-events-none opacity-60",
            )}
          >
            {current}
            {/* <LanguageIcon className='h-[1.2rem] w-[1.2rem]' /> */}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuLabel>{label}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item) => {
            const active = item.value === defaultValue;
            return (
              <DropdownMenuItem
                key={item.value}
                onClick={() => onChange(item.value)}
                className="flex cursor-pointer items-center gap-2"
              >
                <span className="inline-flex w-4 justify-center">
                  {active ? <CheckIcon className="h-4 w-4" /> : null}
                </span>
                <span>{item.label}</span>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
