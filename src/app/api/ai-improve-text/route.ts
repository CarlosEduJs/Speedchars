import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text, model, language, prompt } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    if (text.length > 50000) {
      return NextResponse.json({ error: "Text is too long" }, { status: 400 });
    }

    const isEnglish = language === "en";
    const systemContent = isEnglish
      ? `You are an expert in improving texts. Based on a deep analysis of the text, you should suggest improvements to the text, making it clearer, more objective and effective. At the end, you should provide an improved text, with the improvement suggestions and the improved text. Follow this prompt: ${prompt}`
      : `Você é um especialista em melhorar textos, a partir de uma análise profunda do texto, você deve sugerir melhorias para o texto, de forma a torná-lo mais claro, objetivo e eficaz. No final, você deve fornecer um texto melhorado, com as sugestões de melhoria e o texto melhorado. Siga este prompt: ${prompt}`;

    const userContent = isEnglish
      ? `Text to improve: ${text}`
      : `Texto para melhorar: ${text}`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || "gpt-4o-mini",
        temperature: 0.7,
        max_tokens: 5000,
        stream: true, // Habilita streaming
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch from OpenAI" },
        { status: 500 }
      );
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const cleanedLine = line.replace(/^data: /, "").trim();
              if (cleanedLine === "[DONE]") continue;

              if (cleanedLine) {
                try {
                  const json = JSON.parse(cleanedLine);
                  const content = json.choices[0]?.delta?.content || "";
                  controller.enqueue(
                    new TextEncoder().encode(
                      `data: ${JSON.stringify({ response: content })}\n\n`
                    )
                  );
                } catch (error) {
                  console.error("Error parsing JSON:", error);
                }
              }
            }
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in ai-improve-text route:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 }
    );
  }
}
