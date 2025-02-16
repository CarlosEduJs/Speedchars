import { Columns4, Grip, Rows, Rows2, Settings, SquareAsterisk, WholeWord } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useTranslation } from "./translation-provider";

type Card = {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  settings?: any;
};

type Values = {
  totalCharacters: number;
  wordsCount: number;
  sentencesCount: number;
  paragraphsCount: number;
  averageWordPerParagraph: number;
  averageWordPerSentence: number;
};

type Settings = {
  removeSpaces: boolean;
  removeSpecialCharacters: boolean;
  removeNumbers: boolean;
  removeUppercase: boolean;
  removeLowercase: boolean;
  wordsWithHyphens: boolean;
  ignoreNumbersAsWords: boolean;
  ignoreSpecialCharactersAsWords: boolean;
  ignoreUppercaseAsWords: boolean;
  ignoreLowercaseAsWords: boolean;
  considerAbbreviations: boolean;
  treatMultiplePunctuationsAsSingleSentence: boolean;
  ignoreShortSentences: boolean;
};

export default function CardsBlockView({
  values,
  settings,
  handleSettingsChange,
}: {
  values: Values;
  settings: Settings;
  handleSettingsChange: (setting: keyof Settings, value: boolean) => void;
}) {
  const { t } = useTranslation();

  const formatValue = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const cards: Card[] = [
    {
      title: t("block_home_view.cards_block_view.title_total_characters"),
      value: values.totalCharacters,
      icon: Grip,
      color: "text-primary",
      bgColor: "bg-primary/10",
      settings: [
        {
          label: t("block_home_view.cards_block_view.label_remove_spaces"),
          checked: settings.removeSpaces,
          onChange: () =>
            handleSettingsChange("removeSpaces", !settings.removeSpaces),
        },
        {
          label: t(
            "block_home_view.cards_block_view.label_remove_special_characters"
          ),
          checked: settings.removeSpecialCharacters,
          onChange: () =>
            handleSettingsChange(
              "removeSpecialCharacters",
              !settings.removeSpecialCharacters
            ),
        },
        {
          label: t("block_home_view.cards_block_view.label_remove_numbers"),

          checked: settings.removeNumbers,
          onChange: () =>
            handleSettingsChange("removeNumbers", !settings.removeNumbers),
        },
        {
          label: t("block_home_view.cards_block_view.label_remove_uppercase"),
          checked: settings.removeUppercase,
          onChange: () =>
            handleSettingsChange("removeUppercase", !settings.removeUppercase),
        },

        {
          label: t("block_home_view.cards_block_view.label_remove_lowercase"),
          checked: settings.removeLowercase,
          onChange: () =>
            handleSettingsChange("removeLowercase", !settings.removeLowercase),
        },

        {
          label: t("block_home_view.cards_block_view.label_words_with_hyphens"),
          checked: settings.wordsWithHyphens,
          onChange: () =>
            handleSettingsChange(
              "wordsWithHyphens",
              !settings.wordsWithHyphens
            ),
        },
        {
          label: t(
            "block_home_view.cards_block_view.label_ignore_numbers_as_words"
          ),

          checked: settings.ignoreNumbersAsWords,
          onChange: () =>
            handleSettingsChange(
              "ignoreNumbersAsWords",
              !settings.ignoreNumbersAsWords
            ),
        },
      ],
    },
    {
      title: t("block_home_view.cards_block_view.title_total_words"),
      value: values.wordsCount,
      icon: WholeWord,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      settings: [
        {
          label: t("block_home_view.cards_block_view.label_words_with_hyphens"),

          checked: settings.wordsWithHyphens,
          onChange: () =>
            handleSettingsChange(
              "wordsWithHyphens",
              !settings.wordsWithHyphens
            ),
        },

        {
          label: t(
            "block_home_view.cards_block_view.label_ignore_numbers_as_words"
          ),
          checked: settings.ignoreNumbersAsWords,
          onChange: () =>
            handleSettingsChange(
              "ignoreNumbersAsWords",
              !settings.ignoreNumbersAsWords
            ),
        },
        {
          label: t(
            "block_home_view.cards_block_view.label_ignore_special_characters_as_words"
          ),

          checked: settings.ignoreSpecialCharactersAsWords,
          onChange: () =>
            handleSettingsChange(
              "ignoreSpecialCharactersAsWords",
              !settings.ignoreSpecialCharactersAsWords
            ),
        },
        {
          label: t(
            "block_home_view.cards_block_view.label_ignore_uppercase_as_words"
          ),

          checked: settings.ignoreUppercaseAsWords,
          onChange: () =>
            handleSettingsChange(
              "ignoreUppercaseAsWords",
              !settings.ignoreUppercaseAsWords
            ),
        },

        {
          label: t(
            "block_home_view.cards_block_view.label_ignore_lowercase_as_words"
          ),
          checked: settings.ignoreLowercaseAsWords,
          onChange: () =>
            handleSettingsChange(
              "ignoreLowercaseAsWords",
              !settings.ignoreLowercaseAsWords
            ),
        },

        {
          label: t(
            "block_home_view.cards_block_view.label_consider_abbreviations"
          ),
          checked: settings.considerAbbreviations,
          onChange: () =>
            handleSettingsChange(
              "considerAbbreviations",
              !settings.considerAbbreviations
            ),
        },
      ],
    },
    {
      title: t("block_home_view.cards_block_view.title_total_sentences"),
      value: values.sentencesCount,
      icon: Columns4,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      settings: [
        {
          label: t(
            "block_home_view.cards_block_view.label_treat_multiple_punctuations_as_single_sentence"
          ),

          checked: settings.treatMultiplePunctuationsAsSingleSentence,
          onChange: () =>
            handleSettingsChange(
              "treatMultiplePunctuationsAsSingleSentence",
              !settings.treatMultiplePunctuationsAsSingleSentence
            ),
        },
        {
          label: t(
            "block_home_view.cards_block_view.label_ignore_short_sentences"
          ),
          checked: settings.ignoreShortSentences,
          onChange: () =>
            handleSettingsChange(
              "ignoreShortSentences",
              !settings.ignoreShortSentences
            ),
        },
      ],
    },
    {
      title: t("block_home_view.cards_block_view.title_total_paragraphs"),
      value: values.paragraphsCount,
      icon: Rows2,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: t(
        "block_home_view.cards_block_view.title_average_words_per_sentence"
      ),
      value: values.averageWordPerSentence,
      icon: SquareAsterisk,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: t(
        "block_home_view.cards_block_view.title_average_words_per_paragraph"
      ),
      value: values.averageWordPerParagraph,
      icon: Rows,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  min-w-full my-6 gap-3">
      {cards.map((card) => (
        <Card
          key={card.title}
          className={`${card.bgColor} p-0 w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden`}
        > 
          <CardHeader>
            <card.icon
              className={`w-40 h-40 absolute -right-6 top-1 opacity-10 ${card.color}`}
            />
            {card.settings && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size={"icon"}>
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      {t(
                        "block_home_view.cards_block_view.dropdown_menu_label"
                      )}
                    </DropdownMenuLabel>
                    {card.settings.map((setting: any) => (
                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        key={setting.label}
                      >
                        <Checkbox
                          id={setting.label}
                          checked={setting.checked}
                          onCheckedChange={setting.onChange}
                        />
                        <Label htmlFor={setting.label}>{setting.label}</Label>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="flex items-center justify-between gap-3">
              <h1 className="text-sm font-semibold ">{card.title}</h1>
            </div>
            <div className="mt-4">
              <h1 className="text-5xl font-bold">{formatValue(card.value)}</h1>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
