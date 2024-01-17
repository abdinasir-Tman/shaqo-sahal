import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

type User = {
  role: string;
  type: string;
};

export const config = {
  matcher: ["/register/:path*", "/dashboard/:path*"],
};

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.pathname;

    const userRole = (req?.nextauth?.token?.user as User).type;

    if (url?.includes("/dashboard") && userRole !== "employer") {
      return NextResponse.redirect(new URL("/", req.url));
    } else if (url?.includes("/profile") && userRole !== "jobSeeker") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);
