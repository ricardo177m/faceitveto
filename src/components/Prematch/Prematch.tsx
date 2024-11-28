"use client";

import { useCallback, useEffect, useState } from "react";

import { env } from "@/env";

import PrematchSidebar from "./PrematchSidebar";
import Radar from "./Radar";

interface PrematchProps {
  matchId: string;
  faction: number;
}

export default function Prematch({ matchId, faction }: PrematchProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [selectedRound, setSelectedRound] = useState<number>(0);
  const [showNicknames, setShowNicknames] = useState<boolean>(true);

  const [prematchPost, setPrematchPost] = useState<PrematchPost | null>(null);
  const [meta, setMeta] = useState<Map<string, MatchMeta>>(new Map());
  const [analysis, setAnalysis] = useState<Map<string, MatchData>>(new Map());

  const fetchPrematch = useCallback(async () => {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/prematch/${matchId}`, {
      method: "POST",
      body: JSON.stringify({ faction }),
    });
    const data = await res.json();

    setIsLoading(false);
    if (res.status !== 200) return setError(data.error);
    else setPrematchPost(data);
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
          const coreIds = prematchPost.premade.map((p) => p.gameId);
          const coreTRound = meta.rounds.findIndex((r) =>
            r.teams.T.includes(coreIds[0])
          );
          setSelectedRound(coreTRound && coreTRound !== -1 ? coreTRound : 0);
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
    if (!selectedMatch || selectedRound === -1) return;
    const round = meta.get(selectedMatch)?.rounds[selectedRound]!.round;
    if (round) fetchMatchData(selectedMatch, round.toString());
  }, [selectedMatch, selectedRound]);

  useEffect(() => {
    if (!selectedMatch) return;
  }, [selectedMatch]);

  const matchDetails =
    prematchPost?.teamstats.matches.find((m) => m.match_id === selectedMatch) ??
    null;

  const matchMeta = selectedMatch ? meta.get(selectedMatch) : null;
  const matchAnalysis = selectedMatch ? analysis.get(selectedMatch) : null;

  const gameIds = prematchPost?.premade.map((p) => p.gameId) ?? [];

  return isLoading ? (
    <p>Loading prematch data...</p>
  ) : error ? (
    <p>⚠️ Error: {error}</p>
  ) : (
    prematchPost && (
      <main>
        <div className="mb-8 flex flex-col justify-between gap-2 md:flex-row md:gap-4">
          <PrematchSidebar
            className="md:w-1/6"
            prematchPost={prematchPost}
            meta={meta}
            matchDetails={matchDetails}
            selectedMatchState={[selectedMatch, setSelectedMatch]}
            setSelectedRound={setSelectedRound}
            showNicknamesState={[showNicknames, setShowNicknames]}
          />
          <div className="md:w-5/6">
            {matchMeta && matchMeta.processed ? (
              matchAnalysis && (
                <Radar
                  meta={matchMeta}
                  data={matchAnalysis}
                  coreIds={gameIds}
                  showNicknames={showNicknames}
                  selectedRoundState={[selectedRound, setSelectedRound]}
                  className={"aspect-square w-full border border-gray-600"}
                  key={`${selectedMatch}-${selectedRound}`}
                />
              )
            ) : (
              <p className="my-16 text-center">
                When a match is ready, it will be shown here.
              </p>
            )}
          </div>
        </div>
      </main>
    )
  );
}
