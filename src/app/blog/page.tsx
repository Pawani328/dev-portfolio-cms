import { readJson } from "@/lib/json-db";
import BlogClient from "./BlogClient";

interface BlogPost {
  title: string;
  slug: string;
  content: string;
  tags: string[];
  publishedAt: string;
  excerpt: string;
}

interface BlogData {
  posts: BlogPost[];
}

export const metadata = {
  title: "Blog | Developer Portfolio",
};

/** Estimate reading time from word count */
function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogPage() {
  const data = readJson<BlogData>("blog.json");

  const posts = data.posts
    .map((post) => ({
      ...post,
      readingTime: getReadingTime(post.content),
    }))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return <BlogClient posts={posts} />;
}
