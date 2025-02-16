import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

interface Feedback {
  email: string;
  feedback: string;
  feedbackType: string;
  typeRating: string;
  anonymous: boolean;
}

export async function POST(request: Request) {
  try {
    const { email, feedback, feedbackType, typeRating, anonymous }: Feedback =
      await request.json();

    if (!feedback || !feedbackType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (feedback.length < 50) {
      return NextResponse.json(
        { error: "Feedback must be at least 50 characters" },
        { status: 400 }
      );
    }

    let userEmail = email;

    if (anonymous || !email) {
      userEmail = "Anonymous";
    }

    if (
      !feedbackType ||
      !["praise", "criticism", "suggestion", "other"].includes(feedbackType)
    ) {
      return NextResponse.json(
        { error: "Invalid feedback type" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: sendedFeedback, error: feedbackError } = await supabase
      .from("feedbacks")
      .insert({
        email: userEmail,
        feedback,
        feedback_type: feedbackType,
        type_rating: typeRating,
        is_anonymous: anonymous,
      });

    if (feedbackError) {
      return NextResponse.json(
        { error: feedbackError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Feedback received",
      data: sendedFeedback,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
