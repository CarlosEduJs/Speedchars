import HeaderApp from "@/components/header-app";
import BlockHomeView from "@/components/block-home-view";
import { AnalyzeTextProvider } from "@/components/analyze-text-provider";
import type { Metadata } from "next";
import AcceptCookies from "@/components/accept-cookies";

export const metadata: Metadata = {
  title: "Speedchars - Text Analyzer and improve with AI",
  description:
    "Utilize our AI-powered Text Analyzer to enhance and refine your writing effectively.",
  keywords: [
    "Speedchars",
    "Text Analyzer",
    "AI Writing Assistant",
    "Text Improvement",
    "text improvement",
    "writing tools",
    "text analysis",
    "real-time text statistics",
    "character count",
    "word count",
    "sentence count",
    "AI text enhancement",
  ],
};

export default function PageHome() {
  return (
    <div>
      <HeaderApp />
      <AcceptCookies />
      <AnalyzeTextProvider>
        <BlockHomeView />
      </AnalyzeTextProvider>
    </div>
  );
}
