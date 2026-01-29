"use client";

import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { mock } from "./mock";
import { Role, ROLE_LABEL_TH } from "./types";
import LoadingState from "@/components/common/loadingState";

// ===== UI parts =====
function StatCards({
  items,
}: {
  items: { label: string; value: string; icon: any }[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <Card key={it.label} className="rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              {it.label}
            </CardTitle>
            <it.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{it.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TaskList({
  title,
  items,
}: {
  title: string;
  items: { title: string; meta?: string; tone: "info" | "warn" }[];
}) {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((it, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between gap-3 rounded-lg border p-3"
          >
            <div className="min-w-0">
              <div className="font-medium">{it.title}</div>
              {it.meta && (
                <div className="text-xs text-muted-foreground">{it.meta}</div>
              )}
            </div>
            <Badge variant={it.tone === "warn" ? "destructive" : "secondary"}>
              {it.tone === "warn" ? "ต้องดู" : "ข้อมูล"}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function RecentActivity({ items }: { items: { at: string; text: string }[] }) {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="text-base">กิจกรรมล่าสุด</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-14 text-xs text-muted-foreground">{it.at}</div>
            <div className="text-sm">{it.text}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function QuickActions({ role }: { role?: string }) {
  // ปรับ path ได้ตามระบบคุณ
  const common = [{ href: "/students", label: "รายชื่อนักเรียน" }];

  const byRole: Record<string, { href: string; label: string }[]> = {
    SYSTEM_ADMIN: [
      { href: "/admin/users", label: "จัดการผู้ใช้" },
      { href: "/admin/roles", label: "สิทธิ์/บทบาท" },
      { href: "/documents", label: "เอกสาร" },
    ],
    SCHOOL_ADMIN: [
      { href: "/reports", label: "รายงาน" },
      { href: "/analytics", label: "สถิติภาพรวม" },
    ],
    STUDENT_AFFAIRS: [
      { href: "/approvals", label: "กล่องงานอนุมัติ" },
      { href: "/cases", label: "เคส" },
      { href: "/documents", label: "เอกสาร" },
    ],
    GRADE_HEAD: [
      { href: "/approvals", label: "ตรวจรายการระดับชั้น" },
      { href: "/reports", label: "รายงานระดับชั้น" },
    ],
    HOMEROOM_TEACHER: [
      { href: "/behavior/new", label: "บันทึกพฤติกรรม" },
      { href: "/documents", label: "อัปโหลดเอกสาร" },
    ],
    STUDENT: [{ href: "/me", label: "ประวัติของฉัน" }],
    PARENT: [{ href: "/child", label: "ข้อมูลบุตรหลาน" }],
  };

  const actions = [...common, ...(byRole[String(role)] ?? [])];

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle className="text-base">ปุ่มลัด</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <Button
            key={a.href}
            asChild
            variant="secondary"
            className="rounded-lg"
          >
            <Link href={a.href}>{a.label}</Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

// ===== Role dashboards =====
function Dashboard_SYSTEM_ADMIN() {
  const d = mock.systemAdmin;
  return (
    <>
      <StatCards items={d.stats} />
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskList
            title="งานที่ต้องดู (ระบบ)"
            items={d.tasks.map((x) => ({ ...x, tone: x.tone }))}
          />
        </div>
        <RecentActivity items={d.recent} />
      </div>
    </>
  );
}

function Dashboard_SCHOOL_ADMIN() {
  const d = mock.schoolAdmin;
  return (
    <>
      <StatCards items={d.stats} />
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">ไฮไลต์โรงเรียน</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            {d.highlights.map((h) => (
              <div key={h.title} className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">{h.title}</div>
                <div className="mt-1 text-lg font-semibold">{h.value}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <RecentActivity items={d.recent} />
      </div>
    </>
  );
}

function Dashboard_STUDENT_AFFAIRS() {
  const d = mock.studentAffairs;
  return (
    <>
      <StatCards items={d.stats} />
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">กล่องงานอนุมัติ</CardTitle>
            <Button asChild size="sm" className="rounded-lg">
              <Link href="/approvals">ไปหน้ากล่องงาน</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>นักเรียน</TableHead>
                  <TableHead>ประเภท</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>ผู้บันทึก</TableHead>
                  <TableHead>เวลา</TableHead>
                  <TableHead>ระดับ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {d.approvals.map((r, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{r.student}</TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          r.score.startsWith("-") ? "destructive" : "secondary"
                        }
                      >
                        {r.score}
                      </Badge>
                    </TableCell>
                    <TableCell>{r.by}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {r.time}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          r.severity === "สูง" ? "destructive" : "secondary"
                        }
                      >
                        {r.severity}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-4" />

            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary" className="rounded-lg">
                <Link href="/cases">จัดการเคส</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-lg">
                <Link href="/documents">เอกสาร</Link>
              </Button>
              <Button asChild className="rounded-lg">
                <Link href="/behavior/new">เปิดเคส/บันทึกใหม่</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <RecentActivity items={d.recent} />
      </div>
    </>
  );
}

function Dashboard_GRADE_HEAD() {
  const d = mock.gradeHead;
  return (
    <>
      <StatCards items={d.stats} />
      <div className="grid gap-3 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskList
            title="งานระดับชั้น"
            items={d.tasks.map((x) => ({ ...x, tone: x.tone }))}
          />
        </div>
        <RecentActivity items={d.recent} />
      </div>
    </>
  );
}

function Dashboard_HOMEROOM_TEACHER() {
  const d = mock.homeroom;
  return (
    <>
      <StatCards items={d.stats} />

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">นักเรียนเสี่ยงในห้อง</CardTitle>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="rounded-lg"
            >
              <Link href="/students?filter=risk">ดูทั้งหมด</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>คะแนน</TableHead>
                  <TableHead>7 วันล่าสุด</TableHead>
                  <TableHead>สถานะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {d.riskStudents.map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.score}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {s.last7}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          s.status === "เสี่ยง" ? "destructive" : "secondary"
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-4" />

            <div className="flex flex-wrap gap-2">
              <Button asChild className="rounded-lg">
                <Link href="/behavior/new">+ บันทึกพฤติกรรม</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-lg">
                <Link href="/documents">+ อัปโหลดเอกสาร</Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-lg">
                <Link href="/reports">รายงานห้อง</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <RecentActivity items={d.recent} />
      </div>
    </>
  );
}

function Dashboard_STUDENT() {
  const d = mock.student;
  return (
    <>
      <StatCards items={d.stats} />
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">สรุปของฉัน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground">คำแนะนำ</div>
              <div className="mt-1 text-sm">
                รักษาความสม่ำเสมอ: ตั้งเป้า “ไม่มาสาย” สัปดาห์นี้
                และช่วยกิจกรรมเล็ก ๆ 1 ครั้ง
              </div>
            </div>
            <Button asChild className="rounded-lg">
              <Link href="/me">ดูประวัติทั้งหมด</Link>
            </Button>
          </CardContent>
        </Card>
        <RecentActivity items={d.recent} />
      </div>
    </>
  );
}

function Dashboard_PARENT() {
  const d = mock.parent;
  return (
    <>
      <StatCards items={d.stats} />
      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="rounded-xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">สรุปผู้ปกครอง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border p-3">
              <div className="text-xs text-muted-foreground">รายการแนะนำ</div>
              <div className="mt-1 text-sm">
                ตรวจเอกสารเผยแพร่ล่าสุด และยืนยันรับทราบ (ถ้ามี)
                เพื่อให้ครูทราบว่าดูแล้ว
              </div>
            </div>
            <Button asChild className="rounded-lg">
              <Link href="/child">ดูข้อมูลบุตรหลาน</Link>
            </Button>
          </CardContent>
        </Card>
        <RecentActivity items={d.recent} />
      </div>
    </>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const t = useTranslations("Navbar");

  const user = session?.user;
  const role = (user?.role as Role | undefined) ?? undefined;

  const roleLabel = role ? (ROLE_LABEL_TH[role] ?? role) : "ไม่ระบุบทบาท";

  const DashboardByRole = useMemo(() => {
    switch (role) {
      case "SYSTEM_ADMIN":
        return <Dashboard_SYSTEM_ADMIN />;
      case "SCHOOL_ADMIN":
        return <Dashboard_SCHOOL_ADMIN />;
      case "STUDENT_AFFAIRS":
        return <Dashboard_STUDENT_AFFAIRS />;
      case "GRADE_HEAD":
        return <Dashboard_GRADE_HEAD />;
      case "HOMEROOM_TEACHER":
        return <Dashboard_HOMEROOM_TEACHER />;
      case "STUDENT":
        return <Dashboard_STUDENT />;
      case "PARENT":
        return <Dashboard_PARENT />;
      default:
        return null;
    }
  }, [role]);

  if (status === "loading") {
    return <LoadingState text={t("loading")} />;
  }

  return (
    <div className="w-full space-y-4 p-4 md:p-6">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <Badge variant="secondary" className="rounded-full">
              {roleLabel}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {user?.fullname ?? "-"} • {user?.email ?? "-"}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary" className="rounded-lg">
            <Link href="/students">นักเรียน</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-lg">
            <Link href="/documents">เอกสาร</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-lg">
            <Link href="/reports">รายงาน</Link>
          </Button>
        </div>
      </div>

      {DashboardByRole ?? (
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle className="text-base">
              ไม่พบ Dashboard สำหรับบทบาทนี้
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Role: {String(role)}
          </CardContent>
        </Card>
      )}

      {/* Quick actions (ท้ายหน้า) */}
      <QuickActions role={role} />
    </div>
  );
}
