import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import moment from "moment";
import Countdown from "react-countdown";
import { FaClock, FaExternalLinkAlt } from "react-icons/fa";

import { CuratedMatch } from "@/types/curated-match";
import { Democracy } from "@/types/democracy";
import { MatchStats } from "@/types/match-stats";
import { isPlayerFaction } from "@/lib/match";
import { useSession } from "@/hooks";
import EdgeContext from "@/contexts/EdgeContext";
import Checkbox from "@/components/ui/Checkbox";
import { formatDateTime } from "@/utils/dateFormat";

import Elo from "../icons/Elo";
import NextImageWithFallback from "../ui/NextImageWithFallback";

interface MatchHeaderProps {
  match: CuratedMatch;
  stats: MatchStats[];
  democracy?: Democracy;
  showMostRecent: boolean;
  setShowMostRecent: Dispatch<SetStateAction<boolean>>;
}

export default function MatchHeader({
  match,
  stats,
  democracy,
  showMostRecent,
  setShowMostRecent,
}: MatchHeaderProps) {
  const [countdown, setCountdown] = useState<number | undefined>();

  const { version } = useContext(EdgeContext);

  const session = useSession();

  const userFaction = !session.user
    ? null
    : isPlayerFaction(match.teams.faction1, session.user.id)
      ? "faction1"
      : isPlayerFaction(match.teams.faction2, session.user.id)
        ? "faction2"
        : null;

  const userVoting = democracy?.conditions?.turn_to_vote === userFaction;

  const isVotingTime =
    democracy && democracy.conditions && democracy.conditions.round !== 0;

  const isMapVoting =
    democracy &&
    democracy.conditions &&
    democracy.tickets[democracy.conditions.ticket].entity_type === "map";

  const teamNames = {
    faction1: match.teams.faction1.name,
    faction2: match.teams.faction2.name,
  };

  useEffect(() => {
    if (democracy?.conditions?.time_left_to_vote)
      setCountdown(Date.now() + democracy.conditions.time_left_to_vote);
  }, [democracy]);

  return (
    <div className="flex flex-col px-4">
      <div className="flex flex-col items-center gap-1 md:flex-row md:gap-6">
        <div className="py-2 text-3xl">
          <span>{match.teams.faction1.name}</span>
          {stats.length > 0 && match.bestOf === 1 ? (
            <span className="mx-3">
              <span
                className={
                  stats[0].teams[0].i17 === "1"
                    ? "text-green-500"
                    : "text-dark-800"
                }
              >
                {stats[0].teams[0].c5}
              </span>
              <span className="text-dark-700"> / </span>
              <span
                className={
                  stats[0].teams[1].i17 === "1"
                    ? "text-green-500"
                    : "text-dark-800"
                }
              >
                {stats[0].teams[1].c5}
              </span>
            </span>
          ) : (
            <span className="mx-2 text-dark-700"> / </span>
          )}
          <span>{match.teams.faction2.name}</span>
        </div>
        <a
          href={`https://www.faceit.com/en/cs2/room/${match.id}`}
          target="_blank"
          className="text-xs transition-colors hover:text-primary"
          title="Go to match room"
          rel="noreferrer"
        >
          <FaExternalLinkAlt />
        </a>
      </div>
      <div className="flex flex-row flex-wrap items-center gap-6 py-4 text-2xl sm:gap-10">
        {match.mapPicks !== undefined ? (
          <div className="inline-flex items-center gap-4">
            <NextImageWithFallback
              src={`/assets/map-icons/${match.mapPicks?.[0].id}.svg`}
              fallbackSrc="/assets/map-icons/unknown.svg"
              width="40"
              height="40"
              alt="Map logo"
            />
            <span>{match.mapPicks?.[0].name}</span>
          </div>
        ) : null}
        <div className="inline-flex items-center gap-4">
          <span
            className={`size-3 rounded-full ${
              ["VOTING", "CONFIGURING"].includes(match.state.toString())
                ? "bg-yellow-400"
                : ["READY", "ONGOING"].includes(match.state.toString())
                  ? "bg-green-500"
                  : "bg-gray-600"
            } ${
              ["FINISHED", "CANCELLED"].includes(match.state.toString())
                ? ""
                : "blinking"
            }`}
          ></span>
          {match.state.toString() === "VOTING" ? (
            democracy && democracy.conditions && isVotingTime && isMapVoting ? (
              <div className="inline-flex items-center gap-4">
                <p className={userVoting ? "text-yellow-500" : ""}>
                  {userVoting
                    ? "Your turn to vote"
                    : `${teamNames[democracy?.conditions?.turn_to_vote]} is voting`}
                </p>
                <p className="text-dark-900">
                  {countdown && (
                    <Countdown
                      date={countdown}
                      renderer={(p) => <span>{p.seconds}</span>}
                    />
                  )}
                </p>
              </div>
            ) : (
              <div className="inline-flex items-center gap-4">
                <p>Voting server location</p>
              </div>
            )
          ) : (
            <p className="mr-4 capitalize">
              {match.state.toString().toLowerCase()}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-y-2 pb-1 text-sm">
        {match.finishedAt && (
          <div
            title={formatDateTime(match.finishedAt)}
            className="mx-2 inline-flex items-center gap-2"
            suppressHydrationWarning // client & server timezones may differ
          >
            <FaClock className="text-dark-800" />
            <span>{moment(match.finishedAt).fromNow()}</span>
          </div>
        )}
        <div
          className="mx-2 inline-flex items-center gap-2"
          title="Match Average Elo"
        >
          <Elo className="w-4 fill-dark-800" />
          <span>{Math.round(match.matchRanking)}</span>
        </div>
        <Checkbox
          isChecked={showMostRecent}
          setIsChecked={setShowMostRecent}
          label="Most Recent Matches"
          className="mx-2 inline-flex items-center gap-2"
        />
        <span className="ml-auto text-xs text-dark-600">{version}</span>
      </div>
    </div>
  );
}
