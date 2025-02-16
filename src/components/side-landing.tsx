import { AlignLeft } from "@geist-ui/icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Branding from "./branding";
import Link from "next/link";
import { useTranslation } from "./translation-provider";
import { useEffect, useState } from "react";
import BtnToHomePage from "./btn-to-home-page";

type NavItem = {
  name: string;
  href: string;
};

export default function SideLanding() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("");

  const dataNav: NavItem[] = [
    { name: t("landing.hero_title"), href: "#introduction" },
    { name: t("landing.features.features_name"), href: "#features" },
    { name: t("landing.ideal_for.ideal_for_name"), href: "#ideal-for" },
    { name: t("landing.about_section.about_section_name"), href: "#about" },
  ];

  useEffect(() => {
    const handleScroll = (event: Event) => {
      event.preventDefault();
      const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute(
        "data-href"
      );
      const targetElement = targetId ? document.querySelector(targetId) : null;

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const links = document.querySelectorAll(".side-nav-link");
    links.forEach((link) => link.addEventListener("click", handleScroll));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleScroll));
    };
  }, []);

  useEffect(() => {
    const sectionElements = dataNav.map(link => document.querySelector(link.href));

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(`#${visibleEntries[0].target.id}`);
      }
    }, { root: null, threshold: [0.25, 0.5, 0.75] });

    sectionElements.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionElements.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, [dataNav]);

  return (
    <Sheet>
      <SheetTrigger>
        <AlignLeft className="w-4 h-4 block lg:hidden hover:text-primary" />
        <span className="sr-only">Sidebar</span>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <Branding isSrOnly={false} />
          <SheetTitle className="sr-only">Sidebar title</SheetTitle>
          <SheetDescription className="sr-only">
            Sidebar description
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 my-6">
          {dataNav.map((link) => (
            <Link
              key={link.href}
              href="/"
              data-href={link.href}
              className={`text-sm font-medium hover:text-primary side-nav-link ${
                activeSection === link.href ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const targetElement = document.querySelector(link.href);
                if (targetElement) {
                  targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <SheetFooter className="border-t mb-auto py-3">
          <Branding isSrOnly={true} />
          <BtnToHomePage />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
