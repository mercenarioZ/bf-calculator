import { convertStringToArray } from "@/app/utils/script";
import { NextResponse } from "next/server";

interface RequestBody {
  participants: string;
  playTimes: number[];
  hourlyRates: number[];
  numbersOfShuttle: number;
  shuttlePrice: number;
  date: string; // in ISO format
}

/*
  POST /api/fee-calculate
  {
    "participants": "1. John, 2. Jane, 3. Doe",
    "playTimes": [60, 120, 120],
    "hourlyRates": [50, 50],
    "numbersOfShuttle": 5,
    "shuttlePrice": 25
  }
*/

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const {
    participants,
    playTimes,
    hourlyRates,
    numbersOfShuttle,
    shuttlePrice,
  } = body;
  const date = new Date(body.date);

  if (
    !participants ||
    !playTimes ||
    !hourlyRates ||
    !numbersOfShuttle ||
    !shuttlePrice ||
    !date
  ) {
    return new Response("Invalid input", { status: 400 });
  }

  const participantsArray = convertStringToArray(participants);

  if (participantsArray.length !== playTimes.length) {
    return new Response("Invalid input", { status: 400 });
  }

  // Calculate total minutes played by all participants to devide the exact fee
  const totalMinutesPlayed = playTimes.reduce((acc, time) => acc + time, 0);

  const totalShuttleCost = numbersOfShuttle * shuttlePrice;

  const costs = participantsArray.map((participant, index) => {
    const minutesPlayed = playTimes[index];

    let courtCost = 0;
    let remainingTime = 0;

    // calculate the fee for a single participant
    if (minutesPlayed >= 60 * hourlyRates.length) {
      // this can't be a possible case. For example, if a participant plays 180 minutes but there are only 2 hours in total, it's impossible to play 3 hours.
      return new Response("Invalid input", { status: 400 });
    }

    for (let i = 0; i < hourlyRates.length && remainingTime > 0; i++) {
      if (minutesPlayed >= 60) {
        const minutesForAnHour = Math.min(60, minutesPlayed);
        courtCost += 60 * hourlyRates[i];
        remainingTime -= minutesForAnHour;
      }
    }
  });

  return NextResponse.json(
    {
      totalMinutesPlayed,
    },
    { status: 200 }
  );
}
