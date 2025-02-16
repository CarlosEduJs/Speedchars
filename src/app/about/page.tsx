import type { Metadata } from "next";
import AboutBlock from "@/components/about-block";

export const metadata: Metadata = {
  title: "Speedchars - About",
  description: "Speedchars is a sophisticated platform designed for real-time text analysis, delivering comprehensive statistics on characters, words, and sentences. Additionally, our innovative AI feature facilitates text enhancement, allowing users to utilize this service up to 15 times per day.",
  keywords: [
    "text analysis",
    "real-time text statistics",
    "character count",
    "word count",
    "sentence count",
    "AI text enhancement",
    "Speedchars",
    "text improvement",
    "writing tools",
  ],
};

export default function AboutPage() {
  return <AboutBlock />;
}
