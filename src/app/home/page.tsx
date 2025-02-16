import HeaderApp from "@/components/header-app";
import BlockHomeView from "@/components/block-home-view";
import { AnalyzeTextProvider } from "@/components/analyze-text-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Analyzer",
  description: "Text Analyzer and improve your text",
};

export default function PageHome() {
  return (
    <div>
      <HeaderApp />
      <AnalyzeTextProvider>
        <BlockHomeView />
      </AnalyzeTextProvider>
    </div>
  );
}
