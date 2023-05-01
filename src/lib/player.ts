import { faceitConfig } from "@/config/faceit";
import { Player } from "@/types/player";

export async function fetchPlayerById(playerId: string): Promise<Player> {
  const response = await fetch(faceitConfig.user(playerId));
  const data = await response.json();

  return data.payload as Player;
}

export async function fetchPlayerByNickname(nickname: string): Promise<Player> {
  const response = await fetch(faceitConfig.player(nickname));
  const data = await response.json();

  return data.payload as Player;
}
