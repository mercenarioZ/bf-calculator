import { Participant } from "@/app/types";

interface RequestBody {
  participants: Participant[];
  hourlyRates: number[];
  numbersOfShuttle: number;
  shuttlePrice: number;
  date: string; // in ISO format
}

/*
  POST /api/fee-calculate
  {
    "participants": [
      { "name": "John Doe", "timesPlayed": 60, }
      { "name": "Jane Doe", "timesPlayed": 120, }
      { "name": "John Dee", "timesPlayed": 120, }
      { "name": "Jane Dee", "timesPlayed": 90, }
    ],
    "hourlyRates": [50, 50],
    "numbersOfShuttle": 5,
    "shuttlePrice": 25
  }
*/

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const {
    participants,
    hourlyRates,
    numbersOfShuttle,
    shuttlePrice,
  } = body;
  const date = new Date(body.date);

  if (
    !participants ||
    !hourlyRates ||
    !numbersOfShuttle ||
    !shuttlePrice ||
    !date
  ) {
    return new Response("Invalid input", { status: 400 });
  }
}
