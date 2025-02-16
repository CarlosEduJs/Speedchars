import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    const moderationResponse = await fetch("https://api.openai.com/v1/moderations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },    
      body: JSON.stringify({
        input: text,
      }),
    });

    const data = await moderationResponse.json();

    const flagged = data.results?.[0]?.flagged || false;

    return NextResponse.json({ flagged });
  } catch (error) {
    console.error("Error in moderation API call:", error);
    return NextResponse.json(
      { error: "Failed to moderate text" },
      { status: 500 }
    );
  }
}
