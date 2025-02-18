import { Metadata } from "next";
import LandingBlock from "../components/landing-block";

export const metadata: Metadata = {
  title: "Speedchars",
  description: "This analytics tool for speedwriting",
  icons: {
    icon: "./favicon.ico",
  },
  keywords: [
    "speedwriting",
    "speedreading",
    "text analysis",
    "writing tools",
    "text improvement",
    "character count",
    "word count",
    "sentence count",
    "AI text enhancement",
    "Speedchars",
    "text improvement",
  ],
};

export default function LandingPage() {
  return (
    <div>
      <LandingBlock />
    </div>
  );
}
