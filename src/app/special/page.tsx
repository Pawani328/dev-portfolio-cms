"use client";

import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

/**
 * Hidden romantic message page — not linked anywhere.
 * Only accessible by directly navigating to /special
 */
export default function SpecialPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-lg"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-block mb-8"
        >
          <FiHeart className="w-16 h-16 text-red-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white mb-6"
        >
          This one&apos;s for you ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed"
        >
          Every line of code in this project was written with you in mind.
          You inspire me to build beautiful things — just like you are.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-neutral-500 dark:text-neutral-500 italic"
        >
          &ldquo;The best code is written with love.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-sm text-neutral-400 dark:text-neutral-600"
        >
          Made with 💖 just for you
        </motion.div>
      </motion.div>
    </div>
  );
}
