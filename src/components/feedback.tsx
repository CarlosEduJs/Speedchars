import {
  Smile,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  MessageSquare,
  SmilePlus,
  Meh,
  Frown,
  CheckCircle,
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

export default function Feedback({ isSrOnly }: { isSrOnly: boolean }) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<string>("praise");
  const [rating, setRating] = useState<string>("good");
  const [isFeedbackSuccess, setIsFeedbackSuccess] = useState<boolean>(false);
  const feedbackOptions = [
    {
      label: t("feedback.options.1"),
      value: "praise",
      icon: <ThumbsUp className="w-3 h-3" />,
    },
    {
      label: t("feedback.options.2"),
      value: "criticism",
      icon: <ThumbsDown className="w-3 h-3" />,
    },
    {
      label: t("feedback.options.3"),
      value: "suggestion",
      icon: <Lightbulb className="w-3 h-3" />,
    },
    {
      label: t("feedback.options.4"),
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
          <Smile />
          {isSrOnly && <span className="sr-only">{t("feedback.title")}</span>}
          {!isSrOnly && t("feedback.title")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-80 p-4">
        <DropdownMenuGroup>
          {!isFeedbackSuccess && (
            <DropdownMenuLabel className="text-xs text-muted-foreground mb-2">
              {t("feedback.description")}
            </DropdownMenuLabel>
          )}
          {isFeedbackSuccess ? (
            <FeedbackSuccess />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {feedbackOptions.map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "flex items-center w-24 gap-2 text-xs cursor-pointer rounded-md px-2 py-1",
                      selectedType === option.value && "bg-secondary"
                    )}
                    onClick={() => handleSelectedType(option.value)}
                  >
                    {option.icon}
                    {option.label}
                  </div>
                ))}
              </div>
              <StartRating rating={rating} setRating={setRating} />
              <FormFeedback
                formData={{ selectedType, rating }}
                setIsFeedbackSuccess={setIsFeedbackSuccess}
              />
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type FormFeedbackProps = {
  formData: { selectedType: string; rating: string };
  setIsFeedbackSuccess: (value: boolean) => void;
};

const FormFeedback = ({
  formData,
  setIsFeedbackSuccess,
}: FormFeedbackProps) => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAnonymos, setIsAnonymos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<{ feedback: string } | null>(null);
  const { t } = useTranslation();

  const handleIsAnonymos = () => {
    setIsAnonymos(!isAnonymos);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleFeedback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          feedback,
          feedbackType: formData.selectedType,
          typeRating: formData.rating,
          anonymous: isAnonymos,
        }),
      });

      const data = await response.json();

      if (data.error) {
        return setIsError({
          feedback: data.error,
        });
      }

      setIsFeedbackSuccess(true);
      setTimeout(() => {
        setIsFeedbackSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error);
      setIsFeedbackSuccess(false);
      setIsError({
        feedback: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
      <div className="flex items-center gap-2">
        <Checkbox
          id="anonymos"
          checked={isAnonymos}
          onCheckedChange={handleIsAnonymos}
        />
        <Label htmlFor="anonymos" className="text-xs">
          Anonymos Feedback
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
        placeholder={t("feedback.placeholder")}
        className="resize-none min-h-36"
        value={feedback}
        onChange={handleFeedback}
      />
      {isLoading ? (
        <Button className="w-full" variant={"outline"} type="submit">
          {t("feedback.sending")} <Loader2 className="w-4 h-4 ml-2 animate-spin" />
        </Button>
      ) : (
        <Button className="w-full" variant={"outline"} type="submit">
          {t("feedback.button")}
        </Button>
      )}
      {isError && (
        <p className="text-red-500 text-xs">{isError.feedback as string}</p>
      )}
    </form>
  );
};

type StartRatingProps = {
  rating: string;
  setRating: (value: string) => void;
};

const StartRating = ({ rating, setRating }: StartRatingProps) => {
  const { t } = useTranslation();
  const options = [
    {
      icon: <SmilePlus />,
      value: "very_good",
      color: "text-green-500",
    },
    {
      icon: <Smile />,
      value: "good",
      color: "text-yellow-500",
    },
    {
      icon: <Meh />,
      value: "neutral",
      color: "text-gray-500",
    },
    {
      icon: <Frown />,
      value: "bad",
      color: "text-red-500",
    },
  ];

  const handleRating = (value: string) => {
    setRating(value);
  };

  return (
    <div className="flex items-center gap-2">
      <p className="text-xs text-muted-foreground">{t("feedback.rating")}</p>
      {options.map((option) => (
        <Button
          key={option.value}
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "flex items-center gap-2",
            rating === option.value && "bg-secondary",
            option.color
          )}
          onClick={() => handleRating(option.value)}
        >
          {option.icon}
        </Button>
      ))}
    </div>
  );
};

const FeedbackSuccess = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 p-2 flex-col">
      <p className="text-sm font-medium text-muted-foreground">
        {t("feedback.thanks")}
      </p>
      <CheckCircle className="w-10 h-10 text-green-500" />
    </div>
  );
};
