import { useEffect, useState } from "react";
import Image from "next/image";
import EventEmitter from "eventemitter3";

import { equipmentMap } from "@/config/equipment";

import Tooltip from "../Tooltip";

interface PlayerEquipmentProps {
  steamid: string;
  nickname: string;
  team: string | null;
  emitter: EventEmitter;
  isCore: boolean;
  initialState: PlayerInitialState;
}

export default function PlayerEquipment({
  steamid,
  nickname,
  team,
  emitter,
  isCore,
  initialState,
}: PlayerEquipmentProps) {
  const [isAlive, setIsAlive] = useState<boolean>(initialState.is_alive);
  const [health, setHealth] = useState<number>(
    initialState.is_disconnected ? 0 : initialState.health
  );
  const [armor, setArmor] = useState<number>(
    initialState.is_disconnected ? 0 : initialState.armor_value
  );
  const [hasHelmet, setHasHelmet] = useState<boolean>(
    initialState.is_disconnected ? false : initialState.has_helmet
  );
  const [hasDefuser, setHasDefuser] = useState<boolean>(
    initialState.is_disconnected ? false : initialState.has_defuser
  );
  const [inventory, setInventory] = useState<string[]>(initialState.inventory);

  useEffect(() => {
    emitter.addListener(`player:${steamid}:isAlive`, setIsAlive);
    emitter.addListener(`player:${steamid}:health`, setHealth);
    emitter.addListener(`player:${steamid}:armor`, setArmor);
    emitter.addListener(`player:${steamid}:helmet`, setHasHelmet);
    emitter.addListener(`player:${steamid}:defuser`, setHasDefuser);
    emitter.addListener(`player:${steamid}:inventory`, setInventory);
    return () => {
      emitter.removeListener(`player:${steamid}:isAlive`, setIsAlive);
      emitter.removeListener(`player:${steamid}:health`, setHealth);
      emitter.removeListener(`player:${steamid}:armor`, setArmor);
      emitter.removeListener(`player:${steamid}:helmet`, setHasHelmet);
      emitter.removeListener(`player:${steamid}:defuser`, setHasDefuser);
      emitter.removeListener(`player:${steamid}:inventory`, setInventory);
    };
  }, []);

  const ignore = ["bayonet"];

  return (
    <div
      className={`flex flex-row items-center gap-2 border-l-2 bg-dark-400 px-4 py-2 ${team === "T" ? "border-l-yellow-600" : "border-l-blue-600"}`}
    >
      <div className="relative size-11">
        <svg viewBox="0 0 36 36" className="absolute inset-0">
          <path
            className="text-gray-700"
            strokeDasharray="100, 100"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            className={health <= 25 ? "text-red-500" : "text-green-500"}
            strokeDasharray={`${health}, 100`}
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <text
            x="18"
            y="22.35"
            className="text-xs"
            textAnchor="middle"
            fill="white"
          >
            {health}
          </text>
        </svg>
      </div>
      <div className="flex flex-col">
        <div className="inline-flex items-center gap-2">
          {isCore && (
            <Tooltip text="Core Player" className="!top-4">
              <div
                className="size-2 rounded-full bg-primary"
                title="Core Player"
              ></div>
            </Tooltip>
          )}
          <p>{nickname}</p>
        </div>
        <div className="inline-flex items-center gap-2">
          {isAlive && !!armor && (
            <Tooltip text="Kevlar" className="top-7">
              <Image
                width={4}
                height={4}
                alt={"Kevlar"}
                src="/assets/equipment/kevlar.svg"
                className="size-5"
                unoptimized
              />
            </Tooltip>
          )}
          {isAlive && hasHelmet && (
            <Tooltip className="top-7" text="Helmet">
              <Image
                width={4}
                height={4}
                alt={"Helmet"}
                src="/assets/equipment/helmet.svg"
                className="size-5"
                unoptimized
              />
            </Tooltip>
          )}
          {isAlive &&
            inventory.map((e, i) => {
              const asset = equipmentMap[e as keyof typeof equipmentMap] || e;

              if (ignore.includes(asset) || asset.startsWith("knife"))
                return null;
              return (
                <Tooltip className="top-7" text={e} key={i}>
                  <Image
                    width={4}
                    height={4}
                    alt={e}
                    src={`/assets/equipment/${asset}.svg`}
                    className="size-5"
                    unoptimized
                  />
                </Tooltip>
              );
            })}
          {isAlive && hasDefuser && (
            <Tooltip className="top-7" text="Defuser">
              <Image
                width={4}
                height={4}
                alt={"Defuser"}
                src="/assets/equipment/defuser.svg"
                className="size-5"
                unoptimized
              />
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
}
