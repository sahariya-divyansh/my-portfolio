"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { id: "stat-years", targetValue: 5, suffix: "+", label: "Years Learning", rotate: -3 },
  { id: "stat-projects", targetValue: 32, suffix: "+", label: "Projects Completed", rotate: 2 },
  { id: "stat-tools", targetValue: 20, suffix: "+", label: "Tools Mastered", rotate: -1.5 },
];

const HEADLINE_PLACEHOLDER = "I build systems that think, scale, and solve real problems.";

const PHILOSOPHY = [
  "I'm a Computer Science student, and my focus right now is deliberate: Data Structures & Algorithms, Machine Learning, and Quantum Computing. Not because they look good on a resume, but because they're the fundamentals that separate people who use technology from people who actually understand it.",
  "I've never been interested in shortcuts. Tools and frameworks change every year - the people who last are the ones who understand what's happening underneath. That's the game I'm playing. Strong fundamentals, sharp problem-solving, and the discipline to keep showing up even when it's not easy.",
  "I'm not here to collect certificates. I'm here to build real capability - the kind that doesn't need to be explained, because it shows up in how I think and how I work.",
  "Still early in the journey. But I know exactly where I'm headed.",
];

const bubbleVariants = [
  "left-0 top-20 rotate-[-7deg] rounded-[62%_38%_54%_46%/46%_58%_42%_54%]",
  "right-0 bottom-14 rotate-[6deg] rounded-[45%_55%_40%_60%/58%_42%_58%_42%]",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-media-reveal",
        { opacity: 0, scale: 0.88, y: 36 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top 78%",
          },
        }
      );

      STATS.forEach((stat) => {
        const el = document.getElementById(stat.id);
        if (!el) return;

        const obj = { value: 0 };
        gsap.to(obj, {
          value: stat.targetValue,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.innerText = Math.floor(obj.value) + stat.suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="w-full scroll-mt-16 bg-cream-accent px-6 py-24 text-[#522A25] md:px-12 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div ref={mediaRef} className="relative mx-auto min-h-[31rem] w-full max-w-[34rem]">
          <div className="absolute left-1/2 top-1/2 h-[min(28rem,82vw)] w-[min(28rem,82vw)] -translate-x-1/2 -translate-y-1/2">
            <div className="about-media-reveal relative h-full w-full overflow-hidden rounded-[60%_40%_55%_45%/50%_60%_40%_50%] border-2 border-[#522A25] bg-[#BE3519]/10 shadow-[10px_10px_0_0_rgba(82,42,37,0.18)]">
              <Image
                src="/images/about-photo.webp"
                alt="Divyansh Sahariya"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 82vw, 448px"
                priority={false}
              />
            </div>
          </div>

          <div className="about-media-reveal absolute left-4 top-6 z-20 flex h-24 w-28 rotate-[-8deg] items-center justify-center rounded-[58%_42%_48%_52%/45%_55%_45%_55%] border-2 border-[#522A25] bg-[#DFDAC3] text-[#BE3519] shadow-[4px_4px_0_0_rgba(82,42,37,0.25)] md:left-0">
            <svg viewBox="0 0 120 92" aria-hidden="true" className="h-16 w-20">
              <path
                d="M22 25h76v43H22zM15 74h90M42 38 31 47l11 9M78 38l11 9-11 9M64 35 55 60"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="5"
              />
            </svg>
          </div>

          {["Systems + AI curious", "Always prototyping"].map((text, index) => (
            <div
              key={text}
              className={`about-media-reveal absolute z-20 max-w-[10.5rem] border-2 border-dotted border-[#522A25] bg-[#DFDAC3]/90 px-5 py-4 text-center font-script text-2xl leading-none text-[#522A25] shadow-[3px_3px_0_0_rgba(82,42,37,0.18)] ${bubbleVariants[index]}`}
            >
              {text}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="about-text"
        >
          <p className="mb-5 font-body text-xs font-bold uppercase tracking-[0.32em] text-[#522A25]">
            About Me
          </p>
          <h2 className="max-w-3xl font-display text-6xl leading-[0.9] text-[#BE3519] sm:text-7xl lg:text-8xl">
            {HEADLINE_PLACEHOLDER}
          </h2>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 w-full max-w-4xl"
          >
            <h3 className="mb-5 inline-block border-b-2 border-[#522A25] font-display text-4xl leading-none tracking-[0.04em] text-[#BE3519]">
              WHAT DRIVES ME
            </h3>
            <div className="space-y-5 font-body text-base leading-7 text-[#522A25]/90">
              {PHILOSOPHY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.article>
        </motion.div>
      </div>

      <div className="mx-auto mt-20 grid w-full max-w-7xl gap-5 md:grid-cols-3">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 34, scale: 1.08, rotate: stat.rotate * 1.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: stat.rotate }}
            whileHover={{
              y: -4,
              scale: 1.02,
              rotate: stat.rotate,
              boxShadow: "0 18px 30px rgba(82, 42, 37, 0.28)",
            }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 16,
              mass: 0.9,
              delay: index * 0.15,
            }}
            className="relative flex min-h-40 flex-col justify-center overflow-hidden rounded-[0.7rem_0.95rem_0.8rem_1.05rem] border-2 border-[#522A25] bg-[#BE3519] px-8 py-7 text-[#DFDAC3] shadow-[0_10px_20px_rgba(82,42,37,0.22)]"
          >
            <span className="pointer-events-none absolute inset-x-4 top-3 border-t border-dashed border-[#522A25]/45" />
            <span className="pointer-events-none absolute bottom-3 left-5 h-2 w-16 rounded-full bg-[#522A25]/15 blur-sm" />
            <span
              id={stat.id}
              className="font-display text-6xl leading-none text-[#DFDAC3] md:text-7xl"
            >
              0{stat.suffix}
            </span>
            <span className="mt-2 font-body text-xs font-bold uppercase tracking-[0.22em] text-[#DFDAC3]/85">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
