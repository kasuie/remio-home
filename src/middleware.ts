/*
 * @Author: kasuie
 * @Date: 2024-06-14 22:32:09
 * @LastEditors: kasuie
 * @LastEditTime: 2024-06-15 22:13:46
 * @Description:
 */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE = ["/config"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname && PRIVATE.includes(pathname)) {
    const cookieKey: any = "accessToken";

    if (req.cookies.has(cookieKey)) {
      return NextResponse.next();
    }

    if (!process.env.PASSWORD) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.rewrite(new URL("/config?verify", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/config/:path*"],
};
