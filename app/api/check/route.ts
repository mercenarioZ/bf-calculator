import connectDb from "@/app/libs/db";
import Session from "@/app/models/Session";
import { NextResponse } from "next/server";
import ParticipantModel from "@/app/models/Participant";

export async function GET() {
  await connectDb();

  // get all sessions
  try {
    const allSessions = await Session.find({}).populate({
      path: "participants",
      model: ParticipantModel,
    });

    return NextResponse.json(allSessions, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.log("something went wrong: ", error);
  }
}
