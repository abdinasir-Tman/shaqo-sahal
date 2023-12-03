import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client";
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
};
