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
    const sessionExists = await Session.findOne({
      where: { sessionId },
    });

    if (!sessionExists) {
      return NextResponse.json({ message: "Link not found." }, { status: 400 });
    }

    if (sessionExists.visibility === "private") {
      const { password } = await req.json();
      if (!password) {
        return NextResponse.json(
          { message: "Password is required." },
          { status: 400 }
        );
      }

      const checkPassword = await comparePassword(
        password,
        sessionExists.password
      );

      if (!checkPassword) {
        return NextResponse.json(
          { message: "Invalid password." },
          { status: 400 }
        );
      }
    }

    let responseData = {
      session: await Session.findOne({
        where: { sessionId },
        attributes: ["id", "sessionId", "visibility", "createdAt"],
      }),
      content: await Content.findAll({
        where: {
          sessionId: sessionExists.id,
        },
        attributes: ["id", "sessionId", "text"],
      }),
    };

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
