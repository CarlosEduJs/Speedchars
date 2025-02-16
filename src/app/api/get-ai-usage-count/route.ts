import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get("ai-usage-count");
  return NextResponse.json({ count: cookie?.value || 0 });
}

