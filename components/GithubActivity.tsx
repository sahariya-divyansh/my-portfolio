"use client";

import { useEffect, useState } from "react";
import ContributionSkyline, { ContributionDay } from "@/components/ui/contribution-skyline";
import { motion } from "framer-motion";

export default function GithubActivity() {
  const [githubData, setGithubData] = useState<ContributionDay[] | undefined>(undefined);

  useEffect(() => {
    // Optionally fetch real GitHub contribution data from API route
    fetch("/api/github-contributions")
      .then((res) => res.json())
      .then((data) => {
        if (data.days && data.days.length > 0) {
          setGithubData(data.days);
        }
      })
      .catch(() => {
        // Fallback to built-in sample data generator
      });
  }, []);

  return (
    <section
      id="github-activity"
      className="w-full scroll-mt-16 bg-[#ffffff] px-6 py-24 md:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-left font-display text-5xl tracking-wide text-[#000000] md:text-7xl"
        >
          CODE ACTIVITY
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <ContributionSkyline
            data={githubData}
            title="A year of building, one commit at a time"
            unit="contribution"
            palette={{
              light: ["#d4d4d4", "#a3a3a3", "#737373", "#000000"],
              dark: ["#d4d4d4", "#a3a3a3", "#737373", "#000000"],
            }}
            defaultView="3d"
            className="!border-[#404040] !bg-[#ffffff] [&_h3]:!text-[#404040]"
          />
        </motion.div>
      </div>
    </section>
  );
}
