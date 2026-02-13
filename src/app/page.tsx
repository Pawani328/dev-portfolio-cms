import { readJson } from "@/lib/json-db";
import { fetchGitHubProjects, Project } from "@/lib/github";
import HomeClient from "./HomeClient";

interface SiteData {
  name: string;
  title: string;
  hero: string;
  github: string;
  linkedin: string;
  twitter: string;
  featuredProjects: string[];
}

export default async function HomePage() {
  const site = readJson<SiteData>("site.json");
  const username = process.env.GITHUB_USERNAME || "octocat";
  let projects: Project[] = [];

  try {
    projects = await fetchGitHubProjects(username);
  } catch {
    projects = [];
  }

  // Mark featured projects
  const featuredProjects = projects
    .map((p) => ({
      ...p,
      featured: site.featuredProjects.includes(p.name),
    }))
    .filter((p) => p.featured)
    .slice(0, 3);

  return <HomeClient site={site} featuredProjects={featuredProjects} />;
}
