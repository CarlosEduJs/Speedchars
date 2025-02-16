import { SparklesIcon } from "lucide-react";

import { useTranslation } from "./translation-provider";
import BtnCta from "./btn-cta";

export default function BtnToHomePage() {
  const { t } = useTranslation();

  return (
    <BtnCta
      href="/home"
      text={t("landing.hero_button")}
      icon={<SparklesIcon className="w-4 h-4" />}
    />
  );
}
