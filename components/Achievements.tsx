"use client";

import { useEffect, useRef } from "react";
import { Award, Trophy, Star, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS_DATA = [
  {
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2025",
    description: "Successfully certified in designing high-availability, fault-tolerant, and cost-effective cloud architectures.",
    icon: ShieldCheck,
  },
  {
    title: "1st Place - Delta Hackathon",
    issuer: "Delta Devs Association",
    date: "2025",
    description: "Awarded top place among 120 teams for developing an AI-driven accessibility routing application.",
    icon: Trophy,
  },
  {
    title: "Google Hash Code Finalist",
    issuer: "Google",
    date: "2024",
    description: "Ranked in the top 5% globally during the online qualification round of Google's team programming competition.",
    icon: Award,
  },
  {
    title: "Outstanding Student Award",
    issuer: "University Board",
    date: "2023 - 2024",
    description: "Recognized for maintaining top academic standing (GPA 3.96/4.0) alongside active club contributions.",
    icon: Star,
  },
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".achievement-card");

    gsap.fromTo(
      cards,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.3)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="achievements"
      ref={containerRef}
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[600px] scroll-mt-16"
    >
      <h2 className="font-display text-5xl md:text-7xl text-dark-charcoal mb-16 tracking-wide text-left">
        ACHIEVEMENTS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {ACHIEVEMENTS_DATA.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div
              key={idx}
              className="achievement-card p-6 bg-transparent border-2 border-dark-charcoal rounded-2xl flex flex-col items-start gap-4 select-none relative group hover:bg-[#DFDAC3]/25 transition-all duration-300"
            >
              {/* Badge Icon */}
              <div className="p-3 bg-[#DFDAC3] border-2 border-dark-charcoal rounded-xl shadow-[2px_2px_0px_0px_#1C1C1C] text-dark-charcoal transition-transform duration-300 group-hover:scale-110">
                <IconComponent size={24} />
              </div>

              {/* Title & Issuer */}
              <div>
                <span className="font-body text-[10px] font-bold text-dark-charcoal/60 uppercase tracking-widest block mb-1">
                  {item.issuer} &bull; {item.date}
                </span>
                <h3 className="font-body text-lg font-bold uppercase tracking-wider text-dark-charcoal leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-body text-xs md:text-sm text-dark-charcoal/80 leading-relaxed mt-2">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
