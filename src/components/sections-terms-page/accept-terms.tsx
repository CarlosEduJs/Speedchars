"use client";

import { useTranslation } from "../translation-provider";

export default function AcceptTerms() {
  const { t } = useTranslation();

  return (
    <section id="accept-terms" className="flex flex-col gap-4 ">
      <h2 className="text-2xl font-bold">1. {t("terms.navAcceptTerms.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("terms.navAcceptTerms.description")}
      </p>
    </section>
  );
}
