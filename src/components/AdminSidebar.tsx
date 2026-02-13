"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiFileText,
  FiCode,
  FiBook,
  FiStar,
  FiSettings,
} from "react-icons/fi";

const SECRET = process.env.NEXT_PUBLIC_ADMIN_SECRET || "admin";

const sidebarItems = [
  { href: `/${SECRET}`, label: "Dashboard", icon: FiHome },
  { href: `/${SECRET}/content`, label: "Content", icon: FiFileText },
  { href: `/${SECRET}/skills`, label: "Skills", icon: FiCode },
  { href: `/${SECRET}/blog`, label: "Blog Manager", icon: FiBook },
  { href: `/${SECRET}/projects`, label: "Featured Projects", icon: FiStar },
  { href: `/${SECRET}/settings`, label: "Settings", icon: FiSettings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-neutral-950 text-white border-r border-neutral-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-800">
        <Link href={`/${SECRET}`} className="text-xl font-bold tracking-tight">
          {"<Admin />"}
        </Link>
        <p className="text-xs text-neutral-500 mt-1">Portfolio CMS</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          // Match against both the secret path and the rewritten /admin path
          const adminPath = item.href.replace(`/${SECRET}`, "/admin");
          const isActive = pathname === item.href || pathname === adminPath;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-neutral-900"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-800"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
