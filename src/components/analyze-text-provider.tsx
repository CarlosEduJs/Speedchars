"use client";

import {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
 
import {
  handleSentencesCount,
  handleWordsCount,
  handleTotalCharacters,
  handleLetterDensityPercentage,
  handleWordsDensityPercentage,
  handleLetterDensity,
  handleWordDensity,
  handleSetenceDensityPercentage,
  handleSetenceDensity,
  handleParagraphsCount,
  averageWordPerParagraph,
  averageWordPerSentence,
  timeEstimatedOfReadingFunction,
} from "@/lib/textAnalysis";

type Values = {
  totalCharacters: number;
  wordsCount: number;
  sentencesCount: number;
  paragraphsCount: number;
  averageWordPerParagraph: number;
  averageWordPerSentence: number;
};

export type Settings = {
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

type AnalyzeTextContextType = {
  text: string;
  setText: (text: string) => void;
  characterLimitToggle: boolean;
  setCharacterLimitToggle: (toggle: boolean) => void;
  characterLimit: number;
  setCharacterLimit: (limit: number) => void;
  handleCharacterLimitToggle: () => void;
  handleCharacterLimit: () => void;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  values: Values;
  timeEstimatedOfReading: number;
  settings: Settings;
  handleSettingsChange: (setting: keyof Settings, value: boolean) => void;
  letterDensityPercentage: { [key: string]: number };
  wordsDensityPercentage: { [key: string]: number };
  letterDensity: { [key: string]: number };
  wordDensity: { [key: string]: number };
  sentencesDensityPercentage: { [key: string]: number };
  sentenceDensity: { [key: string]: number };
  timeMeasure: "minutes" | "seconds" | "hours";
  setTimeMeasure: (measure: "minutes" | "seconds" | "hours") => void;
  geralInformation: {
    totalCharacters: number;
    totalWords: number;
    totalParagraphs: number;
    totalSentences: number;
  };
};

export const AnalyzeTextContext = createContext<AnalyzeTextContextType>({
  text: "",
  setText: () => {},
  characterLimitToggle: false,
  setCharacterLimitToggle: () => {},
  characterLimit: 0,
  setCharacterLimit: () => {},
  handleCharacterLimitToggle: () => {},
  handleCharacterLimit: () => {},
  handleTextChange: () => {},
  timeEstimatedOfReading: 0,
  values: {
    totalCharacters: 0,
    wordsCount: 0,
    sentencesCount: 0,
    paragraphsCount: 0,
    averageWordPerParagraph: 0,
    averageWordPerSentence: 0,
  },
  settings: {
    removeSpaces: false,
    removeSpecialCharacters: false,
    removeNumbers: false,
    removeUppercase: false,
    removeLowercase: false,
    wordsWithHyphens: false,
    ignoreNumbersAsWords: false,
    ignoreSpecialCharactersAsWords: false,
    ignoreUppercaseAsWords: false,
    ignoreLowercaseAsWords: false,
    considerAbbreviations: false,
    treatMultiplePunctuationsAsSingleSentence: false,
    ignoreShortSentences: false,
  },
  handleSettingsChange: () => {},
  letterDensityPercentage: {},
  wordsDensityPercentage: {},
  letterDensity: {},
  wordDensity: {},
  sentencesDensityPercentage: {},
  sentenceDensity: {},
  timeMeasure: "minutes",
  setTimeMeasure: () => {},
  geralInformation: {
    totalCharacters: 0,
    totalWords: 0,
    totalParagraphs: 0,
    totalSentences: 0,
  },
});

export const useAnalyzeText = () => {
  const context = useContext(AnalyzeTextContext);
  if (!context) {
    throw new Error(
      "useAnalyzeText must be used within an AnalyzeTextProvider"
    );
  }
  return context;
};

export const AnalyzeTextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [text, setText] = useState("");
  const [characterLimitToggle, setCharacterLimitToggle] = useState(false);
  const [characterLimit, setCharacterLimit] = useState(100000);
  const [timeEstimatedOfReading, setTimeEstimatedOfReading] = useState(0);
  const [timeMeasure, setTimeMeasure] = useState<
    "minutes" | "seconds" | "hours"
  >("minutes");

  const [letterDensityPercentage, setLetterDensityPercentage] = useState({});
  const [wordsDensityPercentage, setWordsDensityPercentage] = useState({});
  const [letterDensity, setLetterDensity] = useState({});
  const [wordDensity, setWordDensity] = useState({});
  const [sentencesDensityPercentage, setSentencesDensityPercentage] = useState(
    {}
  );
  const [geralInformation, setGeralInformation] = useState({
    totalCharacters: 0,
    totalWords: 0,
    totalParagraphs: 0,
    totalSentences: 0,
  });
  const [sentenceDensity, setSentenceDensity] = useState({});
  const [settings, setSettings] = useState({
    removeSpaces: false,
    removeSpecialCharacters: false,
    removeNumbers: false,
    removeUppercase: false,
    removeLowercase: false,
    wordsWithHyphens: false,
    ignoreNumbersAsWords: false,
    ignoreSpecialCharactersAsWords: false,
    ignoreUppercaseAsWords: false,
    ignoreLowercaseAsWords: false,
    considerAbbreviations: false,
    treatMultiplePunctuationsAsSingleSentence: false,
    ignoreShortSentences: false,
  });

  const handleSettingsChange = (
    setting: keyof typeof settings,
    value: boolean
  ) => {
    setSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const handleCharacterLimitToggle = useCallback(() => {
    setCharacterLimitToggle((prev) => !prev);
  }, [characterLimitToggle]);

  const handleCharacterLimit = useCallback(() => {
    setCharacterLimit(characterLimit);
  }, [characterLimit]);

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      if (characterLimitToggle) {
        if (newText.length <= characterLimit) {
          setText(newText);
        } else {
          setText(newText.slice(0, characterLimit));
        }
      } else {
        setText(newText);
      }
    },
    [characterLimitToggle, characterLimit]
  );

  const values = {
    totalCharacters: handleTotalCharacters(text, settings),
    wordsCount: handleWordsCount(text, settings),
    sentencesCount: handleSentencesCount(text, settings),
    paragraphsCount: handleParagraphsCount(text),
    averageWordPerParagraph: averageWordPerParagraph(text),
    averageWordPerSentence: averageWordPerSentence(text),
  };

  useEffect(() => {
    setLetterDensityPercentage(handleLetterDensityPercentage(text));
    setWordsDensityPercentage(handleWordsDensityPercentage(text));
    setLetterDensity(handleLetterDensity(text));
    setWordDensity(handleWordDensity(text));
    setSentencesDensityPercentage(handleSetenceDensityPercentage(text));
    setSentenceDensity(handleSetenceDensity(text));
    setTimeEstimatedOfReading(
      timeEstimatedOfReadingFunction(text, timeMeasure)
    );
    setGeralInformation({
      totalCharacters: handleTotalCharacters(text, settings),
      totalWords: handleWordsCount(text, settings),
      totalParagraphs: handleParagraphsCount(text),
      totalSentences: handleSentencesCount(text, settings),
    });
  }, [text, settings, timeMeasure]);

  return (
    <AnalyzeTextContext.Provider
      value={{
        text,
        timeEstimatedOfReading,
        setText,
        characterLimitToggle,
        setCharacterLimitToggle,
        characterLimit,
        setCharacterLimit,
        handleCharacterLimitToggle,
        handleCharacterLimit,
        handleTextChange,
        values,
        settings,
        handleSettingsChange,
        letterDensityPercentage,
        wordsDensityPercentage,
        letterDensity,
        wordDensity,
        sentencesDensityPercentage,
        sentenceDensity,
        timeMeasure,
        setTimeMeasure,
        geralInformation,
      }}
    >
      {children}
    </AnalyzeTextContext.Provider>
  );
};
