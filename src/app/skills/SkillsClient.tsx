"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface Props {
  categories: SkillCategory[];
}

export default function SkillsClient({ categories }: Props) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
          Skills & Technologies
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 mb-12 max-w-2xl">
          Technologies I work with and my proficiency level in each.
        </p>
      </motion.div>

      <div className="space-y-12">
        {categories.map((category, catIdx) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1, duration: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">
              {category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.skills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: catIdx * 0.1 + skillIdx * 0.05,
                    duration: 0.3,
                  }}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-neutral-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-neutral-900 dark:bg-white rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
