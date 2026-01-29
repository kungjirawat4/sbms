import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  Users,
} from "lucide-react";
// ===== Mock data (ไว้ทำ UI ก่อน DB) =====
export const mock = {
  systemAdmin: {
    stats: [
      { label: "ผู้ใช้งานทั้งหมด", value: "128", icon: Users },
      { label: "Audit วันนี้", value: "34", icon: ListChecks },
      { label: "เอกสารทั้งหมด", value: "1,240", icon: FileText },
      { label: "Soft-delete วันนี้", value: "6", icon: AlertTriangle },
    ],
    tasks: [
      { title: "คำขอรีเซ็ตรหัสผ่าน", meta: "5 รายการ", tone: "warn" as const },
      { title: "Storage ใกล้เต็ม", meta: "78% ใช้งาน", tone: "warn" as const },
      {
        title: "ผู้ปกครองยังไม่ผูกนักเรียน",
        meta: "12 บัญชี",
        tone: "info" as const,
      },
    ],
    recent: [
      { at: "09:10", text: "กู้คืนเอกสาร DOC-1021 โดย sysadmin" },
      { at: "08:42", text: "สร้างผู้ใช้ใหม่ teacher_31 (HOMEROOM_TEACHER)" },
      {
        at: "08:20",
        text: "แก้ไข permission: เอกสาร > พิมพ์ (STUDENT_AFFAIRS)",
      },
    ],
  },

  schoolAdmin: {
    stats: [
      { label: "นักเรียนทั้งหมด", value: "1,560", icon: GraduationCap },
      { label: "เคสเปิดอยู่", value: "23", icon: AlertTriangle },
      { label: "นักเรียนเสี่ยง", value: "41", icon: AlertTriangle },
      { label: "บันทึกเดือนนี้", value: "+320 / -118", icon: LayoutDashboard },
    ],
    highlights: [
      { title: "ระดับชั้นที่มีเหตุสูงสุด", value: "ม.2" },
      { title: "ห้องที่โดดเด่น (เชิงบวก)", value: "ม.3/2" },
      { title: "ห้องที่ต้องเฝ้าระวัง", value: "ม.1/5" },
    ],
    recent: [
      { at: "10:05", text: "รายงานสรุปเดือนนี้ถูกสร้าง (PDF)" },
      { at: "09:18", text: "เคส #A-240 ถูกปิดโดยฝ่ายปกครอง" },
      { at: "08:56", text: "สถิติรายห้องอัปเดตล่าสุด" },
    ],
  },

  studentAffairs: {
    stats: [
      { label: "รออนุมัติ", value: "12", icon: ListChecks },
      { label: "เคสใหม่วันนี้", value: "4", icon: AlertTriangle },
      { label: "เอกสารรอตรวจ", value: "7", icon: FileText },
      { label: "นัดผู้ปกครอง", value: "3", icon: Users },
    ],
    approvals: [
      {
        student: "ด.ช. ธนา (ม.2/3)",
        type: "ทะเลาะวิวาท",
        score: "-10",
        by: "ครูประจำชั้น",
        time: "09:22",
        severity: "สูง",
      },
      {
        student: "ด.ญ. พิม (ม.1/5)",
        type: "มาสาย",
        score: "-2",
        by: "ครูประจำชั้น",
        time: "08:50",
        severity: "ต่ำ",
      },
      {
        student: "ด.ช. กันต์ (ม.3/1)",
        type: "ช่วยงานกิจกรรม",
        score: "+3",
        by: "ครูที่ปรึกษา",
        time: "08:31",
        severity: "ต่ำ",
      },
    ],
    recent: [
      { at: "10:12", text: "อนุมัติบันทึกพฤติกรรม 3 รายการ" },
      { at: "09:40", text: "ตีกลับรายการ #R-122 ขอข้อมูลเพิ่ม" },
      { at: "09:05", text: "อัปโหลดเอกสารนัดผู้ปกครอง DOC-220" },
    ],
  },

  gradeHead: {
    stats: [
      { label: "เหตุในระดับชั้นวันนี้", value: "9", icon: AlertTriangle },
      { label: "รอตรวจสอบ", value: "6", icon: ListChecks },
      { label: "นักเรียนเสี่ยง", value: "12", icon: GraduationCap },
      { label: "รายงานสัปดาห์นี้", value: "1", icon: FileText },
    ],
    tasks: [
      {
        title: "ตรวจรายการจากครูประจำชั้น",
        meta: "6 รายการ",
        tone: "info" as const,
      },
      { title: "สรุปส่งฝ่ายปกครอง", meta: "2 เคส", tone: "warn" as const },
    ],
    recent: [
      { at: "10:01", text: "ส่งเคสระดับชั้น 2 เคสให้ฝ่ายปกครอง" },
      { at: "09:12", text: "ตรวจสอบบันทึกพฤติกรรม ม.3/4 (เรียบร้อย)" },
      { at: "08:30", text: "พิมพ์รายงานระดับชั้น (PDF)" },
    ],
  },

  homeroom: {
    stats: [
      { label: "นักเรียนในห้อง", value: "38", icon: GraduationCap },
      { label: "บันทึกวันนี้", value: "+6 / -3", icon: LayoutDashboard },
      { label: "นักเรียนเสี่ยง", value: "5", icon: AlertTriangle },
      { label: "เอกสารต้องพิมพ์", value: "2", icon: FileText },
    ],
    riskStudents: [
      { name: "ด.ช. ภพ", score: "62", last7: "5 เหตุ", status: "เสี่ยง" },
      { name: "ด.ญ. มีนา", score: "68", last7: "4 เหตุ", status: "เฝ้าระวัง" },
      { name: "ด.ช. นนท์", score: "70", last7: "3 เหตุ", status: "เฝ้าระวัง" },
    ],
    recent: [
      { at: "09:55", text: "บันทึก: ช่วยงานกิจกรรม +3 (ด.ญ. มีนา)" },
      { at: "09:10", text: "บันทึก: มาสาย -2 (ด.ช. ภพ)" },
      { at: "08:45", text: "อัปโหลดเอกสารใบแจ้งเตือน DOC-88" },
    ],
  },

  student: {
    stats: [
      { label: "คะแนนปัจจุบัน", value: "78", icon: CheckCircle2 },
      { label: "สรุปเดือนนี้", value: "+8 / -4", icon: LayoutDashboard },
      { label: "เอกสารที่ได้รับ", value: "1", icon: FileText },
    ],
    recent: [
      { at: "เมื่อวาน", text: "ช่วยงานกิจกรรม +3" },
      { at: "3 วันที่แล้ว", text: "มาสาย -2" },
    ],
  },

  parent: {
    stats: [
      { label: "คะแนนบุตรหลาน", value: "78", icon: CheckCircle2 },
      { label: "สรุปเดือนนี้", value: "+8 / -4", icon: LayoutDashboard },
      { label: "เอกสารเผยแพร่", value: "1", icon: FileText },
    ],
    recent: [
      { at: "วันนี้", text: "เอกสารนัดผู้ปกครอง (ดาวน์โหลดได้)" },
      { at: "เมื่อวาน", text: "ช่วยงานกิจกรรม +3" },
    ],
  },
};
