import React, { useEffect } from "react";

import { RadarCanvas } from "@/scripts/RadarCanvas";

import PlayerEquipment from "./PlayerEquipment";

interface RadarProps {
  meta: MatchMeta;
  data: MatchData;
  coreIds: string[];
  className?: string;
}

const Radar: React.FC<RadarProps> = ({ meta, data, coreIds, className }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [radar, setRadar] = React.useState<RadarCanvas | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = { x: canvas.clientWidth, y: canvas.clientHeight };
    const radar = new RadarCanvas(canvas, data, meta.map, size);
    setRadar(radar);
    radar.start();

    const handleResize = () => {
      const size = { x: canvas.clientWidth, y: canvas.clientHeight };
      radar.resize(size);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      radar.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  // useEffect(() => {
  //   if (radar) radar.setRound(round);
  // }, [radar, round]);

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="md:w-3/4">
        <canvas ref={canvasRef} className={className} />
      </div>
      <div className="md:w-1/4">
        <div className="mb-4 flex flex-col gap-1">
          {radar?.replay.players
            .filter((p) => p.playerObject.team === "T")
            .map((p) => (
              <PlayerEquipment
                key={p.steamid}
                player={p.playerObject}
                isCore={coreIds.includes(p.steamid)}
              />
            ))}
        </div>
        <div className="mb-4 flex flex-col gap-1">
          {radar?.replay.players
            .filter((p) => p.playerObject.team === "CT")
            .map((p) => (
              <PlayerEquipment
                key={p.steamid}
                player={p.playerObject}
                isCore={coreIds.includes(p.steamid)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Radar;
