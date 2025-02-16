"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface TranslationContextProps {
  language: string;
  translations: Record<string, any>;
  setLanguage: (lang: string) => void;
  t: (path: string, replacements?: Record<string, string>) => string;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(
  undefined
);

export function TranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState<Record<string, any>>({});

  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "en";
    if (storedLang) {
      setLanguage(storedLang);
    }

    import(`@/locales/${storedLang}.json`)
      .then((module) => setTranslations(module.default))
      .catch((error) => console.error("Error loading translations", error));
  }, [language]);

  function t(path: string, replacements: Record<string, string> = {}): string {
    const keys = path.split(".");
    let result: any = translations;

    for (const key of keys) {
      if (result[key] === undefined) {
        return path;
      }
      result = result[key];
    }

    return Object.keys(replacements).reduce(
      (text, key) => text.replace(`{{${key}}}`, replacements[key]),
      result
    );
  }

  return (
    <TranslationContext.Provider
      value={{ language, translations, setLanguage, t }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslation must be used within a TranslationProvider"
    );
  }
  return context;
}
