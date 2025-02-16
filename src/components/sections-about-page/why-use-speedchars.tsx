import { useTranslation } from "../translation-provider";

export default function WhyUseSpeedcharsSection() {
  const { t } = useTranslation();

  return (
    <section id="why-use-speedchars" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">
        {t("about.why_use_speedchars.title")}
      </h2>
      <p className="text-sm text-muted-foreground">
        {t("about.why_use_speedchars.description")}
      </p>
      <ul className="list-disc list-inside flex flex-col gap-2">
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.why_use_speedchars.benefits.1")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.why_use_speedchars.benefits.2")}
        </li>
        <li className="text-sm text-muted-foreground list-disc">
          {t("about.why_use_speedchars.benefits.3")}
        </li>
      </ul>
    </section>
  );
}
