"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BLOGS_DATA = [
  {
    title: "Mastering the GSAP ScrollTrigger API",
    date: "August 25, 2026",
    excerpt:
      "A deep dive into creating robust, performance-optimized scroll animations in modern React components without lagging or layout shifting.",
    link: "https://medium.com/placeholder/gsap-scrolltrigger",
  },
  {
    title: "Why Next.js 15 App Router is a Paradigm Shift",
    date: "July 18, 2026",
    excerpt:
      "Unpacking Server Components, actions, caching policies, and the standard routing patterns redefining the frontend landscape.",
    link: "https://dev.to/placeholder/nextjs-15-app-router",
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
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[600px] scroll-mt-16"
    >
      <h2 className="font-display text-5xl md:text-7xl text-dark-charcoal mb-16 tracking-wide text-left">
        LATEST BLOGS
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BLOGS_DATA.map((blog, idx) => (
          <motion.a
            key={idx}
            href={blog.link}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-card p-8 bg-[#DFDAC3] border-2 border-dark-charcoal rounded-2xl flex flex-col justify-between shadow-[4px_4px_0px_0px_#1C1C1C] transition-shadow duration-300"
            whileHover={{
              y: -8,
              x: -2,
              boxShadow: "8px 8px 0px 0px #1C1C1C",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              {/* Date */}
              <span className="font-body text-xs font-bold text-dark-charcoal/60 uppercase tracking-widest block mb-2">
                {blog.date}
              </span>

              {/* Title */}
              <h3 className="font-body text-lg md:text-xl font-bold uppercase tracking-wider text-dark-charcoal mb-4 line-clamp-2 leading-snug">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="font-body text-sm text-dark-charcoal/80 mb-6 leading-relaxed line-clamp-3">
                {blog.excerpt}
              </p>
            </div>

            {/* Read More link */}
            <div className="flex items-center gap-1 font-body text-xs font-bold uppercase tracking-widest text-dark-charcoal hover:opacity-85 transition-opacity pt-4 border-t border-dark-charcoal/10 mt-auto">
              Read Article <ArrowUpRight size={16} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
