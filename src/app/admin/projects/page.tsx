"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

interface Project {
  name: string;
  description: string;
  stars: number;
  language: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featured, setFeatured] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub projects
    fetch("/api/github")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data.projects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch current featured list
    fetch("/api/data/site.json")
      .then((r) => r.json())
      .then((data) => setFeatured(data.featuredProjects || []));
  }, []);

  const toggleFeatured = (name: string) => {
    setFeatured((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const save = async () => {
    setSaving(true);
    // Read current site data, update featuredProjects
    const siteRes = await fetch("/api/data/site.json");
    const siteData = await siteRes.json();
    siteData.featuredProjects = featured;

    await fetch("/api/data/site.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(siteData),
    });
    setSaving(false);
    setMsg("Featured projects saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-2">
        Featured Projects
      </h1>
      <p className="text-neutral-500 text-sm mb-8">
        Toggle which GitHub projects appear as featured on your site.
      </p>

      {msg && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-2 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm"
        >
          {msg}
        </motion.div>
      )}

      {loading ? (
        <p className="text-neutral-500">Loading projects from GitHub...</p>
      ) : (
        <>
          <div className="space-y-2">
            {projects.map((project) => {
              const isFeatured = featured.includes(project.name);
              return (
                <button
                  key={project.name}
                  onClick={() => toggleFeatured(project.name)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                    isFeatured
                      ? "border-white bg-white/5"
                      : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {project.name}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      {project.description?.slice(0, 80) || "No description"}
                    </p>
                  </div>
                  <FiStar
                    className={`w-5 h-5 transition-colors ${
                      isFeatured ? "text-yellow-400" : "text-neutral-600"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="mt-8 px-6 py-2.5 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Featured"}
          </button>
        </>
      )}
    </div>
  );
}
