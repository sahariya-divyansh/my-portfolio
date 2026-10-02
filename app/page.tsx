import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";
import { ContactIntro } from "@/components/ui/svg-follow-scroll";
import { ScrollPinOut, ScrollRevealIn } from "@/components/ui/section-scroll-transition";

const GithubActivity = dynamic(() => import("@/components/GithubActivity"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <ScrollPinOut>
          <GithubActivity />
        </ScrollPinOut>
        <ScrollRevealIn>
          <Projects />
        </ScrollRevealIn>
        <Achievements />
        <Experience />
        <Blogs />
        <ContactIntro />
        <Contact />
      </main>
      <footer className="w-full py-8 text-center text-xs font-body text-[#404040]/60 bg-[#ffffff] border-t border-[#404040]/15 font-bold uppercase tracking-widest select-none">
        &copy; {new Date().getFullYear()} Divyansh Sahariya. All Rights Reserved.
      </footer>
    </>
  );
}
