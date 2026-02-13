import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth";

/**
 * POST /api/admin/login
 * Verifies the admin password against the ENV variable.
 */
export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (verifyAdmin(password)) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
