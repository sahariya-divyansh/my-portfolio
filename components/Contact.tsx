"use client";

import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/BrandIcons";
import { motion } from "framer-motion";

import PixelGhost from "@/components/ui/pixel-ghost";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");
    // Simulate API request
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  const socials = [
    { icon: Mail, href: "mailto:divyansh777sahariya@gmail.com", label: "Email" },
    { icon: GithubIcon, href: "https://github.com/sahariya-divyansh", label: "GitHub" },
    { icon: LinkedinIcon, href: "https://linkedin.com/in/divyanshsahariya", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://instagram.com/divyanxshhh", label: "Instagram" },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 min-h-[600px] scroll-mt-16 justify-between bg-[#ffffff]"
    >
      {/* Contact info column */}
      <div className="w-full md:w-5/12 flex flex-col justify-between py-2">
        <div>
          <h2 className="font-display text-5xl md:text-7xl text-[#000000] mb-8 tracking-wide">
            GET IN TOUCH
          </h2>
          <p className="font-body text-base md:text-lg text-[#404040]/90 mb-8 leading-relaxed max-w-md">
            Have a project in mind, a job opportunity, or just want to say hello? Drop a message in the form, or reach out directly via my socials. I&apos;d love to connect!
          </p>
        </div>

        {/* Social Icons list */}
        <div className="flex flex-col items-start mt-8 md:mt-10">
          <PixelGhost />
          <div className="flex gap-4 flex-wrap">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-4 bg-[#ffffff] border-2 border-[#404040] rounded-xl shadow-[3px_3px_0px_0px_#404040] text-[#404040] hover:bg-[#404040] hover:text-[#ffffff] transition-all duration-300"
                  whileHover={{
                    y: -4,
                    x: -1,
                    boxShadow: "5px 5px 0px 0px #404040",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form column */}
      <div className="w-full md:w-6/12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-[#ffffff] border-2 border-dashed border-[#404040] rounded-2xl shadow-[4px_4px_0px_0px_#404040]">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-body text-xs font-bold uppercase tracking-widest text-[#404040]">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="font-body text-sm text-[#404040] bg-[#ffffff] border-2 border-[#404040] rounded-xl px-4 py-3 outline-none transition-all focus:border-[#404040] focus:shadow-[3px_3px_0px_0px_#404040] placeholder:text-[#404040]/50"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-body text-xs font-bold uppercase tracking-widest text-[#404040]">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="font-body text-sm text-[#404040] bg-[#ffffff] border-2 border-[#404040] rounded-xl px-4 py-3 outline-none transition-all focus:border-[#404040] focus:shadow-[3px_3px_0px_0px_#404040] placeholder:text-[#404040]/50"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-body text-xs font-bold uppercase tracking-widest text-[#404040]">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your project or enquiry here..."
              className="font-body text-sm text-[#404040] bg-[#ffffff] border-2 border-[#404040] rounded-xl px-4 py-3 outline-none resize-none transition-all focus:border-[#404040] focus:shadow-[3px_3px_0px_0px_#404040] placeholder:text-[#404040]/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status !== "idle"}
            className="flex items-center justify-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-[#000000] bg-[#C2F84F] border-2 border-[#000000] rounded-xl py-4 hover:bg-[#b0e843] transition-all duration-300 disabled:opacity-50 select-none cursor-pointer mt-2"
          >
            {status === "sending" ? (
              "Sending..."
            ) : status === "success" ? (
              "Message Sent!"
            ) : (
              <>
                Send Message <Send size={14} />
              </>
            )}
          </button>

          {status === "success" && (
            <p className="font-body text-xs font-bold text-[#000000] text-center uppercase tracking-wider animate-pulse">
              Thank you! I will get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
