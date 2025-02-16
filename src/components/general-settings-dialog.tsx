import Link from "next/link";
import ModeToggle from "./mode-toggle";
import SelectLanguageDropdown from "./select-language-dropdown";
import BtnCta from "./btn-cta";
import { cn } from "@/lib/utils";
import { Book, Shield } from "lucide-react";
import { Github } from "@geist-ui/icons";

type ConfigData = {
  label: string;
  element?: React.ReactNode;
  description?: string;
  link?: string;
  textLink?: string;
  icon?: React.ReactNode;
};

const configData: ConfigData[] = [
  {
    label: "Language",
    description: "Select your language on the app",
    element: <SelectLanguageDropdown />,
  },
  {
    label: "Theme",
    description: "Select your theme on the app",
    element: <ModeToggle />,
  },
  {
    label: "Terms of Service",
    description: "Read the terms of service of the app",
    link: "/terms",
    textLink: "Terms of Service",
    icon: <Book className="w-4 h-4" />,
  },
  {
    label: "Privacy Policy",
    description: "Read the privacy policy of the app",
    link: "/privacy",
    textLink: "Privacy Policy",
    icon: <Shield className="w-4 h-4" />,
  },
];

export default function GeneralSettingsDialog() {
  return (
    <div className="w-full h-full">
      {configData.map((item) => (
        <div
          key={item.label}
          className={cn(
            "border-b py-2",
            item.link &&
              "flex flex-col gap-2 md:flex-row items-center justify-between"
          )}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{item.label}</h2>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
          {item.element && <div className="mt-2">{item.element}</div>}
          {item.link && (
            <BtnCta
              href={item.link}
              text={"Go to " + item.textLink}
              icon={item.icon}
            />
          )}
        </div>
      ))}
      <div className="flex flex-col gap-2 my-4">
        <p className="text-sm text-muted-foreground">View project on Github</p>
        <BtnCta
          href="https://github.com/CarlosEduJs/speedchars"
          text="View project on Github"
          icon={<Github className="w-4 h-4" />}
        />
      </div>
    </div>
  );
}
