"use client";

import { useTranslation } from "../translation-provider";

export default function ChangeTermsOfUse() {
  const { t } = useTranslation();

  return (
    <section id="change-terms-of-use" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        6. {t("terms.navChangeTermsOfUse.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("terms.navChangeTermsOfUse.description")}
      </p>
    </section>
  );
}
