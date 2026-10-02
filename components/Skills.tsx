"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RAW_SKILLS_DATA = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C/C++", "JavaScript", "TypeScript", "SQL", "PHP", "Go", "Rust"],
  },
  {
    category: "Web & Backend",
    skills: ["React.js", "Node.js", "FastAPI", "HTML5", "CSS3", "Next.js", "Tailwind CSS", "Flutter"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MongoDB", "SQL", "NoSQL"],
  },
  {
    category: "DevOps & Tools",
    skills: ["Docker", "Kubernetes", "Git/GitHub", "CI/CD", "Postman", "Vim", "LaTeX", "Ubuntu"],
  },
  {
    category: "CS Core",
    skills: ["DSA", "OS", "DBMS", "Computer Networks", "System Design", "OOP", "Software Testing & QA"],
  },
  {
    category: "Machine Learning",
    skills: ["Supervised/Unsupervised Learning", "Deep Learning", "CNN", "RNN", "Transformers", "NLP", "Computer Vision", "RL", "LLMs", "RAG", "Prompt Engineering", "Agentic AI"],
  },
  {
    category: "ML Libraries",
    skills: ["NumPy", "Pandas", "Scikit-learn", "PyTorch", "TensorFlow/Keras", "Hugging Face", "LangChain", "Matplotlib", "Seaborn", "FAISS", "ChromaDB/Pinecone"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsData = useMemo(() => RAW_SKILLS_DATA, []);

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
          stagger: 0.03,
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
      className="w-full scroll-mt-16 bg-[#ffffff] px-6 py-24 md:px-12"
    >
      <div className="mx-auto flex min-h-[600px] w-full max-w-7xl flex-col justify-center">
        <h2 className="mb-16 text-left font-display text-5xl tracking-wide text-[#000000] md:text-7xl">
          SKILLS & STACK
        </h2>

        <div className="skills-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="skill-category-card flex flex-col gap-6 rounded-2xl border-2 border-dashed border-[#404040]/70 bg-transparent p-8"
            >
              <h3 className="category-title select-none border-b-2 border-[#404040]/30 pb-3 font-body text-xl font-bold uppercase tracking-wider text-[#404040]">
                {cat.category}
              </h3>

              <div className="flex flex-wrap gap-3">
                {cat.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="skill-tag cursor-default select-none rounded-xl border-2 border-[#404040] bg-[#ffffff] px-4 py-2 font-body text-xs font-semibold text-[#404040] shadow-[3px_3px_0px_0px_#404040] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_#404040] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[3px_3px_0px_0px_#404040] md:text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}