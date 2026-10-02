"use client";

import { useState, useEffect } from "react";
import { User, Code2, FolderGit2, Award, Briefcase, Newspaper, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuBar } from "@/components/ui/glow-menu";

const menuItems = [
  { icon: User, label: "About", href: "#about", gradient: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)", iconColor: "text-black" },
  { icon: Code2, label: "Skills", href: "#skills", gradient: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)", iconColor: "text-black" },
  { icon: FolderGit2, label: "Projects", href: "#projects", gradient: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)", iconColor: "text-black" },
  { icon: Award, label: "Achievements", href: "#achievements", gradient: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)", iconColor: "text-black" },
  { icon: Briefcase, label: "Experience", href: "#experience", gradient: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)", iconColor: "text-black" },
  { icon: Newspaper, label: "Blogs", href: "#blogs", gradient: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)", iconColor: "text-black" },
  { icon: Mail, label: "Contact", href: "#contact", gradient: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%)", iconColor: "text-black" },
];

export default function Navbar() {
  const [active, setActive] = useState("About");
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const REVEAL_ZONE = 80; // px from top of viewport that triggers reveal

    const onMouseMove = (e: MouseEvent) => {
      setVisible(e.clientY <= REVEAL_ZONE);
    };

    const onScroll = () => {
      if (window.scrollY < 10) setVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = (label: string) => {
    const item = menuItems.find((i) => i.label === label);
    if (!item) return;
    setActive(label);
    setIsOpen(false);
    const el = document.getElementById(item.href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* invisible hover-trigger strip pinned to the very top, always present */}
      <div className="fixed top-0 left-0 z-40 h-20 w-full md:block hidden" aria-hidden="true" />

      <motion.header
        initial={false}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="hidden md:block">
          <MenuBar items={menuItems} activeItem={active} onItemClick={scrollTo} />
        </div>
      </motion.header>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 top-6 z-50 text-black focus:outline-none md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-white md:hidden"
          >
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.label)}
                  className="flex items-center gap-3 text-xl font-bold uppercase tracking-widest text-black"
                >
                  <Icon size={22} />
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
