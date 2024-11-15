import connectDb from "@/app/libs/db";
import Session from "@/app/models/Session";
import { NextResponse } from "next/server";
import ParticipantModel from "@/app/models/Participant";

export const dynamic = "force-dynamic";
export async function GET() {
  // get all sessions
  try {
    await connectDb();
    const allSessions = await Session.find({}).populate({
      path: "participants",
      model: ParticipantModel,
    });

    console.log(allSessions);

    return NextResponse.json(allSessions, {
      status: 200,
    });
  } catch (error) {
    console.log("something went wrong: ", error);
  }
}
