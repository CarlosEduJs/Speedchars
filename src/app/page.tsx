import { Metadata } from "next";
import LandingBlock from "../components/landing-block";

export const metadata: Metadata = {
  title: "Speedchars",
  description: "This analytics tool for speedwriting",
};

export default function LandingPage() {
  return (
    <div>
      <LandingBlock />
    </div>
  );
}
