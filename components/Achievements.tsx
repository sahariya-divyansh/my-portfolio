"use client";

import { useEffect, useRef } from "react";
import { Trophy, Award, GitBranch } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS_DATA = [
  {
    icon: Trophy,
    text: "5th Place among 1,500+ teams, HackIndia Spark 6 hackathon, NIT Delhi",
  },
  {
    icon: Award,
    text: "Adobe Student Insider (2026–27) — selected among top 100 from 19,000+ applicants nationwide (~0.5% acceptance)",
  },
  {
    icon: GitBranch,
    text: "400+ contributions in the last year on GitHub",
  },
];

const SOFT_SKILLS = [
  "Technical Communication",
  "Problem Solving",
  "Leadership",
  "Team Collaboration",
  "Speedcubing",
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll(".achievement-item");
    gsap.fromTo(
      items,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="w-full scroll-mt-16 bg-white px-6 py-24 md:px-12"
    >
      <div className="mx-auto w-full max-w-4xl">
        <h2 className="mb-12 text-left font-display text-5xl tracking-wide text-black md:text-7xl">
          ACHIEVEMENTS
        </h2>

        <ul className="flex flex-col gap-6">
          {ACHIEVEMENTS_DATA.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={i}
                className="achievement-item flex items-start gap-4 border-b border-black/10 pb-6"
              >
                <Icon size={22} className="mt-1 flex-shrink-0 text-black" />
                <p className="font-body text-base leading-relaxed text-black/80 md:text-lg">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>

        <h3 className="mb-6 mt-16 text-left font-display text-3xl tracking-wide text-black md:text-4xl">
          SOFT SKILLS
        </h3>
        <div className="flex flex-wrap gap-3">
          {SOFT_SKILLS.map((skill, i) => (
            <span
              key={i}
              className="achievement-item rounded-full border border-black/20 px-4 py-2 font-body text-sm text-black/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}