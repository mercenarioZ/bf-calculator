import connectDb from "@/app/libs/db";
import ParticipantModel from "@/app/models/Participant";
import Session from "@/app/models/Session";
import { Participant } from "@/app/types";
import { NextResponse } from "next/server";

interface RequestBody {
  name?: string;
  participants: Participant[];
  hourlyRates: number[];
  shuttlePrice: number;
}

/*
  POST /api/fee-calculate
  {
    "participants": [
      { "name": "John Doe", "minutesPlayed": 60, }
      { "name": "Jane Doe", "minutesPlayed": 120, }
      { "name": "John Dee", "minutesPlayed": 120, }
      { "name": "Jane Dee", "minutesPlayed": 90, }
    ],
    "hourlyRates": [50, 50],
    "shuttlePrice": 240,
    "name": "Session 1",
  }
*/

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const { participants, hourlyRates, shuttlePrice, name } = body;

  // validate the input
  if (
    !participants ||
    !hourlyRates ||
    !shuttlePrice ||
    hourlyRates.length < 1
  ) {
    return new Response("Invalid input", { status: 400 });
  }

  // calculate the total minutes played from all participants
  const totalMinutesOfAllParticipants = participants.reduce(
    (acc, participant) => acc + participant.minutesPlayed,
    0
  );

  console.log(
    "Total minutes of all participants: ",
    totalMinutesOfAllParticipants
  );

  const maxPossibleMinutes = hourlyRates.length * 60 * participants.length;
  const isLastHourException: boolean =
    totalMinutesOfAllParticipants < maxPossibleMinutes;

  const calculateCourtFee = (
    hour: number,
    participants: Participant[],
    hourlyRate: number
  ) => {
    const totalMinutesInHour = participants.reduce((sum, p) => {
      const minutesThisHour = Math.min(
        60,
        Math.max(p.minutesPlayed - hour * 60, 0)
      );

      return sum + minutesThisHour;
    }, 0);

    const sortedMinutes = participants
      .map((p) => {
        const minutesThisHour = Math.min(
          60,
          Math.max(p.minutesPlayed - hour * 60, 0)
        );

        return minutesThisHour;
      })
      .sort((a, b) => b - a);

    return participants.map((p, index) => {
      const minutesThisHour = Math.min(
        60,
        Math.max(p.minutesPlayed - hour * 60, 0)
      );

      console.log(`Participant ${index}: `, minutesThisHour);

      return {
        name: p.name,
        hourlyFee: isLastHourException
          ? (minutesThisHour / totalMinutesInHour) *
              ((sortedMinutes[0] / 60) * hourlyRate) || 0
          : (minutesThisHour / totalMinutesInHour) * hourlyRate,
      };
    });
  };

  // initialize fees array
  const participantsFee = participants.map((p) => ({
    name: p.name,
    hourlyFee: 0,
    shuttleFee: 0,
    totalFee: 0,
    minutesPlayed: p.minutesPlayed,
  }));

  hourlyRates.forEach((rate, hour) => {
    const hourlyFees = calculateCourtFee(hour, participants, rate);
    hourlyFees.forEach((hourlyFee) => {
      const participant = participantsFee.find(
        (p) => p.name === hourlyFee.name
      );

      if (participant) {
        participant.hourlyFee += hourlyFee.hourlyFee;
      }
    });
  });

  // calculate shuttle fee
  participantsFee.forEach((p) => {
    p.shuttleFee =
      (p.minutesPlayed / totalMinutesOfAllParticipants) * shuttlePrice;
    p.totalFee = p.hourlyFee + p.shuttleFee;
  });

  // update the database
  try {
    await connectDb();

    // save each participant to the participants collection
    const participantIds = await Promise.all(
      participantsFee.map(async (p) => {
        const newParticipant = new ParticipantModel({
          name: p.name,
          minutesPlayed: p.minutesPlayed,
          hourlyFee: p.hourlyFee,
          shuttleFee: p.shuttleFee,
          totalFee: p.totalFee,
        });

        const savedParticipant = await newParticipant.save();
        console.log(savedParticipant);
        return savedParticipant._id;
      })
    );

    // create new session with reference to the participants
    const newSession = new Session({
      name: name || "New Session",
      date: new Date().toISOString(),
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      participants: participantIds,
      hourlyRates,
      shuttleFee: shuttlePrice,
    });

    // save the session to the database
    const savedSession = await newSession.save();
    console.log(savedSession);

    // return the saved session to the client
    return NextResponse.json(savedSession, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error creating session", error },
      { status: 500 }
    );
  }
}
