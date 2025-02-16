import type { Metadata } from "next";
import AboutBlock from "@/components/about-block";

export const metadata: Metadata = {
  title: "Speedchars - About",
  description: "Speedchars is a sophisticated platform designed for real-time text analysis, delivering comprehensive statistics on characters, words, and sentences. Additionally, our innovative AI feature facilitates text enhancement, allowing users to utilize this service up to 15 times per day.",
};

export default function AboutPage() {
  return <AboutBlock />;
}
