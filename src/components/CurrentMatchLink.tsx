import Link from "next/link";
import { IoMdArrowForward } from "react-icons/io";

import { Player } from "@/types/player";
import { fetchPlayerState } from "@/lib/player";

import FaceitIcon from "./icons/faceit";

interface CurrentMatchLinkProps {
  player: Player;
  yourMatch?: boolean;
}

export default async function CurrentMatchLink({
  player,
  yourMatch = false,
}: CurrentMatchLinkProps) {
  const state = await fetchPlayerState(player.id);

  if (!state) return null;

  return (
    <Link
      href={`/match/[id]`}
      as={`/match/${state}`}
      className="inline-flex w-full cursor-pointer items-center gap-4 rounded-lg bg-primary px-6 py-4"
    >
      <FaceitIcon className="w-6" />
      <h1 className="font-bold">
        {yourMatch ? "Go to your match" : "Playing right now!"}
      </h1>
      <IoMdArrowForward className="ml-auto text-xl" />
    </Link>
  );
}
