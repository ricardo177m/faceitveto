import React, { useEffect } from "react";

import { RadarCanvas } from "@/scripts/RadarCanvas";

interface RadarProps {
  data: MatchData;
  map: string;
  round: number;
  className?: string;
}

const Radar: React.FC<RadarProps> = ({ data, map, round, className }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [radar, setRadar] = React.useState<RadarCanvas | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const size = { x: canvas.clientWidth, y: canvas.clientHeight };
    const radar = new RadarCanvas(canvas, data, map, size);
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

  useEffect(() => {
    if (radar) radar.setRound(round);
  }, [radar, round]);

  return <canvas ref={canvasRef} className={className} />;
};

export default Radar;
