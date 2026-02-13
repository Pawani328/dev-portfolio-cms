export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  updated_at: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  language: string;
  topics: string[];
  updatedAt: string;
  featured?: boolean;
}

// Simple in-memory cache for GitHub API responses
let cachedProjects: Project[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch public repos from GitHub API.
 * Filters out forks, sorts by stars descending, caches result.
 */
export async function fetchGitHubProjects(
  username: string
): Promise<Project[]> {
  // Return cached result if still fresh
  if (cachedProjects && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedProjects;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 }, // ISR cache for 5 min
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const repos: GitHubRepo[] = await res.json();

    const projects: Project[] = repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || "No description provided",
        url: repo.html_url,
        homepage: repo.homepage,
        stars: repo.stargazers_count,
        language: repo.language || "Unknown",
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
      }));

    // Cache the result
    cachedProjects = projects;
    cacheTimestamp = Date.now();

    return projects;
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return cachedProjects || [];
  }
}
