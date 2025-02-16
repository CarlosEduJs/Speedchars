import type { Metadata } from "next";
import PrivacyBlock from "@/components/privacy-block";

export const metadata: Metadata = {
  title: "Speedchars - Privacy Policy",
  description: "This Privacy Policy outlines Speedchars' commitment to safeguarding your data. We transparently explain how we collect, use, store, and protect the information shared by users when utilizing our services. By accessing and using Speedchars, you consent to the handling of your information as described in this policy",
  keywords: [
    "Speedchars",
    "Privacy Policy",
    "Data Protection",
    "User Information",
    "Data Collection",
    "Data Usage",
    "Data Storage",
    "Data Protection",
    "User Consent",
    "User Information",
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

export default function PrivacyPolicyPage() {
  return <PrivacyBlock />;
}
 