"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SiteData {
  name: string;
  title: string;
  hero: string;
  email: string;
  github: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  resumePath: string;
}

interface AboutData {
  headline: string;
  intro: string;
  sections: { title: string; content: string }[];
}

export default function AdminContent() {
  const [site, setSite] = useState<SiteData | null>(null);
  const [about, setAbout] = useState<AboutData | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/data/site.json").then((r) => r.json()).then(setSite);
    fetch("/api/data/about.json").then((r) => r.json()).then(setAbout);
  }, []);

  const saveSite = async () => {
    setSaving(true);
    await fetch("/api/data/site.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(site),
    });
    setSaving(false);
    setMsg("Site saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  const saveAbout = async () => {
    setSaving(true);
    await fetch("/api/data/about.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(about),
    });
    setSaving(false);
    setMsg("About saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  if (!site || !about) {
    return <p className="text-neutral-500">Loading...</p>;
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-2">Content Editor</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Edit your site content and about page.
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

      {/* Site Info */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Site Info</h2>
        <div className="space-y-4">
          {(["name", "title", "email"] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm text-neutral-400 mb-1 capitalize">
                {field}
              </label>
              <input
                type="text"
                value={site[field]}
                onChange={(e) =>
                  setSite({ ...site, [field]: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Hero Text
            </label>
            <textarea
              value={site.hero}
              onChange={(e) => setSite({ ...site, hero: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors resize-none"
            />
          </div>
        </div>

        <h3 className="text-md font-semibold text-white mt-6 mb-4">
          Social Links
        </h3>
        <div className="space-y-4">
          {(["github", "linkedin", "facebook", "twitter"] as const).map(
            (field) => (
              <div key={field}>
                <label className="block text-sm text-neutral-400 mb-1 capitalize">
                  {field}
                </label>
                <input
                  value={site[field]}
                  onChange={(e) =>
                    setSite({ ...site, [field]: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors"
                />
              </div>
            )
          )}
        </div>

        <button
          onClick={saveSite}
          disabled={saving}
          className="mt-6 px-6 py-2.5 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Site Info"}
        </button>
      </section>

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">About Page</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Headline
            </label>
            <input
              value={about.headline}
              onChange={(e) =>
                setAbout({ ...about, headline: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Intro</label>
            <textarea
              value={about.intro}
              onChange={(e) => setAbout({ ...about, intro: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-neutral-600 transition-colors resize-none"
            />
          </div>

          {about.sections.map((section, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-3"
            >
              <input
                value={section.title}
                onChange={(e) => {
                  const updated = [...about.sections];
                  updated[i] = { ...updated[i], title: e.target.value };
                  setAbout({ ...about, sections: updated });
                }}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600 text-sm"
                placeholder="Section title"
              />
              <textarea
                value={section.content}
                onChange={(e) => {
                  const updated = [...about.sections];
                  updated[i] = { ...updated[i], content: e.target.value };
                  setAbout({ ...about, sections: updated });
                }}
                rows={3}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-neutral-600 text-sm resize-none"
              />
            </div>
          ))}
        </div>

        <button
          onClick={saveAbout}
          disabled={saving}
          className="mt-6 px-6 py-2.5 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save About"}
        </button>
      </section>
    </div>
  );
}
