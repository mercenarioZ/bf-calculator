/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { SessionDocument } from "../models/Session";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import ParticipantsList from "../components/ParticipantsList";

const Register = () => {
  const [sessions, setSessions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] =
    useState<SessionDocument | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await axios.get("/api/check");

        // console.log(data);

        data.sort(
          (a: SessionDocument, b: SessionDocument) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setSessions(data);
      } catch (error) {
        console.log("failed to fetch sessions: ", error);
        toast.error("Something went wrong when fetching sessions");
      }
    };

    fetchSessions();
  }, [sessions]);

  const handleSessionClick = (session: SessionDocument) => {
    setIsModalOpen(true);

    setSelectedSession(session);
  };

  return (
    <div>
      <Navbar />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSession(null);
        }}
      >
        {selectedSession && (
          <div>
            <h2 className="text-2xl font-semibold pb-4 text-center">
              {selectedSession.name}
            </h2>

            <hr />
            <br />

            <div className="text-sm mb-4 opacity-70">
              <ul>
                <li>
                  Hourly rates: {selectedSession.hourlyRates.join(", ")}{" "}
                  (kVND/h)
                </li>

                <li>
                  Total participants: {selectedSession.participants.length}
                </li>

                <li>Shuttle fee: {selectedSession.shuttleFee} (kVND)</li>

                <li>
                  Total fees:{" "}
                  {selectedSession.participants.reduce(
                    (acc, participant: any) => acc + participant.totalFee,
                    0
                  )}{" "}
                  (kVND)
                </li>

                <li>
                  Created at:{" "}
                  {new Date(selectedSession.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg mb-4 font-semibold">Participants</p>

              {/* @ts-expect-error: ParticipantsList component does not have proper type definitions */}
              <ParticipantsList participants={selectedSession.participants} />
            </div>
          </div>
        )}
      </Modal>

      <div className="pt-20 p-2 mx-4">
        <div className="flex justify-center mt-2">
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
            {sessions.map((session: any) => {
              const date = new Date(session.date);
              const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div
                  key={session._id.toString()}
                  className="hover:bg-slate-200/60 transition min-w-8 rounded border p-4 border-slate-500"
                  onClick={() => handleSessionClick(session)}
                >
                  <ul>
                    <li className="text-xl font-semibold pb-4">
                      {session.name}
                    </li>

                    <li>
                      Hourly rates:{" "}
                      {session.hourlyRates.map((rate: any, index: number) => {
                        return <span key={index}>{rate} </span>;
                      })}
                    </li>

                    <li>Total participants: {session.participants.length}</li>

                    <li className="pt-4 text-sm opacity-60">
                      Created at:{" "}
                      <span className="font-semibold">{formattedDate}</span>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
