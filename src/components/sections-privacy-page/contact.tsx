"use client";

import { useTranslation } from "../translation-provider";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("privacy.navContact.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("privacy.navContact.description")}
      </p>
    </section>
  );
}
