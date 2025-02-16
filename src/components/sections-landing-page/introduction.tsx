import { useTranslation } from "../translation-provider";
import BtnToHomePage from "../btn-to-home-page";
import LandingLayoutSection from "../landing-layout";
import { DotPattern } from "../magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { AnimatedBeamsBiDirecional } from "../animated-beams-bi-direcional";
import { AnimatedShinyTextDemo } from "../animated-shiny-text";
import { VelocityScroll } from "../magicui/scroll-based-velocity";
import Link from "next/link";

export default function Introduction() {
  const { t } = useTranslation();
  return (
    <div className="relative flex h-fit w-full  flex-col items-center justify-center overflow-hidden bg-background p-4 md:p-8">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        )}
      />
      <LandingLayoutSection
        id="introduction"
        title={t("landing.hero")}
        description={t("landing.hero_description")}
      >
        <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <BtnToHomePage />
            <Link href="https://github.com/CarlosEduJs/Speedchars" className="z-10">
              <AnimatedShinyTextDemo text={"💫 Github project - Open Source"} />
            </Link>
          </div>
          <AnimatedBeamsBiDirecional />
          <div className="relative flex max-lg:hidden w-full flex-col items-center justify-center overflow-hidden ">
            <VelocityScroll>{t("landing.hero_scroll_text")}</VelocityScroll>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 sm:w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 sm:w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </LandingLayoutSection>
    </div>
  );
}
