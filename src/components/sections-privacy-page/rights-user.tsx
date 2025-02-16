'use client'

import { useTranslation } from "../translation-provider";

export default function RightsUser() {
  const { t } = useTranslation();

  return (
    <section id="rights-user" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("privacy.navRights.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("privacy.navRights.description")}
      </p>
    </section>
  );
}
