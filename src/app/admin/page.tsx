"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiEye, FiStar, FiBook, FiTrendingUp } from "react-icons/fi";

/**
 * Mock analytics data — generates believable randomized stats.
 * Clearly marked as internal mock analytics system.
 */
function generateMockStats() {
  return {
    pageViews: Math.floor(Math.random() * 5000) + 2500,
    totalProjects: Math.floor(Math.random() * 10) + 15,
    blogReads: Math.floor(Math.random() * 3000) + 1200,
    topProject: "awesome-project",
    weeklyGrowth: (Math.random() * 15 + 5).toFixed(1),
    dailyViews: Array.from({ length: 7 }, () =>
      Math.floor(Math.random() * 400 + 100)
    ),
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<ReturnType<typeof generateMockStats> | null>(null);

  useEffect(() => {
    setStats(generateMockStats());
  }, []);

  if (!stats) return null;

  const cards = [
    {
      label: "Page Views",
      value: stats.pageViews.toLocaleString(),
      icon: FiEye,
      change: `+${stats.weeklyGrowth}%`,
    },
    {
      label: "Projects",
      value: stats.totalProjects.toString(),
      icon: FiStar,
      change: "+2",
    },
    {
      label: "Blog Reads",
      value: stats.blogReads.toLocaleString(),
      icon: FiBook,
      change: "+12%",
    },
    {
      label: "Growth",
      value: `${stats.weeklyGrowth}%`,
      icon: FiTrendingUp,
      change: "This week",
    },
  ];

  const maxView = Math.max(...stats.dailyViews);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Overview of your portfolio performance.{" "}
        <span className="text-neutral-600 italic">(Mock analytics)</span>
      </p>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-neutral-800 bg-neutral-900"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-neutral-400" />
                <span className="text-xs text-green-400 font-medium">
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-white">{card.value}</p>
              <p className="text-xs text-neutral-500 mt-1">{card.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Mini chart */}
      <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900">
        <h3 className="text-sm font-medium text-neutral-400 mb-4">
          Daily Views (Last 7 Days)
        </h3>
        <div className="flex items-end gap-2 h-32">
          {stats.dailyViews.map((views, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(views / maxView) * 100}%` }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex-1 bg-white/20 rounded-t-lg hover:bg-white/30 transition-colors relative group"
            >
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                {views}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-neutral-600">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
