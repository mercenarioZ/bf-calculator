"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { SessionDocument } from "../models/Session";

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
            {sessions.map((session: SessionDocument) => (
              <div className="rounded border p-4 border-slate-500" key={session.name}>
                <ul>
                  <li className="text-xl font-semibold pb-4">Session 1 - 19h - 21h - San Binh Thang</li>
                  <li>{session.hourlyRates}</li>
                  <li>{session.date}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
