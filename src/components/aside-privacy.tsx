"use client";
import { useTranslation } from "./translation-provider";
import AsideForPages from "./aside-for-pages";

type NavItem = {
  name: string;
  href: string;
}; 

export default function AsidePrivacy() {
  const { t } = useTranslation();

  const dataNav: NavItem[] = [
    { name: t("privacy.navIntroduction.title"), href: "#introduction" },
    { name: t("privacy.navDataCollection.title"), href: "#data-collection" },
    { name: t("privacy.navCookies.title"), href: "#cookies" },
    { name: t("privacy.navDataSecurity.title"), href: "#data-security" },
    { name: t("privacy.navRights.title"), href: "#rights" },
    { name: t("privacy.navChangePrivacy.title"), href: "#change-privacy" },
    { name: t("privacy.navContact.title"), href: "#contact" },
  ];

  return (
    <AsideForPages dataNav={dataNav} page="privacy" />
  );
}
