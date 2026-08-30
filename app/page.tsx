import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Blogs from "@/components/Blogs";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Achievements />
        <Experience />
        <Blogs />
        <Contact />
      </main>
      <footer className="w-full py-8 text-center text-xs font-body text-dark-charcoal/60 bg-[#87CEEB] border-t border-dark-charcoal/10 font-bold uppercase tracking-widest select-none">
        &copy; {new Date().getFullYear()} Divyansh Sahariya. All Rights Reserved.
      </footer>
    </>
  );
}
