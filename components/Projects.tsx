"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    title: "OmniSearch Dashboard",
    description:
      "A real-time data visualizer and search indexer leveraging Next.js, Elasticsearch, and high-performance charts to aggregate complex multi-source search datasets.",
    tags: ["Next.js", "Elasticsearch", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/placeholder/omnisearch",
    demo: "https://demo.omnisearch.example.com",
  },
  {
    title: "Aether UI Kit",
    description:
      "A lightweight, fully accessible component library built from scratch, optimized for fluid layout animations, custom transitions, and dark-mode defaults.",
    tags: ["React", "Framer Motion", "TypeScript", "Vanilla CSS"],
    github: "https://github.com/placeholder/aether-ui",
    demo: "https://demo.aether-ui.example.com",
  },
  {
    title: "Chronos Task Engine",
    description:
      "A highly scalable, distributed task scheduling and cron execution engine running on Node.js and Redis, capable of processing millions of concurrent queues.",
    tags: ["Node.js", "Redis", "TypeScript", "Docker"],
    github: "https://github.com/placeholder/chronos-engine",
    demo: "https://demo.chronos.example.com",
  },
  {
    title: "Synapse Secure Chat",
    description:
      "An end-to-end encrypted chat web application that implements Web Crypto DH key exchanges, real-time message streams, and database persistence.",
    tags: ["React", "WebSockets", "Web Crypto API", "PostgreSQL"],
    github: "https://github.com/placeholder/synapse-chat",
    demo: "https://demo.synapse.example.com",
  },
];

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.querySelectorAll(".project-card");

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
          trigger: gridRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[600px] scroll-mt-16"
    >
      <h2 className="font-display text-5xl md:text-7xl text-dark-charcoal mb-16 tracking-wide text-left">
        SELECTED PROJECTS
      </h2>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 projects-grid">
        {PROJECTS_DATA.map((project, idx) => (
          <motion.div
            key={idx}
            className="project-card p-8 bg-[#DFDAC3] border-2 border-dark-charcoal rounded-2xl flex flex-col justify-between shadow-[4px_4px_0px_0px_#1C1C1C] transition-shadow duration-300"
            whileHover={{
              y: -8,
              x: -2,
              boxShadow: "8px 8px 0px 0px #1C1C1C",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div>
              {/* Project Header */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <h3 className="font-body text-xl font-bold uppercase tracking-wider text-dark-charcoal">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-charcoal/70 hover:text-dark-charcoal transition-colors"
                    aria-label={`${project.title} GitHub repository`}
                  >
                    <GithubIcon size={20} />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark-charcoal/70 hover:text-dark-charcoal transition-colors"
                    aria-label={`${project.title} live demo`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-dark-charcoal/80 mb-6 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-dark-charcoal/10">
              {project.tags.map((tag, tagIdx) => (
                <span
                  key={tagIdx}
                  className="font-body text-[10px] md:text-xs font-bold uppercase tracking-widest bg-dark-charcoal/5 border border-dark-charcoal/20 text-dark-charcoal/70 px-2.5 py-1 rounded-md select-none"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
