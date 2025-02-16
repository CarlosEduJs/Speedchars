"use client";

import { useTranslation } from "./translation-provider";
import AsideForPagesLayout from "./aside-for-pages";

type NavItem = {
  name: string;
  href: string;
};

export default function AsideTerms() {
  const { t } = useTranslation();

  const dataNav: NavItem[] = [
    { name: t("terms.navAcceptTerms.title"), href: "#accept-terms" },
    { name: t("terms.navUseOfService.title"), href: "#use-of-service" },
    { name: t("terms.navLimitationOfUse.title"), href: "#limitation-of-use" },
    { name: t("terms.navCookiesPolicy.title"), href: "#cookies-policy" },
    {
      name: t("terms.navRestrictUseOfService.title"),
      href: "#restrict-use-of-service",
    },
    {
      name: t("terms.navChangeTermsOfUse.title"),
      href: "#change-terms-of-use",
    },
    { name: t("terms.navContact.title"), href: "#contact" },
  ];

  return <AsideForPagesLayout page="terms" dataNav={dataNav} />;
}
