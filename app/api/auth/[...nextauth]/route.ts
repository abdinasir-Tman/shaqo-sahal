import NextAuth from "next-auth";
import { nextAuthOptions } from "./authOptions";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
