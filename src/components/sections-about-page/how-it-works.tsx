import { useTranslation } from "../translation-provider";

export default function HowItWorksSection() {
  const { t } = useTranslation();

  return (
    <section id="how-it-works" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{t("about.how_it_works.title")}</h2>
      <p className="text-sm text-muted-foreground">
        {t("about.how_it_works.description")}
      </p>
      <ul className="list-disc list-inside flex flex-col gap-2">
        <ul className="flex flex-col gap-2 px-4">
          <li className="text-sm text-muted-foreground list-disc">
            {t("about.how_it_works.steps.1")}
          </li>
          <li className="text-sm text-muted-foreground list-disc">
            {t("about.how_it_works.steps.2")}
          </li>
          <li className="text-sm text-muted-foreground list-disc">
            {t("about.how_it_works.steps.3")}
          </li>
          <li className="text-sm text-muted-foreground list-disc">
            {t("about.how_it_works.steps.4")}
          </li>
        </ul>
      </ul>
    </section>
  );
}
