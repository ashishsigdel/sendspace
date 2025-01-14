import Content from "@/models/content";
import Session from "@/models/session";
import syncDatabase from "@/utils/dbSync";
import { comparePassword } from "@/utils/password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await syncDatabase();

  try {
    const pathParts = req.nextUrl.pathname.split("/");
    const sessionId = pathParts[pathParts.length - 1];

    if (!sessionId) {
      return NextResponse.json(
        { message: "Invalid request. sessionId missing." },
        { status: 400 }
      );
    }

    const session = await Session.findOne({ where: { sessionId } });
    if (!session) {
      return NextResponse.json(
        { message: "Session not found." },
        { status: 404 }
      );
    }

    let isPasswordValid = true;
    let validationMessage = null;

    if (session.visibility === "private") {
      const { password } = await req.json();
      if (!password) {
        isPasswordValid = false;
        validationMessage = "Password required.";
      } else {
        isPasswordValid = await comparePassword(password, session.password);
        if (!isPasswordValid) {
          validationMessage = "Invalid password.";
        }
      }
    }

    const responseData = {
      session: {
        id: session.id,
        sessionId: session.sessionId,
        visibility: session.visibility,
        createdAt: session.createdAt,
      },
      content: isPasswordValid
        ? {
            status: "ok",
            data: await Content.findAll({
              where: { sessionId: session.id },
              attributes: ["id", "sessionId", "text"],
            }),
          }
        : {
            status: validationMessage,
            data: null,
          },
    };

    return NextResponse.json({
      message: isPasswordValid ? "Fetched data" : "Password validation failed",
      data: responseData,
    });
  } catch (error: any) {
    console.error("Error fetching session data:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing your request.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
