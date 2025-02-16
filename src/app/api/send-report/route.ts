import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Report {
  email: string;
  description: string;
  reportType: string;
  anonymous: boolean;
}

export async function POST(request: Request) {
  try {
    const { email, description, reportType, anonymous }: Report =
      await request.json();

    if (!description || !reportType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (description.length < 50) {
      return NextResponse.json(
        { error: "Description must be at least 50 characters" },
        { status: 400 }
      );
    }

    let userEmail = email;

    if (anonymous || !email) {
      userEmail = "Anonymous";
    }

    if (
      !reportType ||
      !["problem", "suggestion", "request", "other"].includes(
        reportType
      )
    ) {
      return NextResponse.json(
        { error: "Invalid report type" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: sendedReport, error: reportError } = await supabase
      .from("reports")
      .insert({
        email: userEmail,
        description,
        report_type: reportType,
        is_anonymous: anonymous,
      });

    if (reportError) {
      return NextResponse.json({ error: reportError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: "Report received",
      data: sendedReport,
    });
  } catch (error) {
    console.error("Error sending report:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
