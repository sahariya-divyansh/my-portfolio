import type { Metadata } from "next";
import { Caveat, Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Divyansh Sahariya | Portfolio",
  description: "Personal portfolio website of Divyansh Sahariya, showcasing projects, skills, and experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#87CEEB] text-[#1C1C1C] font-body selection:bg-[#DFDAC3] selection:text-[#1C1C1C]">
        {children}
      </body>
    </html>
  );
}
