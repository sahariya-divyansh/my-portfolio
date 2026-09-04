"use client";

import { useEffect, useRef } from "react";
import { Award, Trophy, Star, ShieldCheck, ImageIcon, Flower2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS_DATA = [
  {
    title: "HackIndia Spark 6 Finalist",
    issuer: "HackIndia",
    date: "2026",
    description: "Secured 5th place among 1,500+ Teams at HackIndia Spark 6, one of India's largest student hackathons, held over 2 days at the National Institute of Technology, Delhi.",
    icon: ShieldCheck,
    rotate: "-rotate-2",
    width: "lg:w-[92%]",
    align: "lg:self-start",
    margin: "",
  },
  {
    title: "1st Place - Delta Hackathon",
    issuer: "Delta Devs Association",
    date: "2025",
    description: "Awarded top place among 120 teams for developing an AI-driven accessibility routing application.",
    icon: Trophy,
    rotate: "rotate-1",
    width: "lg:w-[78%]",
    align: "lg:self-end",
    margin: "lg:-mt-4",
  },
  {
    title: "Google Hash Code Finalist",
    issuer: "Google",
    date: "2024",
    description: "Ranked in the top 5% globally during the online qualification round of Google's team programming competition.",
    icon: Award,
    rotate: "-rotate-1",
    width: "lg:w-[85%]",
    align: "lg:self-start",
    margin: "lg:mt-2",
  },
  {
    title: "Outstanding Student Award",
    issuer: "University Board",
    date: "2023 - 2024",
    description: "Recognized for maintaining top academic standing (GPA 3.96/4.0) alongside active club contributions.",
    icon: Star,
    rotate: "rotate-2",
    width: "lg:w-[70%]",
    align: "lg:self-end",
    margin: "lg:-mt-2",
  },
];

// Placeholder photo collage data — swap `src` with real images later (e.g. /images/achievements/photo-1.webp)
const PHOTO_COLLAGE = [
  { id: 1, size: "w-[46%] aspect-[3/4]", pos: "top-0 left-0", rotate: "-rotate-3", z: "z-10" },
  { id: 2, size: "w-[50%] aspect-square", pos: "top-4 right-0", rotate: "rotate-2", z: "z-20" },
  { id: 3, size: "w-[55%] aspect-[4/3]", pos: "top-[38%] left-[8%]", rotate: "rotate-3", z: "z-30" },
  { id: 4, size: "w-[42%] aspect-[3/4]", pos: "bottom-0 left-0", rotate: "-rotate-2", z: "z-20" },
  { id: 5, size: "w-[46%] aspect-square", pos: "bottom-2 right-0", rotate: "rotate-1", z: "z-10" },
];

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const photos = containerRef.current.querySelectorAll(".collage-photo");
    const cards = containerRef.current.querySelectorAll(".achievement-card");
    const decor = containerRef.current.querySelectorAll(".collage-decor");

    gsap.fromTo(
      photos,
      { opacity: 0, scale: 0.85, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

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

    gsap.fromTo(
      decor,
      { opacity: 0, scale: 0, rotate: -20 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.4,
        ease: "back.out(2)",
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-10 items-start">
        {/* LEFT: Photo collage */}
        <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0">
          {PHOTO_COLLAGE.map((photo) => (
            <div
              key={photo.id}
              className={`collage-photo absolute ${photo.size} ${photo.pos} ${photo.rotate} ${photo.z} bg-[#DFDAC3] border-2 border-dark-charcoal rounded-lg shadow-[4px_4px_0px_0px_#1C1C1C] overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-105 hover:z-40`}
            >
              <div className="flex flex-col items-center gap-2 text-dark-charcoal/40">
                <ImageIcon size={28} />
                <span className="font-body text-[10px] uppercase tracking-widest">
                  Photo {photo.id}
                </span>
              </div>
            </div>
          ))}

          {/* Decorative scrapbook elements */}
          <div className="collage-decor absolute -top-6 -left-6 text-[#E8B84B] rotate-[-12deg] z-40">
            <Flower2 size={40} strokeWidth={1.5} />
          </div>
          <div className="collage-decor absolute -bottom-4 right-6 text-dark-charcoal/70 rotate-[8deg] z-40">
            <Sparkles size={28} strokeWidth={1.5} />
          </div>
        </div>

        {/* RIGHT: Achievement cards — varied size/position, no overlap */}
        <div className="flex flex-col gap-10 w-full">
          {ACHIEVEMENTS_DATA.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className={`achievement-card w-full ${item.width} ${item.align} ${item.margin} p-6 bg-transparent border-2 border-dark-charcoal rounded-2xl flex flex-col items-start gap-4 select-none relative group hover:bg-[#DFDAC3]/25 transition-all duration-300 ${item.rotate} hover:rotate-0`}
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
      </div>
    </section>
  );
}