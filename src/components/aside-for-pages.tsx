"use client";

import { useEffect } from "react";
import Link from "next/link";
import Branding from "./branding";
import SelectLanguageDropdown from "./select-language-dropdown";

interface AsideForPagesProps {
  dataNav: NavItem[];
  page: string;
}

type NavItem = {
  name: string;
  href: string;
};

export default function AsideForPages({ dataNav, page }: AsideForPagesProps) {
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

    const links = document.querySelectorAll(`.${page}-nav-link`);
    links.forEach((link) => link.addEventListener("click", handleScroll));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleScroll));
    };
  }, []);

  return (
    <aside className="w-full md:w-1/4 md:sticky top-0 md:h-screen">
      <header className="w-full h-16">
        <Branding isSrOnly={false} />
      </header>
      <nav className="w-full h-full gap-3 flex flex-col">
        <ul className="gap-4 grid grid-cols-2 md:grid-cols-1">
          {dataNav.map((item) => (
            <li key={item.href}>
              <Link
                className={`text-sm text-muted-foreground flex items-center gap-2 ${page}-nav-link`}
                href={`/${page}`}
                data-href={item.href}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <SelectLanguageDropdown />
      </nav>
    </aside>
  );
}
