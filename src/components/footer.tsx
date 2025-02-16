import Link from "next/link";
import Branding from "./branding";

export default function Footer() {
  const linksFooter = [
    {
      label: "Home",
      href: "/home",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Github",
      href: "https://github.com/CarlosEduJs/Speedchars",
    },
    {
      label: "Terms",
      href: "/terms",
    },
    {
      label: "Privacy",
      href: "/privacy",
    },
  ];

  return (
    <footer className="border-t w-full flex flex-col md:flex-row justify-between p-8 gap-5">
      <div className="flex items-center gap-2">
        <Branding isSrOnly={false} />
        <p className="text-xs text-muted-foreground">
          All rights reserved - {new Date().getFullYear()}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
        {linksFooter.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-muted-foreground"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
