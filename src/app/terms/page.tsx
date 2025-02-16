import type { Metadata } from "next";
import TermsBlock from "@/components/terms-block";

export const metadata: Metadata = {
  title: "Speedchars - Terms of Service",
  description: "Terms of Service for Speedchars",
};

export default function TermsPage() {
  return <TermsBlock />;
}
