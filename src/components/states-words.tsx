import { useState } from "react";
import { useAnalyzeText } from "./analyze-text-provider";
import { Button } from "./ui/button";
import { useTranslation } from "./translation-provider";
import { Progress } from "./ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function StatesLetters() {
  const { wordsDensityPercentage, wordDensity } = useAnalyzeText();
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const initialItemsToShow = 5;

  if (Object.keys(wordsDensityPercentage).length < 1) {
    return (
      <div className="grid gap-2 w-full py-5">
        <h1 className="text-2xl font-bold">
          {t("block_home_view.states_words.title")}
        </h1>
        <p>{t("block_home_view.states_words.no_data")}</p>
      </div>
    );
  }

  const sortedEntries = Object.entries(wordsDensityPercentage).sort(
    (a, b) => b[1] - a[1]
  );

  const itemsToShow = isExpanded
    ? sortedEntries
    : sortedEntries.slice(0, initialItemsToShow);

  return (
    <div className="grid gap-2 min-w-full py-5">
      <h1 className="text-2xl font-bold">
        {t("block_home_view.states_words.title")}
      </h1>
      <div className="grid gap-2">
        {itemsToShow.map(([word, percentage]) => (
          <Tooltip key={word}>
            <TooltipTrigger asChild>
              <div
                key={word}
                className="flex items-center gap-2 justify-between"
              >
                <span className="text-sm uppercase w-20 truncate">{word}</span>
                <Progress value={percentage} />
                <span className="text-sm w-10">{percentage.toFixed(2)}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Word: {word.toUpperCase()}</p>
              <p>Percentage: {percentage.toFixed(2)}%</p>
              <p>Total: {wordDensity[word]}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      {sortedEntries.length > initialItemsToShow && (
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant={"secondary"}
          className="mt-2 "
        >
          {isExpanded ? "See Less" : "See More"}
        </Button>
      )}
    </div>
  );
}
