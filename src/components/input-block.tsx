"use client";

import { Textarea } from "./ui/textarea";
import { AnalyzeTextContext } from "./analyze-text-provider";
import { useContext } from "react";

type InputBlockProps = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
};

export default function InputBlock({ onChange, placeholder }: InputBlockProps) {
  const { text } = useContext(AnalyzeTextContext);

  return (
    <Textarea
      value={text}
      onChange={onChange}
      className="bg-secondary px-4 py-2 rounded-lg md:max-w-2xl mt-6 min-h-72  text-xl border-secondary-foreground/20 placeholder:text-gray-400 placeholder:font-semibold font-normal"
      placeholder={placeholder}
    />
  );
}
