"use client";

import { Textarea } from "./ui/textarea";
import { AnalyzeTextContext } from "./analyze-text-provider";
import { useContext, useEffect, useState } from "react";
import CopyBtn from "./copy-btn";
import ImportFileBtn from "./import-file-btn";
import PastBtn from "./past-btn";
import BtnImprovedText from "./btn-improved-text";
import { GenerateImproveProvider } from "./generate-improve-provider";
import BtnGenerateAnalyzerText from "./btn-generate-analyzer-text";
import InformationAi from "./information-ai";
import SettingImproveDialog from "./setting-improve-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import TextAiAnalyzed from "./text-ai-analyzed";
import TextAiImproved from "./text-ai-improved";
import { FileText } from "@geist-ui/icons";
import { ChartNoAxesColumn, ChartNoAxesCombined } from "lucide-react";

type InputBlockProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  handleTextAnalyzed: (text: string) => void;
  handleTextImproved: (text: string) => void;
  countUses: number;
  setCountUses: (count: number) => void;
  maxUses: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  aiAnalysis: string;
  aiImprovement: string;
};

export default function InputBlock({
  onChange,
  placeholder,
  handleTextAnalyzed,
  handleTextImproved,
  countUses,
  setCountUses,
  maxUses,
  loading,
  setLoading,
  aiAnalysis,
  aiImprovement,
}: InputBlockProps) {
  const { text } = useContext(AnalyzeTextContext);
  const caracteres = text.length;
  const [tab, setTab] = useState("text");
  const [textCopy, setTextCopy] = useState(text);

  const tabs = [
    {
      contentValue: text,
      label: "Your Text",
      key: "text",
      content: (
        <Textarea
          value={text}
          onChange={onChange}
          className="px-4 md:max-w-2xl border-none bg-transparent mt-6 min-h-72  text-xl placeholder:text-gray-400 placeholder:font-semibold font-normal"
          placeholder={placeholder}
        />
      ),
      icon: <FileText className="w-4 h-4" />,
    },
    {
      contentValue: aiAnalysis,
      label: "AI Analysis",
      key: "ai",
      content: <TextAiAnalyzed textAiAnalyzed={aiAnalysis} />,
      icon: <ChartNoAxesColumn className="w-4 h-4" />,
    },
    {
      contentValue: aiImprovement,
      label: "Improved Text",
      key: "improve",
      content: <TextAiImproved textAiImproved={aiImprovement} />,
      icon: <ChartNoAxesCombined className="w-4 h-4" />,
    },
  ];

  const handleTabChange = (value: string) => {
    setTab(value);
    setTextCopy(tabs.find((tab) => tab.key === value)?.contentValue || "");
  };

  useEffect(() => {
    handleTabChange(tab);
  }, [tab]);

  return (
    <div className="flex flex-col items-center bg-secondary rounded-lg w-full mt-4">
      <header className="flex items-center justify-between w-full px-5 py-2 border-b dark:border-secondary-foreground/20">
        <div className="flex gap-2 items-center">
          <ImportFileBtn />
          <CopyBtn text={textCopy} />
          <PastBtn />
        </div>
        <p className="text-sm text-gray-400 font-semibold">
          {caracteres}/10000
        </p>
      </header>
      <div className="w-full">
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="flex items-center justify-start rounded-none border-b dark:border-secondary-foreground/20">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className="flex items-center gap-2"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.key} value={tab.key}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <footer className="flex flex-col sm:flex-row items-center sm:gap-5 w-full px-5 border-t dark:border-secondary-foreground/20">
        <div className="flex flex-row max-[540px]:flex-col max-[540px]:items-start items-center max-[540px]:gap-0 gap-5 w-full sm:w-auto">
          <GenerateImproveProvider>
            <div className="py-2 flex items-center gap-2 sm:border-r dark:border-secondary-foreground/20 pr-5">
              <BtnImprovedText
                handleTextImproved={handleTextImproved}
                countUses={countUses}
                setCountUses={setCountUses}
                maxUses={maxUses}
                loading={loading}
                setLoading={setLoading}
                setTab={handleTabChange}
                tab={tab}
              />
              <SettingImproveDialog disabled={loading} />
            </div>
          </GenerateImproveProvider>
          <BtnGenerateAnalyzerText
            handleTextAnalyzed={handleTextAnalyzed}
            countUses={countUses}
            setCountUses={setCountUses}
            maxUses={maxUses}
            loading={loading}
            setLoading={setLoading}
            setTab={handleTabChange}
            tab={tab}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 font-light">
            Uses in 24h: {countUses}/{maxUses}
          </span>
          <InformationAi countUses={countUses} maxUses={maxUses} />
        </div>
      </footer>
    </div>
  );
}
