import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.password) return null;
        
        // Find the first admin by ID or any criteria since username is pointless
        const admin = await prisma.admin.findFirst();
        
        if (!admin) return null;
        
        const passwordsMatch = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        );
        
        if (passwordsMatch) {
          return { id: admin.id, name: admin.username };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  secret: process.env.AUTH_SECRET || "super-secure-secret-for-dev-12345",
});
