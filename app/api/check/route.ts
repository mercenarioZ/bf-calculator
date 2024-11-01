import connect from "@/app/libs/db";
import Session from "@/app/models/Session";
import { NextResponse } from "next/server";

export async function GET() {
  await connect();

  // get all sessions
  try {
    const allSessions = await Session.find({});

    return NextResponse.json(allSessions, { status: 200 });
  } catch (error) {
    console.log("something went wrong: ", error);
  }
}
