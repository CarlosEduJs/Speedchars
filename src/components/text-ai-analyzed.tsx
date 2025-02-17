import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "./translation-provider";

interface TextAiAnalyzedProps {
  textAiAnalyzed: string;
}

export default function TextAiAnalyzed({
  textAiAnalyzed,
}: TextAiAnalyzedProps) {
  const { t } = useTranslation();

  return (
    <div className="px-4 md:max-w-2xl mt-6 min-h-72 max-h-96 overflow-y-auto text-sm font-normal">
      <ReactMarkdown
        className="prose prose-sm sm:prose-base prose-invert max-w-none"
        remarkPlugins={[remarkGfm]}
      >
        {textAiAnalyzed || t("block_home_view.not_text_analyzed")}
      </ReactMarkdown>
    </div>
  );
}
