import type { Metadata } from "next";
import PrivacyBlock from "@/components/privacy-block";

export const metadata: Metadata = {
  title: "Speedchars - Privacy Policy",
  description: "This Privacy Policy outlines Speedchars' commitment to safeguarding your data. We transparently explain how we collect, use, store, and protect the information shared by users when utilizing our services. By accessing and using Speedchars, you consent to the handling of your information as described in this policy",
};

export default function PrivacyPolicyPage() {
  return <PrivacyBlock />;
}
 