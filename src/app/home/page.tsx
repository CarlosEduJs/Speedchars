import HeaderApp from "@/components/header-app";
import BlockHomeView from "@/components/block-home-view";
import { AnalyzeTextProvider } from "@/components/analyze-text-provider";
import type { Metadata } from "next";
import AcceptCookies from "@/components/accept-cookies";
export const metadata: Metadata = {
  title: "Speedchars - Text Analyzer and improve with AI",
  description: "Utilize our AI-powered Text Analyzer to enhance and refine your writing effectively.",
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
