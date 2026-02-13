import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to block direct access to /admin.
 * The admin panel is only accessible via the secret URL defined
 * by NEXT_PUBLIC_ADMIN_SECRET (e.g., /panel-x9k2m).
 * Rewrites in next.config.ts map the secret path → /admin internally.
 * Direct /admin requests get a 404.
 */
export default function proxy(request: NextRequest) {
  // Block direct /admin access — only rewritten requests should reach it
  // Rewrites preserve the original URL, so if someone hits /admin directly,
  // the pathname will be /admin. If they hit /${SECRET}, the pathname is /${SECRET}
  // and the rewrite handles the rest internally.
  return NextResponse.rewrite(new URL("/not-found", request.url));
}

export const config = {
  // Only run on /admin routes (not /api/admin)
  matcher: ["/admin", "/admin/:path*"],
};
