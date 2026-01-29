import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'th'],
  defaultLocale: 'th',
  localePrefix: 'always', // ใช้ never เมื่อไม่ต้องการโชว์ path เช่น /en/home ==> /home
})

export type Locale = (typeof routing.locales)[number]

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)
