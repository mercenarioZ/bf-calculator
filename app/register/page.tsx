"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { SessionDocument } from "../models/Session";
import toast from "react-hot-toast";

const Register = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await axios.get("/api/check");

        console.log(data);

        setSessions(data);
      } catch (error) {
        console.log("failed to fetch sessions: ", error);
        toast.error("Something went wrong when fetching sessions");
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="pt-20 p-2">
        <div className="flex justify-center">
          <div>
            {sessions.map((session: SessionDocument) => {
              const date = new Date(session.date);
              const formattedDate = date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div
                  className="rounded border p-4 border-slate-500"
                  key={session.name}
                >
                  <ul>
                    <li className="text-xl font-semibold pb-4">
                      {session.name}
                    </li>
                    <li>Hourly rates: {session.hourlyRates}</li>
                    <li>Total participants: {session.participants.length}</li>
                    <li className="pt-4 text-sm opacity-60">
                      Created at: <span className="font-semibold">{formattedDate}</span>
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
