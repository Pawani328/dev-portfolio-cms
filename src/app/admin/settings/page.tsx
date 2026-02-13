"use client";

import { useState } from "react";

export default function AdminSettings() {
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_authed");
    setLoggedOut(true);
    const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET || "admin";
    window.location.href = `/${secret}`;
  };

  if (loggedOut) return null;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
      <p className="text-neutral-500 text-sm mb-8">
        Manage your admin session and preferences.
      </p>

      <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900">
        <h3 className="text-lg font-semibold text-white mb-2">Admin Session</h3>
        <p className="text-neutral-500 text-sm mb-4">
          You are currently logged in to the admin panel. Click below to log out.
        </p>
        <button
          onClick={handleLogout}
          className="px-6 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors text-sm"
        >
          Log Out
        </button>
      </div>

      <div className="mt-6 p-6 rounded-2xl border border-neutral-800 bg-neutral-900">
        <h3 className="text-lg font-semibold text-white mb-2">About</h3>
        <p className="text-neutral-500 text-sm">
          Portfolio CMS v1.0 — Built with Next.js, TypeScript, and Tailwind CSS.
          Deployed on Vercel serverless. No database required.
        </p>
      </div>
    </div>
  );
}
