import NextAuth, { DefaultSession } from "next-auth";
import "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      userId: string;
      fullname: string;
      role: string;
      email: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    fullname: string;
    role: string;
    email: string;
  }
}

export type AuthUser = {
  userId: string;
  username: string;
  password: string;
  fullname: string;
  role: string;
  email: string;
};

// ✅ Hardcode Users
export const USERS: AuthUser[] = [
  {
    userId: "1",
    username: "admin",
    password: "123456",
    fullname: "ผู้ดูแลระบบ",
    role: "SYSTEM_ADMIN",
    email: "sysadmin@sbms.local",
  },
  {
    userId: "2",
    username: "director",
    password: "123456",
    fullname: "นางทดสอบ นะจ๊ะ",
    role: "SCHOOL_ADMIN",
    email: "director@sbms.local",
  },
  {
    userId: "3",
    username: "affairs",
    password: "123456",
    fullname: "นางทดสอบ1 นะจ๊ะ",
    role: "STUDENT_AFFAIRS",
    email: "affairs@sbms.local",
  },
  {
    userId: "4",
    username: "gradehead",
    password: "123456",
    fullname: "นายทดสอบ นะครับ",
    role: "GRADE_HEAD",
    email: "gradehead@sbms.local",
  },
  {
    userId: "5",
    username: "homeroom",
    password: "123456",
    fullname: "นายทดสอบ นะครับ ม.3/1",
    role: "HOMEROOM_TEACHER",
    email: "homeroom@sbms.local",
  },
  {
    userId: "6",
    username: "student01",
    password: "123456",
    fullname: "นักเรียน ทดสอบ",
    role: "STUDENT",
    email: "student01@sbms.local",
  },
  {
    userId: "7",
    username: "parent01",
    password: "123456",
    fullname: "ผู้ปกครอง นักเรียนทดสอบ",
    role: "PARENT",
    email: "parent01@sbms.local",
  },
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = (credentials?.username as string)?.toLowerCase();
        const password = credentials?.password as string;

        const user = USERS.find(
          (u) =>
            u.username.toLowerCase() === username && u.password === password,
        );

        if (user) {
          return {
            userId: user.userId,
            name: user.username,
            fullname: user.fullname,
            role: user.role,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 days.
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const intital = user as AuthUser;
        token.userId = intital.userId;
        token.fullname = intital.fullname;
        token.email = intital.email;
        token.role = intital.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.userId = token.userId;
        session.user.fullname = token.fullname;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,
});
