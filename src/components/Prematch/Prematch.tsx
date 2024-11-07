"use client";

import { useCallback, useEffect, useState } from "react";
import { documentId, onSnapshot, query, where } from "firebase/firestore";

import { PrematchPost } from "@/types/prematch";
import { db } from "@/lib/firebase";

import LevelElo from "../LevelElo";
import PlayerAvatar from "../PlayerAvatar";
import Radar from "../Radar/Radar";
import RowItem from "../ui/RowItem";

interface PrematchProps {
  matchId: string;
  faction: number;
}

export default function Prematch({ matchId, faction }: PrematchProps) {
  const [prematchPost, setPrematchPost] = useState<PrematchPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrematch = useCallback(async () => {
    const res = await fetch(`/api/prematch/${matchId}`, {
      method: "POST",
      body: JSON.stringify({ faction }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      setIsLoading(false);
      return setError(data.error);
    }

    setPrematchPost(data);
  }, [matchId]);

  useEffect(() => {
    fetchPrematch();
  }, []);

  useEffect(() => {
    if (!prematchPost) return;

    const { matchIds } = prematchPost;
    // match analysis
    const q = query(db, where(documentId(), "in", matchIds));

    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log("A change occurred", change.doc.data());
      });
    });

    return () => unsub();
  }, [prematchPost]);

  const winrate =
    prematchPost &&
    (prematchPost.teamstats.stats.total === 0
      ? 0
      : Math.round(
          (prematchPost.teamstats.stats.wins /
            prematchPost.teamstats.stats.total) *
            1000
        ) / 10);

  return (
    <section className="my-4">
      {prematchPost && (
        <>
          <h2 className="text-2xl font-bold">Players in the same premade</h2>
          <div className="my-4 flex flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-1 md:w-2/3">
              {prematchPost.premade.map((p) => (
                <RowItem
                  key={p.id}
                  href="/player/[nickname]"
                  as={`/player/${p.nickname}`}
                  className="flex flex-row items-center gap-4 border-l-2 border-gray-600 px-4 py-2"
                >
                  <PlayerAvatar player={p} size={40} />
                  <span className="truncate">{p.nickname}</span>
                  <LevelElo level={p.level} elo={p.elo} className="ml-auto" />
                </RowItem>
              ))}
            </div>
            <div className="h-min w-full bg-dark-400 px-6 py-4 md:w-1/3">
              <h3 className="mb-2 text-xl font-bold">Stats</h3>
              <p className="mb-1">Map: {prematchPost.map}</p>
              <p className="mb-1">
                Total matches: {prematchPost.teamstats.stats.total}
              </p>
              <p className="mb-1">
                Total wins: {prematchPost.teamstats.stats.wins}
              </p>
              <p className="mb-1">
                Win Rate:{" "}
                <span
                  className={
                    winrate && winrate >= 50 ? "text-green-500" : "text-red-600"
                  }
                >
                  {winrate}%
                </span>
              </p>
            </div>
          </div>
        </>
      )}
      {isLoading ? (
        <p>Loading matches data...</p>
      ) : error ? (
        <p>⚠️ Error: {error}</p>
      ) : (
        <Radar map={"de_mirage"} />
      )}
    </section>
  );
}
