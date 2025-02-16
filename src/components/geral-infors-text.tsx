import { useAnalyzeText } from "./analyze-text-provider";
import GenerateImproveBlock from "./generate-improve-block";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export default function GeralInforsText() {
  const { geralInformation } = useAnalyzeText();

  return (
    <Card className="flex flex-col gap-2 my-3 w-full bg-transparent ">
      <CardHeader>
        <h2 className="text-lg font-bold">Geral Information</h2>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Total Words:</p>
          <p className="text-4xl font-bold">{geralInformation.totalWords}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Total Paragraphs:</p>
          <p className="text-4xl font-bold">{geralInformation.totalParagraphs}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Total Sentences:</p>
          <p className="text-4xl font-bold">{geralInformation.totalSentences}</p>
        </div>
      </CardContent>
      <CardFooter>
        <GenerateImproveBlock />
      </CardFooter>
    </Card>
  );
}
