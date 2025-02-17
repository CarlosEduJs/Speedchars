import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { useAnalyzeText } from "./analyze-text-provider";
import { useRef } from "react";
import { Input } from "./ui/input";

export default function ImportFileBtn() {
  const { setText } = useAnalyzeText();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 mr-auto"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        <Upload className="mr-2 h-4 w-4" />
        Import File
      </Button>
      <Input
        type="file"
        className="hidden"
        accept=".txt"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
}
