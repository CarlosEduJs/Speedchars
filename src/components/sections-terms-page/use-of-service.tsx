"use client";

import { useTranslation } from "../translation-provider";

export default function UseOfService() {
  const { t } = useTranslation();

  return (
    <section id="use-of-service" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">2. {t("terms.navUseOfService.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("terms.navUseOfService.description")}
      </p>
    </section>
  );
}
