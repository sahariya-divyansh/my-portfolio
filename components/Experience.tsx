"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE_DATA = [
  {
    role: "Student Insider",
    company: "Adobe",
    duration: "Sep 2026 - Present",
    meta: "2 mos · India",
    bullets: [
      "Selected as one of 100 Adobe Student Insiders from nearly 19,000 applicants across India.",
      "Collaborating with Adobe teams, sharing student perspectives, and gaining industry and mentorship experience.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code",
    duration: "Jul 2026 - Aug 2026",
    meta: "2 mos · Remote",
    bullets: [
      "Selected as an Open Source Contributor for GirlScript Summer of Code 2026 (GSSoC'26).",
      "Contributed to real-world open-source projects through pull requests, issue resolution, feature development, and collaboration with maintainers and developers.",
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
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[600px] scroll-mt-16 bg-[#ffffff]"
    >
      <h2 className="font-display text-5xl md:text-7xl text-[#000000] mb-16 tracking-wide text-left">
        EXPERIENCE
      </h2>

      <div className="relative timeline-items-container pl-6 md:pl-10">
        {/* Main Background Line (Static thin line) */}
        <div className="absolute left-[3px] md:left-[5px] top-2 bottom-2 w-[2px] bg-[#404040]/20" />

        {/* Animated Drawing Line */}
        <div className="absolute left-[3px] md:left-[5px] top-2 w-[2px] bg-[#404040] origin-top timeline-line-indicator" />

        <div className="flex flex-col gap-16">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={idx} className="relative timeline-item pl-8 md:pl-12 select-none group">
              {/* Timeline Bullet (Dot) */}
              <div className="absolute left-[-26px] md:left-[-39px] top-1.5 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-[#404040] bg-[#404040] z-10 transition-transform duration-300 group-hover:scale-125" />

              {/* Entry Content */}
              <div>
                <span className="font-body text-xs md:text-sm font-bold text-[#404040]/60 uppercase tracking-widest block mb-1">
                  {exp.duration} &bull; {exp.company} {exp.meta && `\u2022 ${exp.meta}`}
                </span>
                <h3 className="font-body text-xl md:text-2xl font-bold uppercase tracking-wider text-[#404040] mb-4">
                  {exp.role}
                </h3>

                <ul className="list-disc pl-4 space-y-2 max-w-3xl">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="font-body text-sm md:text-base text-[#404040]/80 leading-relaxed marker:text-[#404040]/60"
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
