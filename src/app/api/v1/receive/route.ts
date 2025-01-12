import Session from "@/models/session";
import syncDatabase from "@/utils/dbSync";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await syncDatabase();
  try {
    const body = await req.json();

    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    const sessionExists = await Session.findOne({
      where: { sessionId },
      attributes: ["id", "visibility", "sessionId", "createdAt"],
    });

    if (!sessionExists) {
      return NextResponse.json({ message: "Link not found." }, { status: 400 });
    }

    let responseData = sessionExists;

    return NextResponse.json({
      message: "Fetched data",
      data: responseData,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error happens", error: error },
      { status: 400 }
    );
  }
}
