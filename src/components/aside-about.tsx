"use client";

import { useTranslation } from "./translation-provider";
import AsideForPagesLayout from "./aside-for-pages";

type NavItem = {
  name: string;
  href: string;
};

export default function AsideAbout() {
  const { t } = useTranslation();

  const dataNav: NavItem[] = [
    { name: t("about.what_is_speedchars.title"), href: "#what-is-speedchars" },
    { name: t("about.how_it_works.title"), href: "#how-it-works" },
    { name: t("about.why_use_speedchars.title"), href: "#why-use-speedchars" },
    { name: t("about.technologies_used.title"), href: "#technologies-used" },
    { name: t("about.contact.title"), href: "#contact" },
  ];

  return <AsideForPagesLayout page="about" dataNav={dataNav} />;
}
