import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const cookieName = "ai-usage-count";
  const maxUses = 15;

  let usageCount = parseInt(req.cookies.get(cookieName)?.value || "0", 10);

  if (
    (url.pathname === "/api/analyze-text" && usageCount >= maxUses) ||
    (url.pathname === "/api/ai-improve-text" && usageCount >= maxUses)
  ) {
    return NextResponse.json(
      { error: "Limit of uses reached" },
      { status: 429 }
    );
  }

  if (
    url.pathname === "/api/analyze-text" ||
    url.pathname === "/api/ai-improve-text"
  ) {
    usageCount += 1;
    const response = NextResponse.next();
    response.cookies.set(cookieName, usageCount.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400,
      path: "/",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/analyze-text", "/api/ai-improve-text", "/api/send-feedback"],
};
