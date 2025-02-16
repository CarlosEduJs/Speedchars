'use client'

import { useTranslation } from "../translation-provider";

export default function ChangePrivacy() {
  const { t } = useTranslation();

  return (
    <section id="change-privacy" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("privacy.navChangePrivacy.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("privacy.navChangePrivacy.description")}
      </p>
    </section>
  );
}
