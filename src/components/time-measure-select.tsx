import { Check, ChevronsUpDown } from "lucide-react";
import { useAnalyzeText } from "./analyze-text-provider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function TimeMeasureSelect() {
  const { timeMeasure, setTimeMeasure } = useAnalyzeText();

  const handleTimeMeasureChange = (
    measure: "minutes" | "seconds" | "hours"
  ) => {
    setTimeMeasure(measure);
  };

  const timeMeasureOptions = [
    { label: "Minutes", value: "minutes" },
    { label: "Seconds", value: "seconds" },
    { label: "Hours", value: "hours" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <h1 className="text-sm">{timeMeasure}</h1>
          <ChevronsUpDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {timeMeasureOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() =>
              handleTimeMeasureChange(
                option.value as "minutes" | "seconds" | "hours"
              )
            }
            className="w-full flex justify-between items-center"
          >
            {option.label}
            {timeMeasure === option.value && <Check className="w-4 h-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
