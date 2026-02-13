import { readJson } from "@/lib/json-db";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

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

/** Estimate reading time */
function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateStaticParams() {
  const data = readJson<BlogData>("blog.json");
  return data.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = readJson<BlogData>("blog.json");
  const post = data.posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | Blog` : "Post Not Found",
    description: post?.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = readJson<BlogData>("blog.json");
  const post = data.posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);

  return <BlogPostClient post={post} readingTime={readingTime} />;
}
