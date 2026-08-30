"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILLS_DATA = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "HTML5", "CSS3", "C++"],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js (App Router)",
      "Tailwind CSS",
      "GSAP (ScrollTrigger)",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "Redux Toolkit",
    ],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Figma", "Docker", "Firebase", "PostgreSQL"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const categories = containerRef.current.querySelectorAll(".skill-category-card");

    categories.forEach((card) => {
      const heading = card.querySelector(".category-title");
      const tags = card.querySelectorAll(".skill-tag");

      // Heading animation
      gsap.fromTo(
        heading,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );

      // Staggered tag animation
      gsap.fromTo(
        tags,
        { opacity: 0, scale: 0.85, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[600px] scroll-mt-16"
    >
      <h2 className="font-display text-5xl md:text-7xl text-dark-charcoal mb-16 tracking-wide text-left">
        SKILLS & STACK
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 skills-grid">
        {SKILLS_DATA.map((cat, catIdx) => (
          <div
            key={catIdx}
            className="skill-category-card p-8 bg-transparent border-2 border-dashed border-dark-charcoal/30 rounded-2xl flex flex-col gap-6"
          >
            <h3 className="category-title font-body text-xl font-bold uppercase tracking-wider text-dark-charcoal border-b-2 border-dark-charcoal/20 pb-3 select-none">
              {cat.category}
            </h3>

            <div className="flex flex-wrap gap-3">
              {cat.skills.map((skill, skillIdx) => (
                <div
                  key={skillIdx}
                  className="skill-tag font-body text-xs md:text-sm font-semibold text-dark-charcoal bg-[#DFDAC3] border-2 border-dark-charcoal px-4 py-2 rounded-xl shadow-[3px_3px_0px_0px_#1C1C1C] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#1C1C1C] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[3px_3px_0px_0px_#1C1C1C] transition-all cursor-default select-none"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
