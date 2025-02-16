import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

type CopyBtnProps = {
  text: string;
};

export default function CopyBtn({ text }: CopyBtnProps) {
  const { toast } = useToast();
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Text copied to clipboard.",
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="max-w-fit"
      onClick={() => copyToClipboard(text)}
    >
      <CopyIcon className="w-4 h-4" />
      Copy
    </Button>
  );
}
