"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[650px] w-full flex flex-col justify-center items-center overflow-hidden bg-[#87CEEB] pt-16 select-none"
    >
      {/* Decorative Floating 3D Icon */}
      <motion.div
        className="absolute top-1/4 right-10 md:right-32 w-16 h-16 md:w-24 md:h-24 z-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1],
          scale: [0, 1, 1],
          y: [0, -15, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
          rotate: { repeat: Infinity, duration: 15, ease: "linear" },
          opacity: { delay: 1, duration: 0.5 },
          scale: { delay: 1, duration: 0.5 },
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <radialGradient id="glassGrad" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#DFDAC3" />
              <stop offset="60%" stopColor="#c2bc9a" />
              <stop offset="100%" stopColor="#1C1C1C" />
            </radialGradient>
          </defs>
          <path
            d="M 50 10 L 90 35 L 90 75 L 50 95 L 10 75 L 10 35 Z"
            fill="url(#glassGrad)"
            stroke="#1C1C1C"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M 50 10 L 50 95"
            stroke="#1C1C1C"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M 10 35 L 50 55 L 90 35"
            fill="none"
            stroke="#1C1C1C"
            strokeWidth="2"
          />
        </svg>
      </motion.div>

      {/* Decorative Floating Left Icon (Sphere) */}
      <motion.div
        className="absolute bottom-1/4 left-8 md:left-24 w-12 h-12 md:w-20 md:h-20 z-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 1],
          scale: [0, 1, 1],
          y: [0, 12, 0],
          x: [0, 5, 0],
        }}
        transition={{
          y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
          x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
          opacity: { delay: 1.2, duration: 0.5 },
          scale: { delay: 1.2, duration: 0.5 },
        }}
      >
        <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-md">
          <defs>
            <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#DFDAC3" />
              <stop offset="70%" stopColor="#1C1C1C" />
              <stop offset="100%" stopColor="#0D0D0D" />
            </radialGradient>
          </defs>
          <circle cx="40" cy="40" r="35" fill="url(#sphereGrad)" stroke="#DFDAC3" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Layout Content Wrapper */}
      <div className="relative w-full max-w-7xl flex flex-col items-center justify-center">
        {/* Giant Outlined Text */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(4.5rem,14vw,14rem)] leading-none text-stroke text-center z-0 tracking-wider pointer-events-none select-none"
        >
          PORTFOLIO
        </motion.h1>

        {/* Profile Image Overlay (Centering and Overlapping) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 mt-16 md:mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[480px] md:h-[480px]"
          >
            <Image
              src="/images/profile.webp"
              alt="Divyansh Sahariya"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Scrolling Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer z-20"
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
