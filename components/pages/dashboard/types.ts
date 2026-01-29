export type Role =
  | "SYSTEM_ADMIN"
  | "SCHOOL_ADMIN"
  | "STUDENT_AFFAIRS"
  | "GRADE_HEAD"
  | "HOMEROOM_TEACHER"
  | "STUDENT"
  | "PARENT";

export const ROLE_LABEL_TH: Record<string, string> = {
  SYSTEM_ADMIN: "ผู้ดูแลระบบ",
  SCHOOL_ADMIN: "ผู้บริหารสถานศึกษา",
  STUDENT_AFFAIRS: "รองผู้บริหาร/ฝ่ายปกครอง",
  GRADE_HEAD: "หัวหน้าระดับชั้น",
  HOMEROOM_TEACHER: "ครูประจำชั้น/ครูที่ปรึกษา",
  STUDENT: "นักเรียน",
  PARENT: "ผู้ปกครอง",
};
