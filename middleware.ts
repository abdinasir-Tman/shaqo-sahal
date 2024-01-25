import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

type User = {
  role: string;
  type: string;
};

export const config = {
  matcher: ["/register/:path*", "/dashboard/:path*", "/profile/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const userRole: any = (req?.nextauth?.token?.user as User).type;

    const url = req.nextUrl.pathname;
    console.log("url ", url);
    if (url?.includes("/dashboard") && userRole !== "employer") {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (url?.includes("/profile") && userRole !== "jobSeeker") {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (url?.includes("/signin") && Object.keys(userRole).length > 0) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/signin",
    },
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);
