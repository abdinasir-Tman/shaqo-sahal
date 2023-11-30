import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";
export const nextAuthOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_URL,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET_KEY!,
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      const userInfo = await prisma.user.findFirst({
        where: { email: token.email },
      });
      if (userInfo) {
        userInfo.emailVerified = undefined!;
        userInfo.hashedPassword = undefined!;
      }
      token.user = userInfo;
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user!;
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
};
