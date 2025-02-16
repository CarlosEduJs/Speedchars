import { Settings } from "@/components/generate-improve-provider";

export const formattedSettingsPrompt = (settings: Settings) => {
  const instructions = [];

  if (settings.textTone.value) {
    instructions.push(
      `- The text should have a tone **${settings.textTone.value}**.`
    );
  }

  if (settings.textObjective.value) {
    instructions.push(
      `- The text should have an objective **${settings.textObjective.value}**.`
    );
  }

  if (settings.textGrammerAndStyle.values.length > 0) {
    instructions.push(
      `- Apply grammar styles: ${settings.textGrammerAndStyle.values.join(
        ", "
      )}.`
    );
  }

  if (settings.textComplexity.value) {
    instructions.push(
      `- The text should have a level of complexity **${settings.textComplexity.value}**.`
    );
  }

  if (settings.textAudienceFiltering.value) {
    instructions.push(
      `- The text should be directed to the audience **${settings.textAudienceFiltering.value}**.`
    );
  }

  if (settings.textDuration.value) {
    instructions.push(
      `- The text is duration is **${settings.textDuration.value}**.`
    );
  }

  if (settings.regionalism.value) {
    instructions.push(
      `- The text should have a regional tone **${settings.regionalism.value}**.`
    );
  }

  if (settings.textLayoutAndFormatting.values.length > 0) {
    instructions.push(
      `- Add formatting styles: ${settings.textLayoutAndFormatting.values.join(
        ", "
      )}.`
    );
  }

  return instructions.join("\n");
};
