"use client";

import { useTranslation } from "../translation-provider";

export default function Cookies() {
  const { t } = useTranslation();

  return (
    <section id="cookies" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("privacy.navCookies.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("privacy.navCookies.description")}
      </p>
      <ul className="flex flex-col gap-2 px-4">
        <li className="text-sm text-muted-foreground list-disc">
          {t("privacy.navCookies.list.1")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("privacy.navCookies.list.2")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("privacy.navCookies.list.3")}
        </li>
      </ul>
      <p className="text-sm text-muted-foreground">
        <span className="text-red-500 font-bold">*- </span>
        {t("privacy.navCookies.note")}
      </p>
    </section>
  );
}
