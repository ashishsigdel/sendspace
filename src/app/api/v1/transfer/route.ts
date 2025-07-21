import Content from "@/models/content";
import Session from "@/models/session";
import syncDatabase from "@/utils/dbSync";
import { generateSessionId } from "@/utils/generateSession";
import { hashPassword } from "@/utils/password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await syncDatabase();
  try {
    const body = await req.json();

    const { text, visibility, password } = body;

    if (!text) {
      return NextResponse.json(
        { message: "No content to send" },
        { status: 400 }
      );
    }
    if (!visibility) {
      return NextResponse.json(
        { message: "Must set visibility to 'public' or 'private'" },
        { status: 400 }
      );
    }

    let sessionId;
    let sessionExists;
    do {
      sessionId = generateSessionId(6);
      sessionExists = await Session.findOne({ where: { sessionId } });
    } while (sessionExists);

    let hashedPassword = null;
    if (visibility === "private") {
      if (!password) {
        return NextResponse.json(
          { message: "Password is required for private sessions" },
          { status: 400 }
        );
      }
      hashedPassword = await hashPassword(password);
    }
    const session = await Session.create({
      sessionId,
      visibility,
      password: hashedPassword,
    });

    const content = await Content.create({
      sessionId: session.id,
      text,
    });

    let responseData = {
      sessionId: session.sessionId,
      visibility: session.visibility,
      createdAt: session.createdAt,
    };

    return NextResponse.json({
      message: "Fetched data",
      data: responseData,
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON body", error: error }, { status: 400 });
  }
}
