"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_DATA = [
  {
    role: "Senior Frontend Developer",
    company: "Starlight Tech Solutions",
    duration: "2025 - Present",
    bullets: [
      "Pioneered migration of legacy dashboard assets to Next.js 15 (App Router), improving page loading times by 40%.",
      "Collaborated with UI/UX designers to implement pixel-perfect micro-animations, standardizing motion specs with Framer Motion.",
      "Mentored junior engineers and conducted structured sessions on semantic HTML and responsive practices.",
    ],
  },
  {
    role: "Frontend Engineer",
    company: "Hyperion Lab Inc.",
    duration: "2024 - 2025",
    bullets: [
      "Developed modular dashboard panels utilizing React and TypeScript, managing server-state caching efficiently.",
      "Optimized build systems and localized chunk sizes, decreasing final JS bundle size by 18%.",
      "Drafted comprehensive unit and integration test coverage matching 90%+ target validation.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Apex Digital Systems",
    duration: "2023 - 2024",
    bullets: [
      "Engineered clean semantic UI components with HTML, CSS, and vanilla JavaScript for corporate landing pages.",
      "Integrated REST API endpoints and verified request schemas, coordinating closely with backend leads.",
      "Identified and resolved critical memory leaks, elevating client-side performance.",
    ],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Timeline entries slide/fade in
    const items = containerRef.current.querySelectorAll(".timeline-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Draw the vertical connector line on scroll
    gsap.fromTo(
      containerRef.current.querySelector(".timeline-line-indicator"),
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current.querySelector(".timeline-items-container"),
          start: "top 70%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[600px] scroll-mt-16"
    >
      <h2 className="font-display text-5xl md:text-7xl text-dark-charcoal mb-16 tracking-wide text-left">
        EXPERIENCE
      </h2>

      <div className="relative timeline-items-container pl-6 md:pl-10">
        {/* Main Background Line (Static thin line) */}
        <div className="absolute left-[3px] md:left-[5px] top-2 bottom-2 w-[2px] bg-dark-charcoal/10" />

        {/* Animated Drawing Line */}
        <div className="absolute left-[3px] md:left-[5px] top-2 w-[2px] bg-dark-charcoal origin-top timeline-line-indicator" />

        <div className="flex flex-col gap-16">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={idx} className="relative timeline-item pl-8 md:pl-12 select-none group">
              {/* Timeline Bullet (Dot) */}
              <div className="absolute left-[-26px] md:left-[-39px] top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-dark-charcoal bg-[#87CEEB] z-10 transition-transform duration-300 group-hover:scale-125" />

              {/* Entry Content */}
              <div>
                <span className="font-body text-xs md:text-sm font-bold text-dark-charcoal/60 uppercase tracking-widest block mb-1">
                  {exp.duration} &bull; {exp.company}
                </span>
                <h3 className="font-body text-xl md:text-2xl font-bold uppercase tracking-wider text-dark-charcoal mb-4">
                  {exp.role}
                </h3>

                <ul className="list-disc pl-4 space-y-2 max-w-3xl">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="font-body text-sm md:text-base text-dark-charcoal/80 leading-relaxed marker:text-dark-charcoal/40"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
