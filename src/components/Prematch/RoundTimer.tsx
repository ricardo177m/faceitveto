import React, { useEffect, useState } from "react";

import { config } from "@/config/config";
import { Replay } from "@/scripts/Replay";

interface RoundTimerProps {
  replay: Replay;
  className?: string;
}

export default function RoundTimer({ replay, className }: RoundTimerProps) {
  const [timer, setTimer] = useState<number>(0);

  const emitter = replay.emitter;

  useEffect(() => {
    if (!emitter) return;

    setTimer(replay.roundTime);

    emitter.addListener("timer", setTimer);
    return () => {
      emitter.removeListener("timer", setTimer);
    };
  }, [emitter]);

  const minutes = Math.floor((timer + 1) / 60);
  const seconds = Math.floor((timer + 1) % 60);

  return (
    <p className={`${className} text-2xl font-bold`}>
      {minutes}:{seconds.toFixed(0).padStart(2, "0")}
    </p>
  );
}
