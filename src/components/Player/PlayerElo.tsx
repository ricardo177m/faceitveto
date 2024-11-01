"use client";

import React, { useEffect, useRef } from "react";

import { Player } from "@/types/player";
import { SkillGroupMapping } from "@/types/skills";

import Level from "../Level";

interface PlayerEloProps {
  player: Player;
  skillGroups: SkillGroupMapping[];
}

export default function PlayerEloProgression({
  player,
  skillGroups,
}: PlayerEloProps) {
  const ref = useRef<HTMLDivElement>(null);

  const cs2 =
    player.games && player.games.cs2
      ? {
          level: player.games.cs2.skill_level,
          elo: player.games.cs2.faceit_elo,
        }
      : {
          level: 0,
          elo: 0,
        };

  const size10 = 150;
  const min = skillGroups[0].min;
  const max = skillGroups[skillGroups.length - 2].max + size10;

  const progress = !cs2.elo
    ? 0
    : cs2.elo >= max
      ? 1
      : (cs2.elo - min) / (max - min);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        left: progress * ref.current.scrollWidth - ref.current.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [ref, progress]);

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Elo Progress</h2>
      <div
        ref={ref}
        className="overflow-x-auto pb-1 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-600 scrollbar-thumb-rounded-xl scrollbar-h-1"
      >
        <div className="flex min-w-[48rem] flex-col">
          <div className="flex flex-row [&>div]:border-r [&>div]:border-r-dark-800 last:[&>div]:border-r-0">
            {skillGroups.map((s) => {
              const diff = s.skill_level === 10 ? size10 : s.max - s.min + 1;
              const width = (diff / (max - min)) * 100 + "%";

              return (
                <div
                  className="flex flex-col items-center gap-2 py-4 text-center"
                  style={{ width }}
                  key={s.skill_level}
                >
                  <Level level={s.skill_level} className="size-8" />
                  <span className="text-xs text-dark-900">
                    {s.skill_level === 10 ? `${s.min}+` : `${s.min} - ${s.max}`}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="h-1 bg-dark-700" title={cs2.elo + " elo"}>
            <div
              className="h-1 bg-primary"
              style={{ width: progress * 100 + "%" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
