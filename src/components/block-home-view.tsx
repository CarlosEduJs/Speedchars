"use client";

import InputBlock from "./input-block";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useAnalyzeText } from "./analyze-text-provider";
import InputWithBtn from "./input-with-btn";
import CardsBlockView from "./cards-block-view";
import StatesLetters from "./states-letters";
import StatesWords from "./states-words";
import { useState, useEffect } from "react";
import { Loader2, Sparkles, CircleHelp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "./ui/button";
import { useTranslation } from "./translation-provider";
import { useToast } from "@/hooks/use-toast";
import StatesSetences from "./states-setences";
import ImportFileBtn from "./import-file-btn";
import TimeMeasureSelect from "./time-measure-select";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import GeralInforsText from "./geral-infors-text";
import CopyBtn from "./copy-btn";
export default function BlockHomeView() {
  const {
    text,
    characterLimitToggle,
    handleCharacterLimitToggle,
    characterLimit,
    setCharacterLimit,
    handleCharacterLimit,
    handleTextChange,
    values,
    settings,
    handleSettingsChange,
    timeEstimatedOfReading,
  } = useAnalyzeText();
  const { t, language } = useTranslation();
  const { toast } = useToast();

  const [toggleShowAnalyzeTextWithAi, setToggleShowAnalyzeTextWithAi] =
    useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiUsageCount, setAiUsageCount] = useState(0);
  const maxUses = 15;

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

  const handleToggleShowAnalyzeTextWithAi = async () => {
    if (aiUsageCount >= maxUses) {
      toast({
        title:
          "You have reached the daily limit of AI usage. Try again tomorrow.",
      });
      return;
    }

    setToggleShowAnalyzeTextWithAi(!toggleShowAnalyzeTextWithAi);

    if (!toggleShowAnalyzeTextWithAi) {
      setLoading(true);
      try {
        const response = await fetch("/api/analyze-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text, language: language }),
        });

        const data = await response.json();

        if (response.status === 429) {
          toast({
            title: "You have reached the daily limit of AI usage.",
          });
          return;
        }

        setAiAnalysis(data.analysis || "Error analyzing text.");
        setAiUsageCount(Number(aiUsageCount) + 1);
        toast({
          title: "Text analyzed successfully.",
        });
      } catch (error) {
        toast({
          title: "Error processing text.",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const btnIsDisabled = aiUsageCount >= maxUses || loading || !text;

  return (
    <div className="flex flex-col items-center w-full justify-center mt-9 max-w-2xl mx-auto">
      <h1 className="text-6xl text-center font-bold max-w-xl">
        {t("block_home_view.title")}
      </h1>
      <ImportFileBtn />
      <InputBlock
        onChange={handleTextChange}
        placeholder={t("block_home_view.input_block.placeholder")}
      />
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-between items-center w-full mt-3">
        <div className="flex gap-2 items-center">
          <Checkbox
            id="set-character-limit"
            checked={characterLimitToggle}
            onCheckedChange={handleCharacterLimitToggle}
          />
          <Label htmlFor="set-character-limit">
            {t("block_home_view.character_limit")}
          </Label>
        </div>
        {characterLimitToggle && (
          <InputWithBtn
            placeholder={t("block_home_view.input_with_btn.placeholder")}
            buttonText={t("block_home_view.input_with_btn.button")}
            value={characterLimit.toString()}
            onChange={(e) => setCharacterLimit(Number(e.target.value))}
            onClick={handleCharacterLimit}
          />
        )}
        <div className="flex  gap-2 items-center">
          <h1 className="text-sm">
            {t("block_home_view.time_estimated_of_reading")} in{" "}
            {timeEstimatedOfReading}
          </h1>
          <TimeMeasureSelect />
        </div>
      </div>
      <Button
        variant="outline"
        className="mt-4 h-5 text-xs rounded-lg"
        onClick={handleToggleShowAnalyzeTextWithAi}
        disabled={btnIsDisabled}
      >
        {t("block_home_view.show_analyze_text_with_ai")}

        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {`${aiUsageCount}/${maxUses} ${t("block_home_view.uses_today")}`}
            <Sparkles className="w-4 h-4 text-primary" />
          </>
        )}
      </Button>
      <div className="flex items-center gap-2 my-2">
        <h2 className="text-sm text-muted-foreground">
          Powered by OpenAI - Model GPT-4o
        </h2>
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleHelp className="w-4 h-4 text-primary" />
          </TooltipTrigger>
          <TooltipContent className="max-w-md">
            <p>{t("block_home_view.info_openai_usage")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {toggleShowAnalyzeTextWithAi && (
        <div className="mt-4 p-4 border rounded-lg w-full bg-secondary">
          <h2 className="text-xl font-semibold text-primary">
            {t("block_home_view.ai_analysis")}
          </h2>
          {loading ? (
            <p className="flex items-center gap-2">
              {t("block_home_view.processing")}{" "}
              <Loader2 className="w-4 h-4 animate-spin" />
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              <CopyBtn text={aiAnalysis} />
              <ReactMarkdown
                className="text-foreground prose prose-sm sm:prose-base prose-invert max-w-none"
                remarkPlugins={[remarkGfm]}
              >
                {aiAnalysis}
              </ReactMarkdown>
            </div>
          )}
        </div>
      )}
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
