import Branding from "../branding";
import BtnCta from "../btn-cta";
import LandingLayoutSection from "../landing-layout";
import { useTranslation } from "../translation-provider";
import { Github } from '@geist-ui/icons'

export default function About() {
  const { t } = useTranslation();

  return (
    <LandingLayoutSection id="about" title={t("landing.about_section.title")}>
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground text-sm max-w-md">
          {t("landing.about_section.description")}
        </p>
        <Branding isSrOnly={false} />
        <p className="text-muted-foreground text-xs">By: CarlosEduJS</p>
        <BtnCta
          href="https://github.com/CarlosEduJs"
          text="View my Github"
          icon={<Github className="w-4 h-4" />}
        />
      </div>
    </LandingLayoutSection>
  );
}
