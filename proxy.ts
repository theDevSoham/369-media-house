import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /**
   * 1️⃣ /admin → /admin/dashboard
   */
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  /**
   * 1️⃣ /admin/login → /admin/dashboard when logged in
   */
  if (pathname === "/admin/login") {
    const token = req.cookies.get("admin_token")?.value;
    if (token) {
      try {
        jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      } catch {}
    }
  }

  /**
   * 2️⃣ Protect dashboard routes ONLY
   */
  if (pathname.startsWith("/admin/dashboard")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      const payload = jwt.verify(token, process.env.ADMIN_JWT_SECRET!) as {
        sub: string;
        role: string;
        exp: number;
      };

      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }

      // ✅ token valid → allow
      return NextResponse.next();
    } catch {
      // ❌ invalid / expired token
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
