"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2, FiEdit3 } from "react-icons/fi";

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

export default function AdminBlog() {
  const [data, setData] = useState<BlogData | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/data/blog.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async (newData: BlogData) => {
    setSaving(true);
    await fetch("/api/data/blog.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    setSaving(false);
    setMsg("Blog saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  const addPost = () => {
    if (!data) return;
    const newPost: BlogPost = {
      title: "New Blog Post",
      slug: `new-post-${Date.now()}`,
      content: "Write your content here...",
      tags: [],
      publishedAt: new Date().toISOString().split("T")[0],
      excerpt: "A brief description of your post.",
    };
    const updated = { posts: [newPost, ...data.posts] };
    setData(updated);
    setEditing(0);
  };

  const deletePost = (idx: number) => {
    if (!data) return;
    if (!confirm("Delete this post?")) return;
    const updated = { posts: data.posts.filter((_, i) => i !== idx) };
    setData(updated);
    save(updated);
    setEditing(null);
  };

  const updatePost = (idx: number, field: keyof BlogPost, value: string | string[]) => {
    if (!data) return;
    const updated = { ...data };
    const post = { ...updated.posts[idx], [field]: value };
    // Auto-generate slug from title
    if (field === "title") {
      post.slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    updated.posts[idx] = post;
    setData({ ...updated });
  };

  if (!data) return <p className="text-neutral-500">Loading...</p>;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Blog Manager</h1>
          <p className="text-neutral-500 text-sm">
            Create, edit, and manage blog posts.
          </p>
        </div>
        <button
          onClick={addPost}
          className="flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-200 transition-colors text-sm"
        >
          <FiPlus className="w-4 h-4" /> New Post
        </button>
      </div>

      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-2 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm"
        >
          {msg}
        </motion.div>
      )}

      {editing !== null && data.posts[editing] && (
        <div className="mb-8 p-6 rounded-2xl border border-neutral-800 bg-neutral-900 space-y-4">
          <h3 className="text-lg font-semibold text-white">Edit Post</h3>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Title</label>
            <input
              value={data.posts[editing].title}
              onChange={(e) => updatePost(editing, "title", e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Slug: {data.posts[editing].slug}
            </label>
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Excerpt
            </label>
            <input
              value={data.posts[editing].excerpt}
              onChange={(e) => updatePost(editing, "excerpt", e.target.value)}
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Tags (comma-separated)
            </label>
            <input
              value={data.posts[editing].tags.join(", ")}
              onChange={(e) =>
                updatePost(
                  editing,
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white focus:outline-none focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Content (Markdown supported)
            </label>
            <textarea
              value={data.posts[editing].content}
              onChange={(e) => updatePost(editing, "content", e.target.value)}
              rows={12}
              className="w-full px-4 py-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-neutral-600 resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                save(data);
                setEditing(null);
              }}
              disabled={saving}
              className="px-5 py-2 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-200 transition-colors text-sm disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Post"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-5 py-2 border border-neutral-700 text-neutral-400 rounded-xl hover:text-white hover:border-neutral-500 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className="space-y-3">
        {data.posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-neutral-700 transition-colors"
          >
            <div>
              <h3 className="text-sm font-medium text-white">{post.title}</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                {post.publishedAt} · {post.tags.join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(i)}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                title="Edit"
              >
                <FiEdit3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => deletePost(i)}
                className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                title="Delete"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
