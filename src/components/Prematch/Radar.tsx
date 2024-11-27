import React, { useEffect } from "react";

import { RadarCanvas } from "@/scripts/RadarCanvas";

import PlayerEquipment from "./PlayerEquipment";
import ReplayControls from "./ReplayControls";
import RoundSelector from "./RoundSelector";

interface RadarProps {
  meta: MatchMeta;
  data: MatchData;
  coreIds: string[];
  showNicknames: boolean;
  selectedRoundState: ReactState<number>;
  className?: string;
}

const Radar: React.FC<RadarProps> = ({
  meta,
  data,
  coreIds,
  showNicknames,
  selectedRoundState,
  className,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [radar, setRadar] = React.useState<RadarCanvas>();

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
  }, [data, meta.map]);

  useEffect(() => {
    if (!radar) return;
    radar.showNicknames = showNicknames;
  }, [showNicknames, radar]);

  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <div className="relative md:w-3/4">
        <canvas ref={canvasRef} className={className} />
        {radar && (
          <>
            <ReplayControls
              className="absolute bottom-0 mb-2 px-2"
              replay={radar.replay}
            />
            <RoundSelector
              className="absolute left-1/2 top-0 mt-2 -translate-x-1/2"
              meta={meta}
              selectedRoundState={selectedRoundState}
              coreIds={coreIds}
            />
          </>
        )}
      </div>
      <div className="md:w-1/4">
        <div className="mb-4 flex flex-col gap-1">
          {radar &&
            radar.replay.players
              .filter((p) => p.playerObject.team === "T")
              .map((p) => (
                <PlayerEquipment
                  key={p.steamid}
                  nickname={p.playerObject.name}
                  team={p.playerObject.team}
                  steamid={p.steamid}
                  isCore={coreIds.includes(p.steamid)}
                  emitter={radar.replay.emitter}
                  initialState={p.playerObject._initialState}
                />
              ))}
        </div>
        <div className="mb-4 flex flex-col gap-1">
          {radar &&
            radar.replay.players
              .filter((p) => p.playerObject.team === "CT")
              .map((p) => (
                <PlayerEquipment
                  key={p.steamid}
                  nickname={p.playerObject.name}
                  team={p.playerObject.team}
                  steamid={p.steamid}
                  isCore={coreIds.includes(p.steamid)}
                  emitter={radar.replay.emitter}
                  initialState={p.playerObject._initialState}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Radar;
