"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { CircleHelp, Sparkles } from "lucide-react";
import { AnalyzeTextContext } from "./analyze-text-provider";
import { useTranslation } from "./translation-provider";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CopyBtn from "./copy-btn";
import SettingImproveDialog from "./setting-improve-dialog";
import {
  GenerateImproveProvider,
  useGenerateImprove,
} from "./generate-improve-provider";
import { formattedSettingsPrompt } from "@/lib/formattedSettingsPrompt";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function GenerateImproveBlock() {
  return (
    <GenerateImproveProvider>
      <GenerateImproveContent />
    </GenerateImproveProvider>
  );
}

function GenerateImproveContent() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { text } = React.useContext(AnalyzeTextContext);
  const { language, t } = useTranslation();
  const [improvedText, setImprovedText] = React.useState("");
  const { toast } = useToast();
  const { settings } = useGenerateImprove();

  const maxUses = 15;
  const [aiUsageCount, setAiUsageCount] = React.useState(0);

  const prompt = React.useMemo(() => {
    const settingsInstructions = formattedSettingsPrompt(settings);
    return `
    ${t("improve_text.settings_prompt.instruction_initial")}
    The settings are:
    ${settingsInstructions}
    `;
  }, [settings]);

  const fetchAiUsageCount = async () => {
    try {
      const response = await fetch("/api/get-ai-usage-count");
      const data = await response.json();
      setAiUsageCount(data.count);
    } catch (error) {
      toast({
        title: "Error getting AI usage count",
        description: "Please try again later",
      });
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchAiUsageCount();
  }, []);

  const handleImproveText = async () => {
    if (aiUsageCount >= maxUses) {
      toast({
        title: "You have reached the daily limit of AI usage.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch("/api/ai-improve-text", {
        method: "POST",
        body: JSON.stringify({
          text,
          model: "gpt-4o-mini",
          language: language,
          prompt,
        }),
      });
      const data = await response.json();
      setImprovedText(data.response);
      toast({
        title: "Improvement successful",
        description: "Text improved successfully",
      });
      setAiUsageCount(Number(aiUsageCount) + 1);
    } catch (error) {
      toast({
        title: "Error improving text",
        description: "Please try again later",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const btnIsDisabled =
    isLoading || !text || text.length < 20 || aiUsageCount >= maxUses;

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-lg font-bold">Improve Text</h2>
      <p className="text-sm">{t("improve_text.description")}</p>
      <div className="flex justify-between gap-2 mt-2">
        <Button
          onClick={handleImproveText}
          disabled={btnIsDisabled}
          size="sm"
          className="w-full flex items-center gap-2 bg-foreground text-background hover:bg-foreground/90"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 animate-pulse" />
              {t("improve_text.loading")}
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center">
                {t("improve_text.button")}
                <span className="text-xs">
                  {aiUsageCount}/{maxUses}
                </span>
              </div>
              <Sparkles className="w-4 h-4 animate-pulse" />
            </>
          )}
        </Button>
        <SettingImproveDialog disabled={btnIsDisabled} />
      </div>
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
      {improvedText && (
        <>
          <CopyBtn text={improvedText} />
          <div className="flex flex-col gap-2 p-3 rounded-md bg-muted">
            <h2 className="text-lg font-bold">{t("improve_text.title")}</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {improvedText}
            </ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
}
