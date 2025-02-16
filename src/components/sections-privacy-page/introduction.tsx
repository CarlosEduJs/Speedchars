"use client";

import { useTranslation } from "../translation-provider";

export default function Introduction() {
  const { t } = useTranslation();

  return (
    <section id="introduction" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("privacy.navIntroduction.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("privacy.navIntroduction.description")}
      </p>
    </section>
  );
}
