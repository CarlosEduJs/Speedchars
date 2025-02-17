import { useContext } from "react";
import { AnalyzeTextContext } from "./analyze-text-provider";
import { Loader2, SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "./translation-provider";
import { useToast } from "@/hooks/use-toast";

interface BtnGenerateAnalyzerTextProps {
  handleTextAnalyzed: (text: string) => void;
  countUses: number;
  setCountUses: (count: number) => void;
  maxUses: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setTab: (tab: string) => void;
  tab: string;
}

export default function BtnGenerateAnalyzerText({
  handleTextAnalyzed,
  countUses,
  setCountUses,
  maxUses,
  loading,
  setLoading,
  setTab,
  tab,
}: BtnGenerateAnalyzerTextProps) {
  const { text } = useContext(AnalyzeTextContext);
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const btnIsDisabled = countUses >= maxUses || loading || !text;

  const handleGenerateAnalyzerText = async () => {
    if (countUses >= maxUses) {
      toast({
        title: "You have reached the daily limit of AI usage.",
      });
      return;
    }
    setTab("ai");
    try {
      setLoading(true);
      const response = await fetch("/api/ai-analyze-text", {
        method: "POST",
        body: JSON.stringify({
          text,
          model: "gpt-4o-mini",
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
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
            handleTextAnalyzed(accumulatedText);
          } catch (error) {
            console.error("Error parsing chunk:", error);
          }
        }
      }

      toast({
        title: "Text analyzed successfully",
        description: "Text analyzed successfully",
      });
      setCountUses(Number(countUses) + 1);
    } catch (error) {
      toast({
        title: "Error analyzing text",
        description: "Please try again later",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGenerateAnalyzerText}
      disabled={btnIsDisabled}
      size="sm"
      className="w-fit flex items-center gap-2 rounded-full"
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {t("block_home_view.loading")}
        </>
      ) : (
        <>
          <div className="flex gap-2 items-center">
            {t("block_home_view.show_analyze_text_with_ai")}
          </div>
          <SendHorizonal className="w-4 h-4 animate-pulse" />
        </>
      )}
    </Button>
  );
}
