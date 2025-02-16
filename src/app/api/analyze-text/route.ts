import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, model, language } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (text.length > 50000) {
      return NextResponse.json({ error: "Text is too long" }, { status: 400 });
    }

    const isEnglish = language === "en";
    
    const systemContent = isEnglish
      ? "You are an advanced text analyzer specializing in providing detailed insights into textual content. Your goal is to deliver precise and structured analysis."
      : "Você é um analisador de textos avançado, especializado em fornecer insights detalhados sobre o conteúdo textual. Seu objetivo é oferecer uma análise precisa e estruturada.";
 
    const userContent = isEnglish
      ? `Analyze the following text and provide a detailed report including:
        1. Total word count, sentence count, and character count, including unique word count.
        2. Average word and sentence length, with distribution analysis.
        3. Main topics covered in the text, with a brief description of each.
        4. Overall sentiment analysis (positive, negative, or neutral) with further sentiment breakdown.
        5. A concise summary highlighting key points.
        6. Most frequently used words in the text, along with their frequency.
        7. Most frequently used sentences in the text, along with their frequency.
        8. Longest sentences in the text, with word count.
        9. Shortest sentences in the text, with word count.
        10. Analysis of the most complex sentences in the text, including grammatical structure.
        11. Analysis of the simplest sentences in the text, highlighting clarity and conciseness.
        
        Text to analyze:
        """${text}"""
        `
      : `Analise o seguinte texto e forneça um relatório detalhado, incluindo:
        1. Contagem total de palavras, frases e caracteres, incluindo a contagem de palavras únicas.
        2. Tamanho médio das palavras e frases, com análise da distribuição.
        3. Principais tópicos abordados no texto, com uma breve descrição de cada um.
        4. Análise do sentimento geral do texto (positivo, negativo ou neutro) com uma análise mais aprofundada.
        5. Um resumo conciso destacando os pontos principais.
        6. Palavras mais usadas no texto, junto com suas respectivas frequências.
        7. Frases mais usadas no texto, junto com suas respectivas frequências.
        8. Frases mais longas no texto, com contagem de palavras.
        9. Frases mais curtas no texto, com contagem de palavras.
        10. Análise das frases mais complexas no texto, incluindo a estrutura gramatical.
        11. Análise das frases mais simples no texto, destacando a clareza e a concisão.

        Texto a ser analisado:
        """${text}"""
        `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini",
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      return NextResponse.json(
        { error: errData.error || "Error processing text" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const analysis =
      data.choices?.[0]?.message?.content || "Analysis not available";

    return NextResponse.json({ analysis }, { status: 200 });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json(
      { error: "Error processing text" },
      { status: 500 }
    );
  }
}
