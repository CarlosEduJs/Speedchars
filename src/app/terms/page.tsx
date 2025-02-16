import type { Metadata } from "next";
import TermsBlock from "@/components/terms-block";

export const metadata: Metadata = {
  title: "Speedchars - Terms of Service",
  description: "By accessing and using Speedchars, you agree to abide by all terms and conditions outlined in this document. Please read it carefully, as your acceptance indicates your full agreement with the service's rules, responsibilities, and limitations. If you do not agree with any part of these terms, please discontinue your use of the service",
  keywords: [
    "Speedchars",
    "Terms of Service",
    "User Agreement",
    "Service Rules",
    "Acceptance of Terms",
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

export default function TermsPage() {
  return <TermsBlock />;
}
