"use client";

import { useTranslation } from "../translation-provider";

export default function RestrictUseOfService() {
  const { t } = useTranslation();

  return (
    <section id="restrict-use-of-service" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        5. {t("terms.navRestrictUseOfService.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("terms.navRestrictUseOfService.description")}
      </p>
      <ul className="flex flex-col gap-2 px-4">
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navRestrictUseOfService.list.1")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navRestrictUseOfService.list.2")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navRestrictUseOfService.list.3")}
        </li>
      </ul>
    </section>
  );
}
