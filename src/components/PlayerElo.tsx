import { Player } from "@/types/player";

interface PlayerEloProps {
  player: Player;
}

export default function PlayerElo({ player }: PlayerEloProps) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">CS2 Elo</h2>
    </section>
  );
}
