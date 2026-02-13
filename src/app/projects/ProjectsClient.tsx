"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/github";

interface Props {
  projects: (Project & { featured: boolean })[];
}

export default function ProjectsClient({ projects }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 max-w-2xl">
          A collection of my open-source projects and experiments. Fetched live
          from GitHub.
        </p>
      </motion.div>

      {projects.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          No projects found. Check your GitHub username in the environment variables.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
