import { Player } from "@/types/player";

import TeamPlayer from "./TeamPlayer";
import TeamPlayerSkeleton from "./TeamPlayerSkeleton";

interface TeamProps {
  players: Player[];
  isLoadingPlayer: boolean;
  team: Player[];
  setTeam: React.Dispatch<React.SetStateAction<Player[]>>;
}

export default function Team({
  players,
  isLoadingPlayer,
  team,
  setTeam,
}: TeamProps) {
  return (
    <div className="my-8 flex flex-col justify-center gap-4 md:flex-row">
      {players.map((player) => {
        return (
          <TeamPlayer
            key={player.id}
            player={player}
            handleRemove={() => {
              if (team.length < 2) return;
              setTeam((t) => t.filter((p) => p.id !== player.id));
            }}
          />
        );
      })}
      {isLoadingPlayer && <TeamPlayerSkeleton />}
    </div>
  );
}
