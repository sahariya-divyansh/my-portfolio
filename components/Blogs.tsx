"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLOGS_DATA = [
  {
    title: "HackIndia Spark 6 Experience",
    date: "April 2026",
    excerpt:
      "1,500 Teams. One Night. Zero Sleep. This Is How We Cracked Top 5 at HackIndia Spark 6",
    link: "https://medium.com/@sahariyadivyansh/1-500-teams-one-night-zero-sleep-this-is-how-we-cracked-top-5-at-hackindia-spark-6-49e7db38d182?sharedUserId=sahariyadivyansh",
  },
  {
    title: "Cache Simulator Project",
    date: "August 2026",
    excerpt:
      "I Built a Cache Simulator in C and Almost Published a Wrong Conclusion",
    link: "https://medium.com/@sahariyadivyansh/i-built-a-cache-simulator-in-c-and-almost-published-a-wrong-conclusion-48be374d7043?sharedUserId=sahariyadivyansh",
  },
  {
    title: "Architecting Accessible UI Kits with Tailwind CSS",
    date: "June 02, 2026",
    excerpt:
      "Essential guidelines covering keyboard navigation, focus states, screen reader considerations, and custom styling tokens.",
    link: "https://dev.to/placeholder/accessible-ui-tailwind",
  },
];

export default function Blogs() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".blog-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="blogs"
      ref={containerRef}
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[600px] scroll-mt-16 bg-[#DFDAC3]"
    >
      <h2 className="font-display text-5xl md:text-7xl text-[#BE3519] mb-16 tracking-wide text-left">
        LATEST BLOGS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOGS_DATA.map((blog, idx) => (
          <motion.a
            key={idx}
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-card p-8 bg-[#DFDAC3] border-2 border-[#522A25] rounded-2xl flex flex-col justify-between shadow-[4px_4px_0px_0px_#522A25] transition-shadow duration-300"
            whileHover={{
              y: -8,
              x: -2,
              boxShadow: "8px 8px 0px 0px #522A25",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              {/* Date */}
              <span className="font-body text-xs font-bold text-[#522A25]/60 uppercase tracking-widest block mb-2">
                {blog.date}
              </span>

              {/* Title */}
              <h3 className="font-body text-lg md:text-xl font-bold uppercase tracking-wider text-[#522A25] mb-4 line-clamp-2 leading-snug">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="font-body text-sm text-[#522A25]/80 mb-6 leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>
            </div>

            {/* Read More link */}
            <div className="flex items-center gap-1 font-body text-xs font-bold uppercase tracking-widest text-[#BE3519] hover:opacity-85 transition-opacity pt-4 border-t border-[#522A25]/15 mt-auto">
              Read Article <ArrowUpRight size={16} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
