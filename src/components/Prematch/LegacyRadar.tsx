import Image from "next/image";

import { gameUnitsToRadar } from "@/utils/radar";

import C4 from "../icons/C4";
import DeathPos from "../icons/DeathPos";
import Decoy from "../icons/Decoy";
import Flashbang from "../icons/Flashbang";
import HEGrenade from "../icons/HEGrenade";
import Molotov from "../icons/Molotov";
import SmokeGrenade from "../icons/SmokeGrenade";

interface LegacyRadarProps {
  round: MatchAnalysisRound;
  map: string;
}

export default function LegacyRadar({ round, map }: LegacyRadarProps) {
  const { plants, grenades, frags } = round;

  const size = 700;

  return (
    <div className="flex justify-center">
      <div className="relative">
        <Image
          src={`/assets/radars/${map}.png`}
          width={size}
          height={size}
          alt="Radar"
          unoptimized
          className="opacity-75"
        />
        {grenades.map((i, k) => {
          if (i.thrownBy.team !== "T") return null;
          const coords = gameUnitsToRadar(i.pos, map, size);
          if (!coords) return null;

          const icon =
            i.type === "smokegrenade" ? (
              <>
                <div className="absolute left-1/2 top-1/2 -z-10 size-16 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-slate-400 opacity-65"></div>
                <SmokeGrenade
                  size={18}
                  className="text-lime-200 group-hover:size-6"
                />
              </>
            ) : i.type === "flashbang" ? (
              <Flashbang
                size={18}
                className="text-cyan-100 group-hover:size-6"
              />
            ) : i.type === "inferno" ? (
              <>
                <div className="absolute left-1/2 top-1/2 -z-10 size-12 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-red-200 opacity-40"></div>
                <Molotov
                  size={20}
                  className="text-orange-200 group-hover:size-6"
                />
              </>
            ) : i.type === "hegrenade" ? (
              <HEGrenade
                size={18}
                className="text-red-200 group-hover:size-6"
              />
            ) : i.type === "decoy" ? (
              <Decoy size={18} className="text-gray-100 group-hover:size-6" />
            ) : null;

          return (
            <div
              key={"grenades-" + k}
              className="group absolute -translate-x-1/2 -translate-y-1/2 [&>svg]:transition-size [&>svg]:duration-300 [&>svg]:ease-in-out"
              style={{
                top: coords.y + "px",
                left: coords.x + "px",
              }}
            >
              {icon}
            </div>
          );
        })}
        {plants.map((i, k) => {
          const coords = gameUnitsToRadar(i.pos, map, size);
          if (!coords) return null;
          return (
            <div
              key={"plants-" + k}
              className="group absolute -translate-x-1/2 -translate-y-1/2 [&>svg]:transition-size [&>svg]:duration-300 [&>svg]:ease-in-out"
              style={{
                top: coords.y + "px",
                left: coords.x + "px",
              }}
            >
              <C4
                size={18}
                className="absolute top-0 -z-10 animate-ping text-yellow-400 group-hover:size-6"
              />
              <C4
                size={18}
                className="z-20 text-yellow-400 group-hover:size-6"
              />
            </div>
          );
        })}
        {frags.map((i, k) => {
          const coords = gameUnitsToRadar(i.pos, map, size);
          const attackerCoords = gameUnitsToRadar(i.attacker.pos, map, size);
          if (!coords) return null;
          return (
            <div className="group" key={"frags-" + k}>
              <div
                className="group absolute -translate-x-1/2 -translate-y-1/2 [&>svg]:transition-size [&>svg]:duration-300 [&>svg]:ease-in-out"
                style={{
                  top: coords.y + "px",
                  left: coords.x + "px",
                }}
              >
                <DeathPos
                  size={14}
                  className={`${i.team === "T" ? "text-yellow-400" : "text-blue-400"} group-hover:size-6`}
                />
              </div>
              <div
                className="group absolute -translate-x-1/2 -translate-y-1/2 [&>svg]:transition-size [&>svg]:duration-300 [&>svg]:ease-in-out"
                style={{
                  top: attackerCoords!.y + "px",
                  left: attackerCoords!.x + "px",
                }}
              >
                <div
                  className={`absolute left-0 top-0 hidden size-2 rounded-full group-hover:block ${i.attacker.team === "T" ? "bg-yellow-400" : "bg-blue-400"}`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
