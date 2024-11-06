import Image from "next/image";

import data from "@/data.json";
import { gameUnitsToRadar } from "@/utils/radar";

import C4 from "../icons/C4";
import Decoy from "../icons/Decoy";
import Flashbang from "../icons/Flashbang";
import HEGrenade from "../icons/HEGrenade";
import Molotov from "../icons/Molotov";
import SmokeGrenade from "../icons/SmokeGrenade";

interface RadarProps {
  map: string;
}

export default function Radar({ map }: RadarProps) {
  const round = 1;

  const { plants, grenades } = data;

  return (
    <div className="flex justify-center">
      <div className="relative">
        <Image
          src={`/assets/radars/${map}.png`}
          width={768}
          height={768}
          alt="Radar"
          unoptimized
          className="opacity-75"
        />
        {grenades
          .filter((e) => e.round === round)
          .map((i, k) => {
            const coords = gameUnitsToRadar(i.pos.x, i.pos.y, map, 768);
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
                <Molotov
                  size={18}
                  className="text-orange-200 group-hover:size-6"
                />
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
                key={k}
                className="[&>svg]:transition-size group absolute -translate-x-1/2 -translate-y-1/2 [&>svg]:duration-300 [&>svg]:ease-in-out"
                style={{
                  top: coords.y + "px",
                  left: coords.x + "px",
                }}
              >
                {icon}
              </div>
            );
          })}
        {plants
          .filter((e) => e.round === round)
          .map((i, k) => {
            const coords = gameUnitsToRadar(i.pos.x, i.pos.y, map, 768);
            if (!coords) return null;
            return (
              <div
                key={k}
                className="[&>svg]:transition-size group absolute -translate-x-1/2 -translate-y-1/2 [&>svg]:duration-300 [&>svg]:ease-in-out"
                style={{
                  top: coords.y + "px",
                  left: coords.x + "px",
                }}
              >
                <C4
                  size={18}
                  className="absolute top-0 -z-10 animate-ping text-yellow-400 group-hover:size-6"
                />
                <C4 size={18} className="text-yellow-400 group-hover:size-6" />
              </div>
            );
          })}
      </div>
    </div>
  );
}
