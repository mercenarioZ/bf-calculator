import { Participant } from "../types";
interface ParticipantsListProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}

const ConvertedParticipantsList: React.FC<ParticipantsListProps> = ({
  participants,
  setParticipants,
}) => {
  const handleSetAllTo = (value: number) => {
    setParticipants((prev) => {
      return prev.map((player) => {
        return {
          ...player,
          minutesPlayed: value,
        };
      });
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <button
        className="rounded-md bg-zinc-800 p-2 w-20 text-white"
        onClick={() => setParticipants([])}
      >
        Clear
      </button>
      <div className="flex items-center gap-2">
        <label htmlFor="setAll">Set all to:</label>
        <input
          onChange={(e) => handleSetAllTo(Number(e.target.value))}
          type="text"
          id="setAll"
          className="text-center text-black rounded-md p-1 border-2 max-w-20"
        />
      </div>

      {participants.map((item, index) => (
        <div
          key={index}
          className="flex rounded-md items-center gap-2 p-2 bg-zinc-800 text-white"
        >
          <div className="w-20 text-wrap pl-3">{item.name}</div>
          <input
            type="text"
            className="w-16 rounded-md py-1 px-2 text-center text-black"
            value={item.minutesPlayed}
            onChange={(e) =>
              setParticipants((prev) => {
                return prev.map((player, index) => {
                  if (index === participants.indexOf(item)) {
                    return {
                      ...player,
                      minutesPlayed: Number(e.target.value),
                    };
                  }
                  return player;
                });
              })
            }
          />
          <span>minute(s)</span>
        </div>
      ))}
    </div>
  );
};

export default ConvertedParticipantsList;
