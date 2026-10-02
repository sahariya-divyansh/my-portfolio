"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useRef, ReactNode } from "react";

/** Pins `children` while the user scrolls past this section, scaling/rotating it down as it releases. Self-contained height — does not affect anything rendered after it. */
export function ScrollPinOut({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -4]);

  return (
    <div ref={container} className="relative isolate h-[160vh]">
      <motion.div style={{ scale, rotate }} className="sticky top-0 h-screen overflow-hidden">
        {children}
      </motion.div>
    </div>
  );
}

/** Scales/rotates `children` into place once as it enters the viewport — does not trap or constrain its height, so content of any length flows normally. */
export function ScrollRevealIn({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.92, rotate: 3, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -200px 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}
