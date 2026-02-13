"use client";

import { motion } from "framer-motion";

interface AboutData {
  headline: string;
  intro: string;
  sections: { title: string; content: string }[];
  timeline: { year: string; title: string; description: string }[];
}

export default function AboutClient({ data }: { data: AboutData }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          {data.headline}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed">
          {data.intro}
        </p>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-10 mb-16">
        {data.sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
              {section.title}
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">
          Timeline
        </h2>
        <div className="relative border-l-2 border-neutral-200 dark:border-neutral-800 pl-8 space-y-10">
          {data.timeline.map((item, i) => (
            <motion.div
              key={item.year + item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full border-2 border-neutral-900 dark:border-white bg-white dark:bg-neutral-950" />
              <span className="text-sm font-mono font-bold text-neutral-500 dark:text-neutral-400">
                {item.year}
              </span>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mt-1">
                {item.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
