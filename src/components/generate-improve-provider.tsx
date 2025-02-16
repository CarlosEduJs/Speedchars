"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useTranslation } from "./translation-provider";

export type Settings = {
  textObs: {
    label: string;
    value: string;
  };
  textTone: {
    isMultiple: false;
    label: string;
    value: string;
    options: Record<string, string>;
  };
  textObjective: {
    isMultiple: false;
    label: string;
    value: string;
    options: Record<string, string>;
  };
  textGrammerAndStyle: {
    isMultiple: true;
    label: string;
    values: string[];
    options: Record<string, string>;
  };
  textComplexity: {
    isMultiple: false;
    label: string;
    value: string;
    options: Record<string, string>;
  };
  textAudienceFiltering: {
    isMultiple: false;
    label: string;
    value: string;
    options: Record<string, string>;
  };
  textDuration: {
    isMultiple: false;
    label: string;
    value: string;
    options: Record<string, string>;
  };
  regionalism: {
    isMultiple: false;
    label: string;
    value: string;
    options: Record<string, string>;
  };
  textLayoutAndFormatting: {
    isMultiple: true;
    label: string;
    values: string[];
    options: Record<string, string>;
  };
};

type GenerateImproveContextType = {
  settings: Settings;
  handleSettingsChange: (
    setting: keyof Settings,
    value: string | string[]
  ) => void;
};

export const GenerateImproveContext = createContext<
  GenerateImproveContextType | undefined
>(undefined);

export const useGenerateImprove = () => {
  const context = useContext(GenerateImproveContext);
  if (!context) {
    throw new Error(
      "useGenerateImprove must be used within a GenerateImproveProvider"
    );
  }
  return context;
};

export const GenerateImproveProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();

  const initialSettings: Settings = {
    textObs: {
      label: t("improve_text.form.item1.label"),
      value: "",
    },
    textTone: {
      label: t("improve_text.form.item2.label"),
      isMultiple: false,
      value: "neutral",
      options: t("improve_text.form.item2.options") as unknown as Record<
        string,
        string
      >,
    },
    textObjective: {
      label: t("improve_text.form.item3.label"),
      isMultiple: false,
      value: "information",
      options: t("improve_text.form.item3.options") as unknown as Record<
        string,
        string
      >,
    },
    textGrammerAndStyle: {
      label: t("improve_text.form.item4.label"),
      isMultiple: true,
      values: [
        "improve_writing",
        "improve_clarity_and_coherence",
        "improve_impact_and_persuasion",
      ],
      options: t("improve_text.form.item4.options") as unknown as Record<
        string,
        string
      >,
    },
    textComplexity: {
      label: t("improve_text.form.item5.label"),
      isMultiple: false,
      value: "simple",
      options: t("improve_text.form.item5.options") as unknown as Record<
        string,
        string
      >,
    },
    textAudienceFiltering: {
      label: t("improve_text.form.item6.label"),
      isMultiple: false,
      value: "general",
      options: t("improve_text.form.item6.options") as unknown as Record<
        string,
        string
      >,
    },
    textDuration: {
      label: t("improve_text.form.item7.label"),
      isMultiple: false,
      value: "short",
      options: t("improve_text.form.item7.options") as unknown as Record<
        string,
        string
      >,
    },
    regionalism: {
      label: t("improve_text.form.item8.label"),
      isMultiple: false,
      value: "no_change",
      options: t("improve_text.form.item8.options") as unknown as Record<
        string,
        string
      >,
    },
    textLayoutAndFormatting: {
      label: t("improve_text.form.item9.label"),
      isMultiple: true,
      values: [
        "quotes",
        "quotes_with_markers",
        "quotes_with_markers_and_numbers",
        "subtitles",
        "highlighted_paragraphs",
        "paragraphs_with_titles",
      ],
      options: t("improve_text.form.item9.options") as unknown as Record<
        string,
        string
      >,
    },
  };

  const [settings, setSettings] = useState<Settings>(initialSettings);

  const handleSettingsChange = (
    setting: keyof Settings,
    value: string | string[]
  ) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [setting]: {
        ...prevSettings[setting],
        ...(typeof value === "string" ? { value: value } : { values: value }),
      },
    }));
  };

  return (
    <GenerateImproveContext.Provider value={{ settings, handleSettingsChange }}>
      {children}
    </GenerateImproveContext.Provider>
  );
};
