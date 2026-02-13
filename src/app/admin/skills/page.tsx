"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsData {
  categories: SkillCategory[];
}

export default function AdminSkills() {
  const [data, setData] = useState<SkillsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/data/skills.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    await fetch("/api/data/skills.json", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg("Skills saved!");
    setTimeout(() => setMsg(""), 2000);
  };

  const addSkill = (catIdx: number) => {
    if (!data) return;
    const updated = { ...data };
    updated.categories[catIdx].skills.push({
      name: "New Skill",
      level: 50,
      icon: "",
    });
    setData({ ...updated });
  };

  const removeSkill = (catIdx: number, skillIdx: number) => {
    if (!data) return;
    const updated = { ...data };
    updated.categories[catIdx].skills.splice(skillIdx, 1);
    setData({ ...updated });
  };

  const updateSkill = (
    catIdx: number,
    skillIdx: number,
    field: keyof Skill,
    value: string | number
  ) => {
    if (!data) return;
    const updated = { ...data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updated.categories[catIdx].skills[skillIdx] as any)[field] = value;
    setData({ ...updated });
  };

  if (!data) return <p className="text-neutral-500">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-white mb-2">Skills Editor</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Manage your skills and proficiency levels.
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

      <div className="space-y-8">
        {data.categories.map((cat, catIdx) => (
          <div key={catIdx}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">{cat.name}</h2>
              <button
                onClick={() => addSkill(catIdx)}
                className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
              >
                <FiPlus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="space-y-3">
              {cat.skills.map((skill, skillIdx) => (
                <div
                  key={skillIdx}
                  className="flex items-center gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-900"
                >
                  <input
                    value={skill.name}
                    onChange={(e) =>
                      updateSkill(catIdx, skillIdx, "name", e.target.value)
                    }
                    className="flex-1 px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-600"
                    placeholder="Skill name"
                  />
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={skill.level}
                    onChange={(e) =>
                      updateSkill(
                        catIdx,
                        skillIdx,
                        "level",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-20 px-3 py-1.5 bg-neutral-800 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-600"
                  />
                  <span className="text-xs text-neutral-500">%</span>
                  <button
                    onClick={() => removeSkill(catIdx, skillIdx)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="mt-8 px-6 py-2.5 bg-white text-neutral-900 font-medium rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Skills"}
      </button>
    </div>
  );
}
