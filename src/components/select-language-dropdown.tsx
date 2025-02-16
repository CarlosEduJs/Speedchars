import { CheckIcon, LanguagesIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { useTranslation } from "./translation-provider";
import { cn } from "@/lib/utils";

type SelectLanguageDropdownProps = {
  isSrOnly?: boolean;
};

export default function SelectLanguageDropdown({ isSrOnly = false }: SelectLanguageDropdownProps) {
  const { language, setLanguage } = useTranslation();

  const isLanguageSelected = (languageSelected: string) => {
    return language === languageSelected;
  };

  const handleLanguageChange = (languageSelected: string) => {
    localStorage.setItem("language", languageSelected);
    setLanguage(languageSelected);
  };


  const languages = [
    {
      language: "en",
      name: "English (en-us)",
    },
    {
      language: "pt",
      name: "Português (pt-br)",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <LanguagesIcon className="w-4 h-4" />
          <span className={cn(isSrOnly && "sr-only")}>Select Language {language}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Languages</DropdownMenuLabel>
          <div className="grid gap-2">
            {languages.map((language) => (
              <DropdownMenuItem
                key={language.language}
                onClick={() => handleLanguageChange(language.language)}
                className={cn(
                  isLanguageSelected(language.language) &&
                    "bg-secondary ",
                  "hover:bg-transparent cursor-pointer"
                )}
              >
                {language.name}
                {isLanguageSelected(language.language) && (
                  <CheckIcon className="w-4 h-4 text-primary" />
                )}
              </DropdownMenuItem>

            ))}
          </div>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
