import { Info, TriangleAlert } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "./translation-provider";

interface InformationAiProps {
  countUses: number;
  maxUses: number;
}

export default function InformationAi({
  countUses,
  maxUses,
}: InformationAiProps) {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-auto">
        <Button variant="ghost" size="icon">
          <Info className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-72 flex flex-col gap-2 px-4 py-2">
        <span className="text-xs text-muted-foreground">
          Uses in 24 hours: {countUses}/{maxUses}
        </span>
        <span className="text-xs text-muted-foreground">
          Powered by OpenAI - Model GPT-4o
        </span>
        <div className="flex items-center gap-2 ">
          <TriangleAlert className="w-4 h-4 text-yellow-500" />
          <span className="text-xs text-muted-foreground">
            Information about the usage of the AI
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {t("block_home_view.info_openai_usage")}
        </span>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
