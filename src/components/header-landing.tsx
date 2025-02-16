import Branding from "./branding";
import Link from "next/link";
import BtnToHomePage from "./btn-to-home-page";
import ModeToggle from "./mode-toggle";
import SelectLanguageDropdown from "./select-language-dropdown";
import SideLanding from "./side-landing";
import { useTranslation } from "./translation-provider";
import { useEffect, useState } from "react";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

type NavItem = {
  name: string;
  href: string;
};

export default function HeaderLanding() {
  const { t } = useTranslation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const dataNav: NavItem[] = [
    { name: t("landing.hero_title"), href: "#introduction" },
    { name: t("landing.features.features_name"), href: "#features" },
    { name: t("landing.ideal_for.ideal_for_name"), href: "#ideal-for" },
    { name: t("landing.about_section.about_section_name"), href: "#about" },
  ]; 

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

    const links = document.querySelectorAll(".header-nav-link");
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
    <header
      className={`
        z-50 flex justify-between items-center px-3 md:px-6 lg:px-12 transition-all duration-300
        ${isScrolled 
          ? "fixed top-0 left-0 w-full bg-background/90 backdrop-blur-sm shadow-md py-2 lg:h-20" 
          : "relative border-b h-fit py-2 lg:border-none lg:h-24"}
      `}
    >
      <ScrollProgress  />
      <div className="max-lg:hidden">
        <Branding isSrOnly={false} />
      </div>
      <div className="flex items-center gap-2 lg:hidden">
        <SideLanding />
        <Branding isSrOnly={true} />
      </div>
      <nav className="items-center gap-12 hidden lg:flex">
        {dataNav.map((link) => (
          <Link
            key={link.href}
            href={"/"}
            data-href={link.href}
            className={`text-sm font-medium hover:text-primary header-nav-link ${
              activeSection === link.href ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="max-lg:hidden">
          <SelectLanguageDropdown isSrOnly={true} />
        </div>
        <BtnToHomePage />
      </div>
    </header>
  );
}
