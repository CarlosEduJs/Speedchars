"use client";

import { ClipboardPaste } from "lucide-react";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { AnalyzeTextContext } from "./analyze-text-provider";

export default function PastBtn() {
  const [isPast, setIsPast] = useState(false);
  const { setText } = useContext(AnalyzeTextContext);
  const pasteText = () => {
    navigator.clipboard.readText().then((text) => {
      setIsPast(true);
      setTimeout(() => {
        setIsPast(false);
      }, 3000);
      setText(text);
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="max-w-fit"
      onClick={() => pasteText()}
    >
      <ClipboardPaste className="w-4 h-4" />
      <p className="text-sm">{isPast ? "Pasted" : "Past"}</p>
    </Button>
  );
}
