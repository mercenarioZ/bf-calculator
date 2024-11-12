"use client";

import React, { useState } from "react";
import { ParticipantDocument } from "../models/Participant";
import HoverModal from "./HoverModal";

const ParticipantsList: React.FC<{ participants: ParticipantDocument[] }> = ({
  participants,
}) => {
  const [hoveredParticipant, setHoveredParticipant] =
    useState<ParticipantDocument | null>(null);

  return (
    <div>
      <div className="relative flex flex-col gap-2">
        {participants.map((participant, index) => (
          <div
            className="pl-3 py-1 border rounded-xl border-gray-300"
            onMouseEnter={() => {
              setHoveredParticipant(participant);
            }}
            onMouseLeave={() => {
              setHoveredParticipant(null);
            }}
            key={index}
          >
            {hoveredParticipant === participant && (
              <HoverModal participant={participant} />
            )}
            {participant.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsList;
