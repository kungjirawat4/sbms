"use client";

import { Separator } from "@/components/ui/separator";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { features } from "./features";
import { ease } from "./type";

export function CenterContent() {
  const t = useTranslations("Landing");
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
    }),
    [shouldReduceMotion],
  );

  const fadeDown = useMemo(
    () => ({
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
    }),
    [shouldReduceMotion],
  );

  const staggerParent = useMemo(
    () => ({
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
      },
    }),
    [],
  );

  return (
    <>
      {/* 🔶 Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* blob ซ้ายบน */}
        <div className="absolute -top-32 -left-32 h-112 w-md rounded-full bg-amber-300/30 blur-3xl animate-soft-ping dark:bg-amber-400/10" />

        {/* blob ขวาล่าง (หน่วงเวลาให้ไม่พร้อมกัน) */}
        <div
          className="absolute -bottom-32 -right-32 h-128 w-lg rounded-full bg-amber-300/20 blur-3xl animate-soft-ping dark:bg-amber-400/10"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <motion.main
        initial="hidden"
        animate="visible"
        variants={staggerParent}
        className="relative flex w-full flex-1 items-center justify-center px-4"
      >
        {/* ✅ จำกัดความกว้าง + ทำให้กึ่งกลางแบบเนียน */}
        <div className=" flex w-full max-w-3xl flex-col items-center justify-center gap-2 text-center md:pt-0">
          <motion.div
            variants={fadeDown}
            className="relative flex flex-col items-center gap-3"
          >
            {/* Spotlight เฉพาะตอนธีมมืด */}
            <div className="pointer-events-none absolute -top-20 left-1/2 hidden h-64 w-md -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.55),rgba(0,0,0,0))] opacity-35 blur-3xl dark:block" />

            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : { y: [0, -6, 0], rotate: [0, -2, 2, 0] }
              }
              transition={
                shouldReduceMotion
                  ? {}
                  : { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src="/images/logo/Logo.png"
                alt="SBMS Logo"
                width={80}
                height={80}
                priority
                className="object-contain"
              />
            </motion.div>

            <div className="bg-muted inline-flex items-center rounded-lg px-3 py-1 text-sm font-medium">
              🎉 <Separator className="mx-2 h-4" orientation="vertical" />
              <span className="sm:hidden">{t("comingTitle")}</span>
              <span className="hidden sm:inline">{t("intro")}</span>
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className=" text-4xl gap-5 font-bold  md:text-5xl lg:leading-[1.1]"
          >
            <span className="text-gradient_indigo-purple font-bold">
              {t("builtForYou")}
            </span>{" "}
            {t("highPerfStarter")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground mx-auto max-w-2xl text-center text-lg"
          >
            {t("goal")}
            <br />
            {t("ctaHeadline")}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex justify-center pb-8 md:pb-10"
          >
            <Link href="/dashboard">
              <Button className="h-11 rounded-xl bg-zinc-900 px-6 text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.03] active:translate-y-0 active:scale-[0.97] hover:bg-zinc-800 dark:bg-amber-400 dark:text-black dark:hover:bg-amber-300">
                {t("getStarted")}{" "}
                <ArrowRightIcon className="ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <motion.section variants={fadeUp} className="w-full">
            <h2 className="mb-4 text-center text-sm font-semibold text-zinc-500 uppercase">
              {t("poweredBy")}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-10 gap-y-8 text-zinc-500 lg:gap-14">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Link
                    target="_blank"
                    href={feature.href}
                    aria-label={feature.title}
                    className="flex flex-col items-center transition duration-300 hover:text-black dark:hover:text-white"
                  >
                    <motion.div whileHover={{ y: shouldReduceMotion ? 0 : -2 }}>
                      {feature.icon}
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </motion.main>
    </>
  );
}
