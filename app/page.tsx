"use client";

import { useEffect, useState } from "react";
import { convertStringToArray } from "./utils/script";
import toast from "react-hot-toast";
import { Participant } from "./types";
import ConvertedParticipantsList from "./components/ConvertedParticipantsList";
import Navbar from "./components/Navbar";
import axios from "axios";
import Modal from "./components/Modal";

export default function Home() {
  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalMinutes, setTotalMinutes] = useState<number | null>(null);
  const [shuttlePrice, setShuttlePrice] = useState<number | null>(null);
  const [hourlyRates, setHourlyRates] = useState<string | null>(null);

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // debugging
  useEffect(() => {
    console.log({
      participants,
      shuttlePrice,
    });
  }, [participants, shuttlePrice]);

  return (
    <div className="h-[100vh] bg-white">
      <Navbar />

      <div className="pt-20 text-zinc-800 flex items-center justify-center gap-4 px-4">
        <div className="flex flex-col gap-3 items-center">
          <div className="flex gap-4 items-center flex-col">
            <div className="flex gap-2 items-center">
              <label htmlFor="shuttlePrice">Shuttle price</label>
              <input
                id="shuttlePrice"
                className="text-center text-black border-2  rounded-md w-20 p-1"
                type="number"
                value={shuttlePrice ?? ""}
                onChange={(e) => setShuttlePrice(Number(e.target.value))}
              />
              <span>k VND</span>
            </div>

            <div className="flex gap-2 items-center">
              <label htmlFor="hourlyRates">Hourly rates</label>
              <input
                id="hourlyRates"
                className="text-center text-black rounded-md w-20 p-1 border-2"
                type="text"
                value={hourlyRates ?? ""}
                onChange={(e) => setHourlyRates(e.target.value)}
              />
              <span>k VND</span>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the list of participants"
            className="w-80 h-60 p-2 border rounded-md focus:outline-none"
          />

          <div className="flex gap-2 items-center">
            <label htmlFor="">Total minutes played</label>
            <input
              className="text-center text-black rounded-md p-1 w-20 border-2"
              type="number"
              value={totalMinutes ?? ""}
              onChange={(e) => setTotalMinutes(Number(e.target.value))}
            />
            <span>minutes</span>
          </div>

          <form>
            {/* convert button */}
            <button
              className="bg-zinc-700 w-44 rounded-md p-2 text-white hover:bg-zinc-800 transition"
              onClick={(e) => {
                e.preventDefault();

                const players = convertStringToArray(input);

                const ratePerHour = hourlyRates
                  ?.split(",")
                  .map((rate) => Number(rate));

                const playersWithMinutes = players.map((player) => {
                  return {
                    name: player,
                    minutesPlayed:
                      (ratePerHour && ratePerHour.length * 60) || 0,
                  };
                });

                console.log();
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
          <ConvertedParticipantsList
            participants={participants}
            setParticipants={setParticipants}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col pt-4">
        {/* click to send data to /api/fee-calculate */}
        <button
          className="text-white bg-zinc-700 w-44 rounded-md p-2 hover:bg-zinc-800 transition"
          onClick={async () => {
            await axios.post("/api/fee-calculate", {
              participants,
              shuttlePrice,
              hourlyRates: hourlyRates?.split(","),
            });
          }}
        >
          Calculate
        </button>

        <button
          className="text-white"
          onClick={() => setIsModalOpen(true)}
        >
          open modal
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        hello world
      </Modal>
    </div>
  );
}
