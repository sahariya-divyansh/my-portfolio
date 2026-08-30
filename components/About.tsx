"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { id: "stat-years", targetValue: 5, suffix: "+", label: "Years Learning" },
  { id: "stat-projects", targetValue: 32, suffix: "+", label: "Projects Completed" },
  { id: "stat-tools", targetValue: 20, suffix: "+", label: "Tools Mastered" },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Fade and slide in content on scroll
    gsap.fromTo(
      containerRef.current.querySelector(".about-text"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current.querySelector(".about-text"),
          start: "top 85%",
        },
      }
    );

    // Count up stats
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
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 min-h-[600px] scroll-mt-16"
    >
      {/* Bio text block */}
      <div className="w-full md:w-3/5 about-text">
        <h2 className="font-display text-5xl md:text-7xl text-dark-charcoal mb-8 tracking-wide">
          ABOUT ME
        </h2>
        <div className="font-body text-base md:text-lg text-dark-charcoal/80 space-y-6 leading-relaxed max-w-2xl">
          <p>
            Hello! I&apos;m <span className="font-semibold text-dark-charcoal">Divyansh Sahariya</span>, a passionate software developer dedicated to crafting highly interactive, visually striking, and functionally robust web experiences.
          </p>
          <p>
            I specialize in frontend architectures, blending modern JavaScript frameworks like Next.js with rich animation libraries like GSAP and Framer Motion to build interfaces that feel premium and alive.
          </p>
          <p className="text-sm border-l-4 border-dark-charcoal/40 pl-4 italic text-dark-charcoal/70">
            &quot;Design is not just what it looks like and feels like. Design is how it works.&quot; - Steve Jobs. I build with this philosophy at the core of every project.
          </p>
        </div>
      </div>

      {/* Stats block */}
      <div className="w-full md:w-2/5 flex flex-col gap-6">
        {STATS.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center justify-center p-8 bg-[#DFDAC3] border-2 border-dark-charcoal rounded-2xl shadow-[4px_4px_0px_0px_#1C1C1C] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 group"
          >
            <span
              id={stat.id}
              className="font-display text-5xl md:text-6xl text-dark-charcoal select-none"
            >
              0{stat.suffix}
            </span>
            <span className="font-body text-xs md:text-sm font-bold uppercase tracking-wider text-dark-charcoal/60 mt-2 select-none group-hover:text-dark-charcoal transition-colors">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
