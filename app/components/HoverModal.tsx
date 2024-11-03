import React from "react";
import { Participant } from "../types";

interface HoverModalProps {
  participant: Participant;
}

const HoverModal: React.FC<HoverModalProps> = ({ participant }) => {
  return (
    <div
      className="fixed p-8 text-white rounded-lg opacity-80 top-[35vh] md:right-[10vw] right-[12vw] bg-gray-700 shadow-lg"
      style={{
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      <h1 className="font-semibold text-2xl pb-4">{participant.name}</h1>
      <p>
        Total: {participant.totalFee?.toFixed(2)} (hourly fee:{" "}
        {participant.hourlyFee?.toFixed(2)} + shuttle fee:{" "}
        {participant.shuttleFee?.toFixed(2)})
      </p>
      <p>Time played: {participant.minutesPlayed} mins</p>
    </div>
  );
};

export default HoverModal;
