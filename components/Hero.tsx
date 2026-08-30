"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const portfolioTextClass =
    "absolute inset-0 flex items-center justify-center font-display text-[clamp(9rem,20vw,24rem)] font-bold leading-none tracking-[0.02em] text-center pointer-events-none select-none";

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#87CEEB] pt-16 select-none"
    >
      {/* Layout Content Wrapper */}
      <div className="relative h-full w-full">
        {/* Filled Text Layer */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`${portfolioTextClass} z-0 text-cream-accent`}
        >
          PORTFOLIO
        </motion.h1>

        {/* Profile Image Layer */}
        <motion.div
          initial={{ x: "-50%", scale: 0.94 }}
          animate={{ x: "-50%", scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 z-10 h-[min(clamp(38rem,86vh,58rem),95vw)] w-[min(clamp(38rem,86vh,58rem),95vw)] pointer-events-none"
        >
          <Image
            src="/images/profile.webp"
            alt="Divyansh Sahariya"
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 1024px) 95vw, 928px"
            priority
          />
        </motion.div>

        {/* Stroke Text Layer */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`${portfolioTextClass} z-20 text-stroke`}
          aria-hidden="true"
        >
          PORTFOLIO
        </motion.h1>
      </div>

      {/* Scrolling Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-6 z-30 flex cursor-pointer flex-col items-start gap-2 md:left-12 lg:left-16"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <span className="font-body text-xs uppercase tracking-widest text-dark-charcoal/60 font-semibold">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1.5 h-6 bg-dark-charcoal/60 rounded-full"
        />
      </motion.div>
    </section>
  );
}
