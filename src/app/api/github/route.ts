import { NextResponse } from "next/server";
import { fetchGitHubProjects } from "@/lib/github";

/**
 * GET /api/github
 * Returns GitHub repos for the configured username.
 */
export async function GET() {
  const username = process.env.GITHUB_USERNAME || "octocat";

  try {
    const projects = await fetchGitHubProjects(username);
    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ projects: [] }, { status: 500 });
  }
}
