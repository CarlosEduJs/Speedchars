import LandingLayoutSection from "../landing-layout";
import { useTranslation } from "../translation-provider";
import { IdealForCards } from "../ideal-for-cards";

export default function IdealFor() {
  const { t } = useTranslation();

  return (
    <LandingLayoutSection
      id="ideal-for"
      title={t("landing.ideal_for.title")}
      description={t("landing.ideal_for.description")}
    >
      <IdealForCards />
    </LandingLayoutSection>
  );
}
