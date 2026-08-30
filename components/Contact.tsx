"use client";

import React, { useState } from "react";
import { Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/BrandIcons";
import { motion } from "framer-motion";

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
    { icon: Mail, href: "mailto:divyansh.sahariya@example.com", label: "Email" },
    { icon: GithubIcon, href: "https://github.com/sahariya-divyansh", label: "GitHub" },
    { icon: LinkedinIcon, href: "https://linkedin.com/in/placeholder", label: "LinkedIn" },
    { icon: InstagramIcon, href: "https://instagram.com/placeholder", label: "Instagram" },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16 min-h-[600px] scroll-mt-16 justify-between"
    >
      {/* Contact info column */}
      <div className="w-full md:w-5/12 flex flex-col justify-between py-2">
        <div>
          <h2 className="font-display text-5xl md:text-7xl text-dark-charcoal mb-8 tracking-wide">
            GET IN TOUCH
          </h2>
          <p className="font-body text-base md:text-lg text-dark-charcoal/80 mb-8 leading-relaxed max-w-md">
            Have a project in mind, a job opportunity, or just want to say hello? Drop a message in the form, or reach out directly via my socials. I&apos;d love to connect!
          </p>
        </div>

        {/* Social Icons list */}
        <div className="flex gap-4 flex-wrap mt-6">
          {socials.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-4 bg-[#DFDAC3] border-2 border-dark-charcoal rounded-xl shadow-[3px_3px_0px_0px_#1C1C1C] text-dark-charcoal hover:bg-dark-charcoal hover:text-[#DFDAC3] transition-all duration-300"
                whileHover={{
                  y: -4,
                  x: -1,
                  boxShadow: "5px 5px 0px 0px #1C1C1C",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Form column */}
      <div className="w-full md:w-6/12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 bg-[#DFDAC3]/20 border-2 border-dashed border-dark-charcoal/30 rounded-2xl">
          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-body text-xs font-bold uppercase tracking-widest text-dark-charcoal">
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your Name"
              className="font-body text-sm text-dark-charcoal bg-transparent border-2 border-dark-charcoal/40 rounded-xl px-4 py-3 outline-none transition-all focus:border-dark-charcoal focus:shadow-[3px_3px_0px_0px_#1C1C1C] placeholder:text-dark-charcoal/40"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-body text-xs font-bold uppercase tracking-widest text-dark-charcoal">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
              className="font-body text-sm text-dark-charcoal bg-transparent border-2 border-dark-charcoal/40 rounded-xl px-4 py-3 outline-none transition-all focus:border-dark-charcoal focus:shadow-[3px_3px_0px_0px_#1C1C1C] placeholder:text-dark-charcoal/40"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-body text-xs font-bold uppercase tracking-widest text-dark-charcoal">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Describe your project or enquiry here..."
              className="font-body text-sm text-dark-charcoal bg-transparent border-2 border-dark-charcoal/40 rounded-xl px-4 py-3 outline-none resize-none transition-all focus:border-dark-charcoal focus:shadow-[3px_3px_0px_0px_#1C1C1C] placeholder:text-dark-charcoal/40"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status !== "idle"}
            className="flex items-center justify-center gap-2 font-body text-xs font-bold uppercase tracking-widest text-[#DFDAC3] bg-[#1C1C1C] border-2 border-dark-charcoal rounded-xl py-4 hover:bg-transparent hover:text-dark-charcoal transition-all duration-300 disabled:opacity-50 select-none cursor-pointer mt-2"
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
            <p className="font-body text-xs font-bold text-green-700 text-center uppercase tracking-wider animate-pulse">
              Thank you! I will get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
