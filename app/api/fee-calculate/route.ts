import { Participant } from "@/app/types";
import { NextResponse } from "next/server";

interface RequestBody {
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
    "shuttlePrice": 240
  }
*/

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const { participants, hourlyRates, shuttlePrice } = body;

  if (!participants || !hourlyRates || !shuttlePrice) {
    return new Response("Invalid input", { status: 400 });
  }

  // calculate the total minutes played from all participants
  const totalMinutesOfAllParticipants = participants.reduce(
    (acc, participant) => acc + participant.minutesPlayed,
    0
  );

  console.log(totalMinutesOfAllParticipants);

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

    console.log("total minutes in hour: ", totalMinutesInHour);

    return participants.map((p) => {
      const minutesThisHour = Math.min(
        60,
        Math.max(p.minutesPlayed - hour * 60, 0)
      );

      return {
        name: p.name,
        hourlyFee: (minutesThisHour / totalMinutesInHour) * hourlyRate || 0,
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

  return NextResponse.json(participantsFee);
}
