"use client";

import { useTranslation } from "../translation-provider";

export default function WhatIsSection() {
  const { t } = useTranslation();

  return (
    <section id="what-is-speedchars" className="flex flex-col gap-4 ">
      <h2 className="text-2xl font-bold">
        {t("about.what_is_speedchars.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("about.what_is_speedchars.description")}
      </p>
    </section>
  );
}
