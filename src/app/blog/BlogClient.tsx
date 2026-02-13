"use client";

import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  publishedAt: string;
  excerpt: string;
  readingTime: number;
}

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12">
          Thoughts on development, technology, and building things for the web.
        </p>
      </motion.div>

      <div className="space-y-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-neutral-500 dark:text-neutral-400">
          No blog posts yet. Check back soon!
        </p>
      )}
    </div>
  );
}
