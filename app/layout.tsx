import type { Metadata } from "next";
import { Caveat, Bebas_Neue, Space_Grotesk } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://divyansh-sahariya.vercel.app"),
  title: {
    default: "Divyansh Sahariya | Software Engineer & AI Engineer",
    template: "%s | Divyansh Sahariya",
  },
  description:
    "Divyansh Sahariya is a Computer Science student and software/AI engineer building systems with strong fundamentals in DSA, Machine Learning, and Quantum Computing. Explore projects, skills, and experience.",
  keywords: [
    "Divyansh Sahariya",
    "Divyansh Sahariya portfolio",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Science student",
    "Full Stack Developer",
  ],
  authors: [{ name: "Divyansh Sahariya" }],
  creator: "Divyansh Sahariya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://divyansh-sahariya.vercel.app",
    title: "Divyansh Sahariya | Software Engineer & AI Engineer",
    description:
      "Computer Science student and software/AI engineer building systems with strong fundamentals in DSA, Machine Learning, and Quantum Computing.",
    siteName: "Divyansh Sahariya Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Divyansh Sahariya Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divyansh Sahariya | Software Engineer & AI Engineer",
    description:
      "Computer Science student and software/AI engineer building systems with strong fundamentals in DSA, Machine Learning, and Quantum Computing.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Divyansh Sahariya",
              url: "https://divyansh-sahariya.vercel.app",
              jobTitle: "Software Engineer",
              sameAs: [
                "https://github.com/sahariya-divyansh",
                "https://linkedin.com/in/divyanshsahariya",
                "https://instagram.com/divyanxshhh",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#ffffff] text-[#404040] font-body selection:bg-[#000000] selection:text-[#ffffff]">
        {children}
      </body>
    </html>
  );
}
