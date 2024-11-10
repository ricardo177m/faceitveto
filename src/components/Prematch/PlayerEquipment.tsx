import Image from "next/image";

import { equipmentMap } from "@/config/equipment";

import Tooltip from "../Tooltip";

interface PlayerEquipmentProps {
  equipment: MatchAnalysisEquipment;
  isCore: boolean;
}

export default function PlayerEquipment({
  equipment,
  isCore,
}: PlayerEquipmentProps) {
  const eq = equipment.equipment as Array<keyof typeof equipmentMap>;
  const ignore = ["C4", "bayonet"];

  return (
    <div
      className={`flex flex-col border-l-2 bg-dark-400 px-4 py-2 ${equipment.team === "T" ? "border-l-yellow-600" : "border-l-blue-600"}`}
    >
      <div className="inline-flex items-center gap-2">
        {isCore && (
          <Tooltip text="Core Player" className="!top-4">
            <div
              className="size-2 rounded-full bg-primary"
              title="Core Player"
            ></div>
          </Tooltip>
        )}
        <p>{equipment.name}</p>
      </div>
      <div className="inline-flex items-center gap-2">
        {!!equipment.armor && (
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
        {equipment.hasHelmet && (
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
        {eq.map((e, i) => {
          const asset = equipmentMap[e] || e;

          if (ignore.includes(asset) || asset.startsWith("knife")) return null;
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
        {equipment.hasDefuser && (
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
  );
}
