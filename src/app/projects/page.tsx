import { fetchGitHubProjects, Project } from "@/lib/github";
import { readJson } from "@/lib/json-db";
import ProjectsClient from "./ProjectsClient";

interface SiteData {
  featuredProjects: string[];
}

export const metadata = {
  title: "Projects | Developer Portfolio",
};

export default async function ProjectsPage() {
  const username = process.env.GITHUB_USERNAME || "octocat";
  const site = readJson<SiteData>("site.json");
  let projects: Project[] = [];

  try {
    projects = await fetchGitHubProjects(username);
  } catch {
    projects = [];
  }

  // Mark featured projects
  const projectsWithFeatured = projects.map((p) => ({
    ...p,
    featured: site.featuredProjects.includes(p.name),
  }));

  // Sort: featured first, then by stars
  projectsWithFeatured.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.stars - a.stars;
  });

  return <ProjectsClient projects={projectsWithFeatured} />;
}
