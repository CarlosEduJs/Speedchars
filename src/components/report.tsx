import {
  Smile,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  MessageSquare,
  Star,
  SmilePlus,
  Meh,
  Frown,
  CheckCircle,
  Bug,
  Plus,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useTranslation } from "./translation-provider";
import { Label } from "./ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

export default function Report({ isSrOnly }: { isSrOnly: boolean }) {
  const { t } = useTranslation();
  const [isReportSuccess, setIsReportSuccess] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("problem");

  const reportOptions = [
    {
      label: t("report.options.1"),
      value: "problem",
      icon: <Bug className="w-3 h-3" />,
    },
    {
      label: t("report.options.2"),
      value: "suggestion",
      icon: <Lightbulb className="w-3 h-3" />,
    },
    {
      label: t("report.options.3"),
      value: "request",
      icon: <Plus className="w-3 h-3" />,
    },
    {
      label: t("report.options.4"),
      value: "other",
      icon: <MessageSquare className="w-3 h-3" />,
    },
  ];

  const handleSelectedType = (value: string) => {
    setSelectedType(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"sm"} className="w-full">
          <Bug className="w-3 h-3" />
          {isSrOnly && <span className="sr-only">{t("report.title")}</span>}
          {!isSrOnly && t("report.title")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-72 p-4">
        <DropdownMenuGroup>
          {!isReportSuccess && (
            <DropdownMenuLabel className="text-xs text-muted-foreground mb-2">
              {t("report.description")}
            </DropdownMenuLabel>
          )}
          {isReportSuccess ? (
            <FeedbackSuccess />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {reportOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center max-w-44 gap-2 text-xs cursor-pointer rounded-md px-2 py-1",
                      selectedType === option.value && "bg-secondary"
                    )}
                    onClick={() => handleSelectedType(option.value)}
                  >
                    {option.icon}
                    <span className="truncate">{option.label}</span>
                  </div>
                ))}
              </div>

              <FormReport
                formData={{ selectedType }}
                setIsReportSuccess={setIsReportSuccess}
              />
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type FormReportProps = {
  formData: { selectedType: string };
  setIsReportSuccess: (value: boolean) => void;
};

const FormReport = ({ formData, setIsReportSuccess }: FormReportProps) => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isAnonymos, setIsAnonymos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<{ description: string } | null>(null);
  const { t } = useTranslation();

  const handleIsAnonymos = () => {
    setIsAnonymos(!isAnonymos);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/send-report", {
        method: "POST",
        body: JSON.stringify({
          email,
          description,
          reportType: formData.selectedType,
          anonymous: isAnonymos,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setIsError({ description: data.error });
      }
      setIsReportSuccess(true);
      setTimeout(() => {
        setIsReportSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending report:", error);
      setIsError({ description: "Error sending report" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const isDisabled =
    !description ||
    !formData.selectedType ||
    isLoading ||
    description.length < 50;

  return (
    <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <Checkbox
          id="anonymos"
          checked={isAnonymos}
          onCheckedChange={handleIsAnonymos}
        />
        <Label htmlFor="anonymos" className="text-xs">
          Anonymos Report
        </Label>
      </div>
      {!isAnonymos && (
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
      )}
      <Textarea
        placeholder={t("report.placeholder")}
        className="resize-none min-h-36"
        value={description}
        onChange={handleDescription}
      />
      <Button
        className="w-full"
        variant={"outline"}
        type="submit"
        disabled={isDisabled}
      >
        {isLoading ? (
          <>
            {t("report.sending")}
            <Loader2 className="w-4 h-4 animate-spin" />
          </>
        ) : (
          t("report.button")
        )}
      </Button>
      {isError && <p className="text-red-500 text-xs">{isError.description}</p>}
    </form>
  );
};

const FeedbackSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 p-2 flex-col">
      <p className="text-sm font-medium text-muted-foreground">
        {t("report.success")}
      </p>
      <CheckCircle className="w-10 h-10 text-green-500" />
    </div>
  );
};
