interface PlayerEquipmentProps {
  equipment: MatchAnalysisEquipment;
}

export default function PlayerEquipment({ equipment }: PlayerEquipmentProps) {
  return (
    <div
      className={`flex flex-col border-l-2 bg-dark-400 px-4 py-2 ${equipment.team === "T" ? "border-l-yellow-600" : "border-l-blue-600"}`}
    >
      <p>{equipment.name}</p>
    </div>
  );
}
