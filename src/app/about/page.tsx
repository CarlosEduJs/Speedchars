import type { Metadata } from "next";
import AboutBlock from "@/components/about-block";

export const metadata: Metadata = {
  title: "Speedchars - About",
  description: "About Speedchars",
};

export default function AboutPage() {
  return <AboutBlock />;
}
