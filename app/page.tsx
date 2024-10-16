"use client";

import { useEffect, useState } from "react";
import { convertStringToArray } from "./utils/script";
import List from "./components/ConvertedParticipantsList";
import toast from "react-hot-toast";
import { Participant } from "./types";

export default function Home() {
  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);
  const [numberOfShuttle, setNumberOfShuttle] = useState<number | null>(null);

  // debugging
  useEffect(() => {
    console.log(participants);
  }, [participants]);

  return (
    <div className="h-[100vh] bg-zinc-900">
      <nav className="z-20 backdrop-blur-md text-white p-3 fixed w-full border-b bg-zinc-700">
        Badminton Fees Calculator
      </nav>

      <div className="pt-20 text-slate-100 flex items-center justify-center gap-4 px-4">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex gap-2 items-center">
            <label htmlFor="shuttle">Number of shuttle</label>
            <input
              id="shuttle"
              className="text-black rounded-md w-20 p-1"
              type="number"
              value={numberOfShuttle ?? ""}
              onChange={(e) => setNumberOfShuttle(Number(e.target.value))}
            />
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the list of players"
            className="w-96 h-96 p-2 bg-zinc-700 rounded-md text-white"
          />

          <div className="flex gap-2 items-center">
            <label htmlFor="">Total minutes played</label>
            <input
              className="text-black rounded-md p-1"
              type="number"
              value={totalMinutes ?? ""}
              onChange={(e) => setTotalMinutes(Number(e.target.value))}
            />
          </div>

          <form>
            <button
              className="bg-zinc-700 w-44 rounded-md p-2 hover:bg-zinc-800 transition"
              onClick={(e) => {
                e.preventDefault();

                const players = convertStringToArray(input);

                const playersWithMinutes = players.map((player) => {
                  return {
                    name: player,
                    minutesPlayed: totalMinutes ?? 0,
                  };
                });

                setParticipants(playersWithMinutes);
                
                if (players.length === 0) {
                  toast.error("Please enter the list of players");
                } else {
                  toast.success("Players converted successfully");
                }
              }}
            >
              Convert
            </button>
          </form>
        </div>

        {participants.length > 0 && (
          <List participants={participants} setParticipants={setParticipants} />
        )}
      </div>
    </div>
  );
}
