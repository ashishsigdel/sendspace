import { NextRequest, NextResponse } from "next/server";
import Session from "@/models/session";
import syncDatabase from "@/utils/dbSync";

export async function GET(req: NextRequest) {
  syncDatabase();
  const total = await Session.count();
  return NextResponse.json({ messsage: "hello world", totalSession: total });
}
