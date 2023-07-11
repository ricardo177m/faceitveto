import Link from "next/link";

import FaceitIcon from "./icons/faceit";
import { fetchPlayerState } from "@/lib/player";
import { Player } from "@/types/player";

interface CurrentMatchLinkProps {
  player: Player;
}

export default async function CurrentMatchLink({
  player,
}: CurrentMatchLinkProps) {
  const state = await fetchPlayerState(player.id);

  if (!state) return null;

  return (
    <Link
      href={`/match/[id]`}
      as={`/match/${state}`}
      className="bg-primary inline-flex items-center gap-4 py-4 px-6 rounded-lg cursor-pointer"
    >
      <FaceitIcon className="w-6" />
      <h1 className="font-bold">Playing right now!</h1>
    </Link>
  );
}
