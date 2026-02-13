"use client";

import { motion } from "framer-motion";
import { FiStar, FiExternalLink, FiGithub } from "react-icons/fi";

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  language: string;
  topics: string[];
  featured?: boolean;
}

export default function ProjectCard({
  name,
  description,
  url,
  homepage,
  stars,
  language,
  topics,
  featured,
}: ProjectCardProps) {
  // Language color mapping
  const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    Python: "bg-green-500",
    Rust: "bg-orange-500",
    Go: "bg-cyan-500",
    HTML: "bg-red-500",
    CSS: "bg-purple-500",
    Java: "bg-red-600",
    Unknown: "bg-neutral-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`relative group rounded-2xl border p-6 transition-all duration-300 ${
        featured
          ? "border-neutral-900 dark:border-white bg-neutral-50 dark:bg-neutral-900"
          : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-400 dark:hover:border-neutral-600"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-4 px-3 py-1 text-xs font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full">
          Featured
        </span>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            aria-label="GitHub repo"
          >
            <FiGithub className="w-5 h-5" />
          </a>
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              aria-label="Live demo"
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            <span
              className={`w-3 h-3 rounded-full ${
                languageColors[language] || languageColors.Unknown
              }`}
            />
            {language}
          </span>
          <span className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
            <FiStar className="w-4 h-4" />
            {stars}
          </span>
        </div>
      </div>

      {topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-0.5 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
            >
              {topic}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
