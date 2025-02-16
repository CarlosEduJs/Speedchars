'use client'

import { useTranslation } from "../translation-provider";

export default function SecurityData() {
  const { t } = useTranslation();

  return (
    <section id="security-data" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("privacy.navDataSecurity.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("privacy.navDataSecurity.description")}
      </p>
    </section>
  );
}
