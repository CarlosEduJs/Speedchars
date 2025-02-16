import { useTranslation } from "../translation-provider";
import LandingLayoutSection from "../landing-layout";
import { FeaturesCards } from "../features-cards";
export default function Features() {
  const { t } = useTranslation();

  return (
    <LandingLayoutSection
      id="features"
      title={t("landing.features.feature_section_title")}
      description={t("landing.features.featire_section_description")}
    >
      <FeaturesCards />
    </LandingLayoutSection>
  );
}
