import { Settings } from "@/components/analyze-text-provider";

const isAbbreviationSentence = (sentence: string): boolean => {
  const trimmed = sentence.trim();
  const knownAbbreviations = new Set([
    "Dr.",
    "Sr.",
    "Sra.",
    "Prof.",
    "etc.",
    "E.g.",
    "I.e.",
  ]);
  if (knownAbbreviations.has(trimmed)) return true;
  return trimmed.length <= 4 && trimmed.endsWith(".");
};

export const handleSentencesCount = (
  text: string,
  settings: Settings
): number => {
  const trimmedText = text.trim();
  let normalizedText = trimmedText;

  if (settings.treatMultiplePunctuationsAsSingleSentence) {
    normalizedText = trimmedText.replace(/[.!?]{2,}/g, ".");
  }

  if (settings.ignoreShortSentences) {
    const sentenceRegex = /[^.!?]+[.!?]*/g;
    const matchedSentences = normalizedText.match(sentenceRegex) || [];

    const validSentences = matchedSentences.filter(
      (sentence: string) =>
        sentence.trim().length > 0 &&
        !isAbbreviationSentence(sentence) &&
        sentence.trim().split(" ").length >= 3
    );

    return validSentences.length;
  }

  const sentenceRegex = /[^.!?]+[.!?]*/g;
  const matchedSentences = normalizedText.match(sentenceRegex) || [];

  const validSentences = matchedSentences.filter(
    (sentence: string) =>
      sentence.trim().length > 0 && !isAbbreviationSentence(sentence)
  );

  return validSentences.length;
};

export const handleWordsCount = (text: string, settings: Settings): number => {
  const trimmedText = text.trim();
  const allWords = (trimmedText.match(/\b[\w'-]+\b/g) || []) as string[];

  let wordsToCount = allWords;

  if (settings.ignoreShortSentences) {
    wordsToCount = wordsToCount.filter((word: string) => word.length <= 3);
  }

  if (settings.considerAbbreviations) {
    const knownAbbreviations = new Set([
      "Dr.",
      "Sr.",
      "Sra.",
      "Prof.",
      "etc.",
      "E.g.",
      "I.e.",
    ]);
    wordsToCount = wordsToCount.filter(
      (word: string) => knownAbbreviations.has(word) || word.length > 2
    );
  }

  if (settings.wordsWithHyphens) {
    wordsToCount = wordsToCount.filter((word: string) => word.includes("-"));
  }

  if (settings.ignoreNumbersAsWords) {
    wordsToCount = wordsToCount.filter((word: string) => /\d+/.test(word));
  }

  if (settings.ignoreSpecialCharactersAsWords) {
    wordsToCount = wordsToCount.filter((word: string) =>
      /^[a-zA-Z0-9]+$/.test(word)
    );
  }

  if (settings.ignoreUppercaseAsWords) {
    wordsToCount = wordsToCount.filter(
      (word: string) => word !== word.toUpperCase()
    );
  }

  if (settings.ignoreLowercaseAsWords) {
    wordsToCount = wordsToCount.filter(
      (word: string) => word !== word.toLowerCase()
    );
  }

  return wordsToCount.length;
};

export const handleTotalCharacters = (
  text: string,
  settings: Settings
): number => {
  let trimmedText = text.trim();
  if (settings.removeSpaces) {
    trimmedText = trimmedText.replace(/\s+/g, "");
  }

  if (settings.removeSpecialCharacters) {
    trimmedText = trimmedText.replace(/[^a-zA-Z0-9]/g, "");
  }
  if (settings.removeNumbers) {
    trimmedText = trimmedText.replace(/\d/g, "");
  }
  if (settings.removeUppercase) {
    trimmedText = trimmedText.replace(/[A-Z]/g, "");
  }
  if (settings.removeLowercase) {
    trimmedText = trimmedText.replace(/[a-z]/g, "");
  }
  if (settings.wordsWithHyphens) {
    trimmedText = trimmedText.replace(/-/g, "");
  }
  if (settings.ignoreNumbersAsWords) {
    trimmedText = trimmedText.replace(/\d+/g, "");
  }
  if (settings.ignoreSpecialCharactersAsWords) {
    trimmedText = trimmedText.replace(/[^a-zA-Z0-9]/g, "");
  }
  return trimmedText.length;
};

export const handleLetterDensity = (
  text: string
): { [key: string]: number } => {
  const countLetter: { [key: string]: number } = {};

  const cleanedText = text.toLowerCase().replace(/[^a-z]/g, "");

  for (const letter of cleanedText) {
    countLetter[letter] = (countLetter[letter] || 0) + 1;
  }

  return countLetter;
};

export const handleLetterDensityPercentage = (
  text: string
): { [key: string]: number } => {
  const countLetter = handleLetterDensity(text);
  const totalLetters = Object.values(countLetter).reduce((a, b) => a + b, 0);
  const letterDensity = Object.fromEntries(
    Object.entries(countLetter).map(([letter, count]) => [
      letter,
      (count / totalLetters) * 100,
    ])
  );
  return letterDensity;
};

export const handleWordDensity = (text: string): { [key: string]: number } => {
  if (!text || text.trim() === "") {
    return {};
  }

  const words = text.toLowerCase().match(/\b[\wÀ-ÿ'-]+\b/g) || [];
  return words.reduce((acc: { [key: string]: number }, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});
};

export const handleWordsDensityPercentage = (
  text: string,
  decimals: number = 2
): { [key: string]: number } => {
  const wordCounts = handleWordDensity(text);
  const totalWords = Object.values(wordCounts).reduce((a, b) => a + b, 0);

  if (totalWords === 0) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(wordCounts).map(([word, count]) => [
      word,
      Number(((count / totalWords) * 100).toFixed(decimals)),
    ])
  );
};

export const handleSetenceDensity = (
  text: string
): { [key: string]: number } => {
  const sentences = text.toLowerCase().match(/[^.!?]+[.!?]+/g) || [];
  return sentences.reduce((acc: { [key: string]: number }, sentence) => {
    acc[sentence.trim()] = (acc[sentence.trim()] || 0) + 1;
    return acc;
  }, {});
};

export const handleSetenceDensityPercentage = (
  text: string,
  decimals: number = 2
): { [key: string]: number } => {
  const sentenceCounts = handleSetenceDensity(text);
  const totalSentences = Object.values(sentenceCounts).reduce(
    (a, b) => a + b,
    0
  );

  if (totalSentences === 0) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(sentenceCounts).map(([sentence, count]) => [
      sentence,
      Number(((count / totalSentences) * 100).toFixed(decimals)),
    ])
  );
};

export const handleParagraphsCount = (text: string): number => {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  return paragraphs.length;
};

export const averageWordPerParagraph = (text: string): number => {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  if (paragraphs.length === 0) return 0;

  const totalWords = paragraphs.reduce((sum, paragraph) => {
    const words = paragraph.match(/\b[\wÀ-ÿ'-]+\b/g);
    return sum + (words ? words.length : 0);
  }, 0);

  return totalWords / paragraphs.length;
};

export const averageWordPerSentence = (text: string): number => {
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (sentences.length === 0) return 0;

  const totalWords = sentences.reduce((sum, sentence) => {
    const words = sentence.match(/\b[\wÀ-ÿ'-]+\b/g);
    return sum + (words ? words.length : 0);
  }, 0);

  return totalWords / sentences.length;
};

export const timeEstimatedOfReadingFunction = (
  text: string,
  timeMeasure: "minutes" | "seconds" | "hours"
): number => {
  const words = text.match(/\b[\wÀ-ÿ'-]+\b/g) || [];
  const totalWords = words.length;
  const averageWordsPerMinute = 200;
  const timeInMinutes = totalWords / averageWordsPerMinute;

  switch (timeMeasure) {
    case "seconds":
      return timeInMinutes * 60;
    case "hours":
      return timeInMinutes / 60;
    default:
      return timeInMinutes;
  }
};
