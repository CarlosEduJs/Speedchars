"use client";

import { useTranslation } from "../translation-provider";

export default function CookiesPolicy() {
  const { t } = useTranslation();

  return (
    <section id="cookies-policy" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        4. {t("terms.navCookiesPolicy.title")}
      </h2>
      <ul className="flex flex-col gap-2 px-4">
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navCookiesPolicy.list.1")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navCookiesPolicy.list.2")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navCookiesPolicy.list.3")}
        </li>
      </ul>
    </section>
  );
}
