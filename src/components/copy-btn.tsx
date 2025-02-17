"use client";

import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

type CopyBtnProps = {
  text: string;
};

export default function CopyBtn({ text }: CopyBtnProps) {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="max-w-fit"
      onClick={() => copyToClipboard(text)}
    >
      <CopyIcon className="w-4 h-4" />
      {isCopied ? "Copied" : "Copy"}
    </Button>
  );
}
