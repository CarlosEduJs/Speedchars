"use client";

import { useTranslation } from "../translation-provider";

export default function DataCollection() {
  const { t } = useTranslation();

  return (
    <section id="data-collection" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        {t("privacy.navDataCollection.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("privacy.navDataCollection.description")}
      </p>
    </section>
  );
}
