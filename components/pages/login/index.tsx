"use client";

import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Eye, EyeOff, LoaderIcon } from "lucide-react";

import { showToast } from "@/components/common/show-toast";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { motion, useReducedMotion } from "framer-motion";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const t = useTranslations("Login");
  const shouldReduceMotion = useReducedMotion();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const schema = z.object({
    username: z.string().min(1, t("username") || "Username"),
    password: z.string().min(1, t("password") || "Password"),
  });

  type LoginValues = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "admin", password: "123456" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);

    const res = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    setLoading(false);

    if (!res || res.error) {
      showToast({ title: t("errorInvalid"), variant: "error" });
      return;
    }

    showToast({
      title: t("success"),
      description: `${t("welcomeBack")} ${values.username}`,
      variant: "success",
    });
  };

  useEffect(() => {
    if (status === "authenticated") router.replace("/dashboard");
  }, [status, router]);

  if (session) return null;

  return (
    <div className="w-full max-w-md">
      <Card className="rounded-2xl border border-zinc-200/70 bg-white/85 shadow-xl backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/70">
        <CardHeader className="items-center text-center space-y-2">
          {/* logo badge */}
          <div className="mx-auto flex  items-center justify-center rounded-2xl dark:bg-zinc-950">
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
                className=" object-contain"
              />
            </motion.div>
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t("SBMS")}
          </CardTitle>

          {/* accent line */}
          <div className="h-1 w-16 rounded-full bg-amber-400/90 dark:bg-amber-300/80" />
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <Field>
              <FieldGroup>
                <FieldLabel className="text-zinc-800 dark:text-zinc-200">
                  {t("username")} <span className="text-amber-500">*</span>
                </FieldLabel>

                <FieldContent>
                  <Controller
                    control={control}
                    name="username"
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder={t("username")}
                        className="h-12 rounded-xl border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-amber-400/40 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                      />
                    )}
                  />
                </FieldContent>

                <FieldError className="text-amber-600 dark:text-amber-400">
                  {errors.username?.message
                    ? String(errors.username.message)
                    : ""}
                </FieldError>
              </FieldGroup>
            </Field>

            {/* Password */}
            <Field>
              <FieldGroup>
                <FieldLabel className="text-zinc-800 dark:text-zinc-200">
                  {t("password") ?? "Password"}{" "}
                  <span className="text-amber-500">*</span>
                </FieldLabel>

                <FieldContent>
                  <div className="relative">
                    <Controller
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="h-12 rounded-xl border-zinc-300 bg-white pr-12 text-zinc-900 placeholder:text-zinc-400 focus-visible:ring-amber-400/40 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                        />
                      )}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FieldContent>

                <FieldError className="text-amber-600 dark:text-amber-400">
                  {errors.password?.message
                    ? String(errors.password.message)
                    : ""}
                </FieldError>
              </FieldGroup>
            </Field>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-amber-400 dark:text-black dark:hover:bg-amber-300"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderIcon className="h-4 w-4 animate-spin" />
                  {t("signingIn")}
                </span>
              ) : (
                t("signIn")
              )}
            </Button>

            <p className="pt-1 text-center text-xs text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} SBMS • {t("SBMS")}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
