import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTranslation } from "./translation-provider";

interface TextAiImprovedProps {
  textAiImproved: string;
}

export default function TextAiImproved({
  textAiImproved,
}: TextAiImprovedProps) {
  const { t } = useTranslation();
  return (
    <div className="px-4 md:max-w-2xl mt-6 min-h-72 max-h-96 overflow-y-auto text-sm font-normal">
      <ReactMarkdown
        className="prose prose-sm sm:prose-base prose-invert max-w-none"
        remarkPlugins={[remarkGfm]}
      >
        {textAiImproved || t("block_home_view.not_text_improved")}
      </ReactMarkdown>
    </div>
  );
}
