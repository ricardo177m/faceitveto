"use client";

import { useCallback, useEffect, useState } from "react";

import { env } from "@/env";

import LevelElo from "../LevelElo";
import PlayerAvatar from "../PlayerAvatar";
import RowItem from "../ui/RowItem";
import MatchButton from "./MatchButton";
import { MatchData } from "./MatchData";

interface PrematchProps {
  matchId: string;
  faction: number;
}

export default function Prematch({ matchId, faction }: PrematchProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [selectedRound, setSelectedRound] = useState<number>(0);

  const [prematchPost, setPrematchPost] = useState<PrematchPost | null>(null);
  const [meta, setMeta] = useState<Map<string, MatchMeta>>(new Map());
  const [analysis, setAnalysis] = useState<Map<string, MatchData>>(new Map());

  const fetchPrematch = useCallback(async () => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/prematch/${matchId}`, {
      method: "POST",
      body: JSON.stringify({ faction }),
    });
    const data = await res.json();
    if (res.status !== 200) {
      setIsLoading(false);
      return setError(data.error);
    }

    setPrematchPost(data);
    setIsLoading(false);
  }, [matchId, faction]);

  const fetchMatchData = useCallback(async (matchId: string, round: string) => {
    const url = new URL(
      `${env.NEXT_PUBLIC_PARSER_URL}/matches/${matchId}/${round}`
    );
    const res = await fetch(url, { credentials: "include" });
    const data = await res.json();
    setAnalysis((prev) => new Map(prev.set(matchId, data)));
  }, []);

  useEffect(() => {
    fetchPrematch();
  }, [fetchPrematch]);

  useEffect(() => {
    if (!prematchPost) return;

    const { matchIds } = prematchPost;
    if (matchIds.length === 0) return;

    const url = new URL(`${env.NEXT_PUBLIC_PARSER_URL}/events`);
    matchIds.forEach((id) => url.searchParams.append("matchIds[]", id));
    const eventSource = new EventSource(url, {
      withCredentials: true,
    });
    eventSource.onmessage = (event) => {
      try {
        const p1 = event.data.split("\t");
        if (p1.length !== 2) return;
        const matchId = p1[0].split(":").pop() as string;
        if (!matchId) return;
        const meta = JSON.parse(p1[1]) as MatchMeta;
        setMeta((prev) => new Map(prev.set(matchId, meta)));
        if (meta.processed) {
          setSelectedMatch((s) => {
            if (s) return s;
            return matchId;
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    return () => {
      eventSource.close();
    };
  }, [prematchPost]);

  useEffect(() => {
    if (!selectedMatch) return;
    const round = meta.get(selectedMatch)?.rounds[selectedRound]!.round;
    if (round) fetchMatchData(selectedMatch, round.toString());
  }, [selectedMatch, selectedRound]);

  const matchDetails = prematchPost?.teamstats.matches.find(
    (m) => m.match_id === selectedMatch
  ) as DetailedMatch;

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
    <>
      {prematchPost && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Players in the same premade</h2>
          <div className="my-4 flex flex-col gap-4 md:flex-row">
            <div className="flex w-full flex-col gap-1 md:w-2/3">
              {prematchPost.premade.map((p) => (
                <RowItem
                  key={p.id}
                  href={`/player/${p.nickname}`}
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
        </div>
      )}
      {isLoading ? (
        <p>Loading matches data...</p>
      ) : error ? (
        <p>⚠️ Error: {error}</p>
      ) : (
        prematchPost && (
          <>
            <div className="mb-4 flex flex-row flex-wrap gap-4">
              {prematchPost.matchIds.length > 0 ? (
                prematchPost.teamstats.matches.map((m, i) => {
                  return (
                    <MatchButton
                      key={m.match_id}
                      match={m}
                      meta={meta.get(m.match_id)}
                      isSelected={selectedMatch === m.match_id}
                      setSelected={setSelectedMatch}
                      i={i}
                    />
                  );
                })
              ) : (
                <p>No matches found.</p>
              )}
            </div>
            {selectedMatch && (
              <MatchData
                meta={meta.get(selectedMatch)}
                matchAnalysis={analysis.get(selectedMatch)}
                premade={prematchPost.premade}
                matchDetails={matchDetails}
                selectedRound={selectedRound}
                setSelectedRound={setSelectedRound}
              />
            )}
          </>
        )
      )}
    </>
  );
}
