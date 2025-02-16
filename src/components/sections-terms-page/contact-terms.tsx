"use client";

import { useTranslation } from "../translation-provider";

export default function ContactTerms() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">7. {t("terms.navContact.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("terms.navContact.description")}
      </p>
    </section>
  );
}
