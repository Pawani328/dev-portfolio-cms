"use client";

import { motion } from "framer-motion";
import {
  FiMail,
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiDownload,
} from "react-icons/fi";

interface SiteData {
  name: string;
  email: string;
  resumePath: string;
  github: string;
  linkedin: string;
  facebook: string;
}

const contactLinks = (site: SiteData) => [
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: FiMail,
    text: site.email,
  },
  {
    label: "GitHub",
    href: site.github,
    icon: FiGithub,
    text: site.github?.replace("https://", ""),
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    icon: FiLinkedin,
    text: site.linkedin?.replace("https://", ""),
  },
  {
    label: "Facebook",
    href: site.facebook,
    icon: FiFacebook,
    text: site.facebook?.replace("https://", ""),
  },
];

export default function ContactClient({ site }: { site: SiteData }) {
  const links = contactLinks(site);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 max-w-xl">
          I&apos;m always open to new opportunities, collaborations, or just a
          friendly chat. Feel free to reach out!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group"
            >
              <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-700 transition-colors">
                <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {link.label}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate max-w-[200px]">
                  {link.text}
                </p>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Resume download */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <a
          href={site.resumePath}
          download
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm hover:opacity-90 transition-opacity"
        >
          <FiDownload className="w-5 h-5" />
          Download Resume
        </a>
      </motion.div>
    </div>
  );
}
