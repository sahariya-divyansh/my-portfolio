"use client";

import WavingPortfolioLanding from "@/components/ui/waving-portfolio-landing";

export default function Hero() {
  return (
    <section id="hero" className="relative w-full scroll-mt-16 pt-24 md:pt-32">
      <WavingPortfolioLanding
        name="Divyansh Sahariya"
        year="2026"
        roles={["Software Engineer", "AI Engineer"]}
        lettersLeft={["P", "F"]}
        giantLetter="O"
        lettersRight={["RT", "LIO"]}
        title="Portfolio"
        signature="Divyansh"
        greeting="Hi there!"
        accent="#000000"
        paper="#ffffff"
        ink="#404040"
        height="100svh"
      />
    </section>
  );
}