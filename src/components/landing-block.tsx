"use client";

import HeaderLanding from "./header-landing";
import Features from "./sections-landing-page/features";
import Introduction from "./sections-landing-page/introduction";
import IdealFor from "./sections-landing-page/ideal-for";
import About from "./sections-landing-page/about";
import Footer from "@/components/footer";
export default function LandingBlock() {
  return (
    <div className="flex flex-col">
      <HeaderLanding />
      <Introduction />
      <Features />
      <IdealFor />
      <About />
      <Footer />
    </div>
  );
}
