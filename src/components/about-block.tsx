"use client";

import WhatIsSection from "./sections-about-page/what-is-section";
import HowItWorksSection from "./sections-about-page/how-it-works";
import WhyUseSpeedcharsSection from "./sections-about-page/why-use-speedchars";
import TechnologiesUsedSection from "./sections-about-page/technologies-used";
import { useTranslation } from "./translation-provider";
import ContactSection from "./sections-about-page/contact";
import BlockForAsidesForPagesLayout from "./block-for-asides-for-pages";

export default function AboutBlock() {
  const { t } = useTranslation();
  return (
    <BlockForAsidesForPagesLayout page={t("about.title")}>
      <WhatIsSection />
      <HowItWorksSection />
      <WhyUseSpeedcharsSection />
      <TechnologiesUsedSection />
      <ContactSection />
    </BlockForAsidesForPagesLayout>
  );
}
