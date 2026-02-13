"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  tags,
  publishedAt,
  readingTime,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/blog/${slug}`} className="block group">
        <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-lg dark:hover:shadow-neutral-900/50">
          <div className="flex items-center gap-3 mb-3 text-sm text-neutral-500 dark:text-neutral-400">
            <time>{new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
            <span>·</span>
            <span>{readingTime} min read</span>
          </div>

          <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
            {title}
          </h3>

          <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2">
            {excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
