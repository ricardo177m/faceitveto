import Link from "next/link";

import { Player } from "@/types/player";
import { fetchPlayerState } from "@/lib/player";

import FaceitIcon from "./icons/faceit";

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
      className="inline-flex cursor-pointer items-center gap-4 rounded-lg bg-primary px-6 py-4"
    >
      <FaceitIcon className="w-6" />
      <h1 className="font-bold">Playing right now!</h1>
    </Link>
  );
}
