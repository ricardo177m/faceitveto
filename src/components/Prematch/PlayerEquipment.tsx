import { equipmentMap } from "@/config/equipment";

interface PlayerEquipmentProps {
  equipment: MatchAnalysisEquipment;
}

export default function PlayerEquipment({ equipment }: PlayerEquipmentProps) {
  const eq = equipment.equipment as Array<keyof typeof equipmentMap>;
  const ignore = ["C4", "bayonet"];

  return (
    <div
      className={`flex flex-col border-l-2 bg-dark-400 px-4 py-2 ${equipment.team === "T" ? "border-l-yellow-600" : "border-l-blue-600"}`}
    >
      <p>{equipment.name}</p>
      <div className="inline-flex items-center gap-2">
        {equipment.armor ? (
          <img src="/assets/equipment/kevlar.svg" className="h-5 w-5" />
        ) : null}
        {eq.map((e, i) => {
          const asset = equipmentMap[e] || e;

          if (ignore.includes(asset) || asset.startsWith("knife")) return null;
          return (
            <img
              key={i}
              src={`/assets/equipment/${asset}.svg`}
              className="h-5 w-5"
              title={e}
            />
          );
        })}
        {equipment.hasDefuser ? (
          <img
            src="/assets/equipment/defuser.svg"
            className="h-5 w-5"
            title="Defuser"
          />
        ) : null}
        {equipment.hasHelmet ? (
          <img
            src="/assets/equipment/helmet.svg"
            className="h-5 w-5"
            title="Helmet"
          />
        ) : null}
      </div>
    </div>
  );
}
