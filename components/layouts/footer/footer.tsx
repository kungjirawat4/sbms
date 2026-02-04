// export function Footer() {
//   return (
//     <footer className="flex h-8 items-center justify-center border-0 px-5 text-sm sm:text-[15px] dark:text-white">
//       © {new Date().getFullYear()} Student Behavior Management System. All
//       rights reserved.
//     </footer>
//   );
// }
export function Footer() {
  return (
    <footer className="w-full border-0 px-4 py-2 text-center text-xs text-zinc-600 sm:px-6 sm:text-sm dark:text-zinc-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
        <span>
          © {new Date().getFullYear()} Student Behavior Management System.
          <span className="hidden sm:inline"> All rights reserved.</span>
        </span>

        {/* divider เฉพาะจอใหญ่ */}
        <span className="hidden sm:inline">•</span>

        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          BY{" "}
          <span className="tracking-wide text-zinc-900 dark:text-white">
            JIRAWAT_DEV
          </span>
        </span>
      </div>
    </footer>
  );
}
