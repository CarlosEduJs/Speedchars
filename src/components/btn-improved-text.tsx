import { useContext, useEffect, useMemo, useState } from "react";
import { AnalyzeTextContext } from "./analyze-text-provider";
import { Loader2, SendHorizonal, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "./translation-provider";
import { formattedSettingsPrompt } from "@/lib/formattedSettingsPrompt";
import { useGenerateImprove } from "./generate-improve-provider";
import { useToast } from "@/hooks/use-toast";

interface BtnImprovedTextProps {
  handleTextImproved: (text: string) => void;
  countUses: number;
  setCountUses: (count: number) => void;
  maxUses: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setTab: (tab: string) => void;
  tab: string;
}

export default function BtnImprovedText({
  handleTextImproved,
  countUses,
  setCountUses,
  maxUses,
  loading,
  setLoading,
  setTab,
  tab,
}: BtnImprovedTextProps) {
  const { text } = useContext(AnalyzeTextContext);
  const { t, language } = useTranslation();
  const { settings } = useGenerateImprove();
  const { toast } = useToast();
  const btnIsDisabled = countUses >= maxUses || loading || !text;

  const prompt = useMemo(() => {
    const settingsInstructions = formattedSettingsPrompt(settings);
    return `
    ${t("improve_text.settings_prompt.instruction_initial")}
    The settings are:
    ${settingsInstructions}
    `;
  }, [settings]);

  const handleImproveText = async () => {
    if (countUses >= maxUses) {
      toast({
        title: "You have reached the daily limit of AI usage.",
      });
      return;
    }

    try {
      setLoading(true);
      setTab("improve");
      const response = await fetch("/api/ai-improve-text", {
        method: "POST",
        body: JSON.stringify({
          text,
          model: "gpt-4o-mini",
          language: language,
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to improve text");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          const cleanedLine = line.replace(/^data: /, "").trim();
          if (!cleanedLine) continue;

          try {
            const parsed = JSON.parse(cleanedLine);
            accumulatedText += parsed.response;
            handleTextImproved(accumulatedText);
          } catch (error) {
            console.error("Error parsing chunk:", error);
          }
        }
      }
      toast({
        title: "Improvement successful",
        description: "Text improved successfully",
      });
      setCountUses(Number(countUses) + 1);
    } catch (error) {
      toast({
        title: "Error improving text",
        description: "Please try again later",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleImproveText}
      disabled={btnIsDisabled}
      size="sm"
      className="w-fit flex items-center gap-2 bg-yellow-600 text-white hover:bg-yellow-600/90 rounded-full"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {t("improve_text.loading")}
        </>
      ) : (
        <>
          <div className="flex gap-2 items-center">
            {t("improve_text.button")}
          </div>
          <SendHorizonal className="w-4 h-4 animate-pulse" />
        </>
      )}
    </Button>
  );
}
