import type { Metadata } from "next";
import PrivacyBlock from "@/components/privacy-block";

export const metadata: Metadata = {
  title: "Speedchars - Privacy Policy",
  description: "Privacy Policy for Speedchars",
};

export default function PrivacyPolicyPage() {
  return <PrivacyBlock />;
}
 