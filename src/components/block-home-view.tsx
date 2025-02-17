"use client";

import InputBlock from "./input-block";
import { useAnalyzeText } from "./analyze-text-provider";
import CardsBlockView from "./cards-block-view";
import StatesLetters from "./states-letters";
import StatesWords from "./states-words";
import { useState, useEffect } from "react";
import { useTranslation } from "./translation-provider";
import { useToast } from "@/hooks/use-toast";
import StatesSetences from "./states-setences";
import TimeMeasureSelect from "./time-measure-select";
import GeralInforsText from "./geral-infors-text";
import { TypingAnimation } from "./magicui/typing-animation";

export default function BlockHomeView() {
  const {
    handleTextChange,
    values,
    settings,
    handleSettingsChange,
    timeEstimatedOfReading,
  } = useAnalyzeText();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiUsageCount, setAiUsageCount] = useState(0);
  const maxUses = 15;
  const [textAnalyzed, setTextAnalyzed] = useState("");
  const [textImproved, setTextImproved] = useState("");

  const handleTextAnalyzed = (text: string) => {
    setTextAnalyzed(text);
  };

  const handleTextImproved = (text: string) => {
    setTextImproved(text);
  };

  const fetchAiUsageCount = async () => {
    try {
      const response = await fetch("/api/get-ai-usage-count");
      if (response.ok) {
        const data = await response.json();
        setAiUsageCount(data.count);
      } else {
        toast({
          title: "Error getting AI usage count:",
          description: `${response.status} ${response.statusText}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error in request:",
        description: `${error}`,
      });
    }
  };

  useEffect(() => {
    fetchAiUsageCount();
  }, []);

  return (
    <div className="flex flex-col items-center w-full justify-center mt-9 max-w-2xl mx-auto">
      <TypingAnimation
        className="text-6xl text-center font-bold max-w-xl"
        
      >
        {t("block_home_view.title")}
      </TypingAnimation>
      <InputBlock
        onChange={handleTextChange}
        placeholder={t("block_home_view.input_block.placeholder")}
        handleTextAnalyzed={handleTextAnalyzed}
        handleTextImproved={handleTextImproved}
        countUses={aiUsageCount}
        setCountUses={setAiUsageCount}
        maxUses={maxUses}
        loading={loading}
        setLoading={setLoading}
        aiAnalysis={textAnalyzed}
        aiImprovement={textImproved}
      />
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center w-full mt-3">
        <div className="flex  gap-2 items-center">
          <h1 className="text-sm">
            {t("block_home_view.time_estimated_of_reading")} in{" "}
            {timeEstimatedOfReading}
          </h1>
          <TimeMeasureSelect />
        </div>
      </div>
      <GeralInforsText />
      <CardsBlockView
        values={values}
        settings={settings}
        handleSettingsChange={handleSettingsChange}
      />
      <StatesLetters />
      <StatesWords />
      <StatesSetences />
    </div>
  );
}
