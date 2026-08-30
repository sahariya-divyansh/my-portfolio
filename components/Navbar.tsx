"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { id: "about", name: "About" },
  { id: "skills", name: "Skills" },
  { id: "projects", name: "Projects" },
  { id: "achievements", name: "Achievements" },
  { id: "experience", name: "Experience" },
  { id: "blogs", name: "Blogs" },
  { id: "contact", name: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#87CEEB]/80 backdrop-blur-md px-6 py-4 md:px-12 flex justify-between items-center transition-all duration-300">
      {/* Logo/Name */}
      <a href="#hero" className="font-script text-3xl md:text-4xl text-dark-charcoal select-none">
        Divyansh Sahariya
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="font-body text-xs font-bold uppercase text-dark-charcoal tracking-widest hover:text-[#555555] transition-colors py-1 border-y border-dotted border-dark-charcoal/40 underline decoration-1 decoration-dark-charcoal decoration-solid underline-offset-4"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-dark-charcoal focus:outline-none z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#87CEEB] flex flex-col justify-center items-center gap-8 z-40 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsOpen(false)}
                className="font-body text-xl font-bold uppercase text-dark-charcoal tracking-widest py-2 border-y border-dotted border-dark-charcoal/40 underline decoration-1 decoration-dark-charcoal decoration-solid underline-offset-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
