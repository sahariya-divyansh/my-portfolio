"use client";

import { NotchedProjectCard } from "@/components/ui/notched-project-card";

const PROJECTS_DATA = [
  {
    title: "cache-sim",
    description:
      "C cache simulator comparing LRU, FIFO, and Random replacement policies across configurable cache sizes and associativity, with benchmark visualization in Python.",
    tags: ["C", "Python", "PowerShell", "Shell"],
    github: "https://github.com/sahariya-divyansh/cache-sim",
    demo: "https://github.com/sahariya-divyansh/cache-sim",
  },
  {
    title: "GeoMangan-AI",
    description:
      "AI/ML + Satellite-based platform for manganese reserve mapping and production shortfall prediction.",
    tags: ["Python", "CSS", "TypeScript", "JavaScript"],
    github: "https://github.com/sahariya-divyansh/GeoMangan-AI",
    demo: "https://github.com/sahariya-divyansh/GeoMangan-AI",
  },
  {
    title: "Causway",
    description:
      "Causeway is a sync engine purpose-built and benchmarked for sustained low bandwidth conditions, unlike existing tools which target brief disconnection.",
    tags: ["JavaScript", "Shell", "TypeScript", "JSON"],
    github: "https://github.com/sahariya-divyansh/causeway",
    demo: "https://github.com/sahariya-divyansh/causeway",
  },
  {
    title: "Exoplanet Detector",
    description:
      "An end-to-end deep learning pipeline that detects exoplanets from noisy Kepler space telescope light curve data.",
    tags: ["Python", "WebSockets", "Web Crypto API", "PostgreSQL"],
    github: "https://github.com/sahariya-divyansh/exoplanet-detector",
    demo: "https://github.com/sahariya-divyansh/exoplanet-detector",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full scroll-mt-16 bg-black px-6 py-24 md:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-16 text-left font-display text-5xl tracking-wide text-white md:text-7xl">
          SELECTED PROJECTS
        </h2>

        <div className="grid w-full gap-x-8 gap-y-16 sm:grid-cols-2">
          {PROJECTS_DATA.map((project, i) => (
            <NotchedProjectCard
              key={i}
              href={project.demo ?? project.github ?? "#"}
              title={project.title}
              description={project.description}
              image={`data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='800' height='600' fill='#111111'/><text x='50%' y='50%' font-family='sans-serif' font-size='40' fill='#C2F84F' text-anchor='middle' dy='.3em'>${project.title}</text></svg>`,
              )}`}
              imageAlt={project.title}
              tags={project.tags}
              monochrome={false}
              surface="#000000"
              accent="#C2F84F"
              accentForeground="#000000"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
