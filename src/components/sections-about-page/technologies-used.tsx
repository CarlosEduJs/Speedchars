import { useTranslation } from "../translation-provider";

export default function TechnologiesUsedSection() {
  const { t } = useTranslation();

  return (
    <section id="technologies-used" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        {t("about.technologies_used.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("about.technologies_used.description")}
      </p>
      <ul className="list-disc list-inside font-bold flex flex-col gap-2">
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.technologies_used.technologies.1")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.technologies_used.technologies.2")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.technologies_used.technologies.3")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.technologies_used.technologies.4")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.technologies_used.technologies.5")}
        </li>
      </ul>
    </section>
  );
}
