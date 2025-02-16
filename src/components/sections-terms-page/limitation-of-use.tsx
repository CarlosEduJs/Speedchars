"use client";

import { useTranslation } from "../translation-provider";

export default function LimitationOfUse() {
  const { t } = useTranslation();

  return (
    <section id="limitation-of-use" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        3. {t("terms.navLimitationOfUse.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("terms.navLimitationOfUse.description")}
      </p>
      <ul className="flex flex-col gap-2 px-4">
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navLimitationOfUse.list.1")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navLimitationOfUse.list.2")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("terms.navLimitationOfUse.list.3")}
        </li>
      </ul>
    </section>
  );
}
