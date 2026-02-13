import { NextRequest, NextResponse } from "next/server";
import { readJson, writeJson } from "@/lib/json-db";

/**
 * GET /api/data/[filename]
 * Reads and returns a JSON data file.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const data = readJson(filename);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}

/**
 * PUT /api/data/[filename]
 * Writes data to a JSON file. Used by admin panel editors.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const data = await req.json();
    writeJson(filename, data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Write failed" }, { status: 500 });
  }
}
