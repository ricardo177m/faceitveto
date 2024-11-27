import React, { useEffect, useState } from "react";
import { MdPause, MdPlayArrow } from "react-icons/md";

import { Replay } from "@/scripts/Replay";

interface ReplayControlsProps {
  replay: Replay;
  className?: string;
}

export default function ReplayControls({
  replay,
  className,
}: ReplayControlsProps) {
  const [paused, setPaused] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  const emitter = replay.emitter;

  useEffect(() => {
    if (!emitter) return;

    setPaused(replay.isPaused);
    setSpeed(replay.speed);
    setProgress((replay.currentFrame - replay.startFrame) / replay.endFrame);

    emitter.addListener("pause", setPaused);
    emitter.addListener("speed", setSpeed);
    emitter.addListener("progress", setProgress);
    return () => {
      emitter.removeListener("pause", setPaused);
      emitter.removeListener("speed", setSpeed);
      emitter.removeListener("progress", setProgress);
    };
  }, [emitter]);

  const speeds = [0.5, 1, 2];

  const handleSpeedBtn = () => {
    const index = speeds.indexOf(speed);
    const nextIndex = index + 1 === speeds.length ? 0 : index + 1;
    replay.setSpeed(speeds[nextIndex]);
  };

  const handleSeek = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = x / rect.width;
    replay.seek(progress);
  };

  return (
    <div className={`${className} flex w-full flex-row gap-2`}>
      <button
        onClick={() => replay.togglePause()}
        className="flex aspect-square h-10 items-center justify-center bg-slate-700 text-center text-2xl"
      >
        {paused ? <MdPlayArrow /> : <MdPause />}
      </button>
      <button
        onClick={handleSpeedBtn}
        className="flex aspect-square h-10 items-center justify-center bg-slate-700 text-center text-sm"
      >
        {speed}x
      </button>
      <button onClick={handleSeek} className="h-10 w-full bg-slate-700">
        <div
          className="h-10 bg-slate-600"
          style={{ width: `${progress * 100}%` }}
        ></div>
      </button>
    </div>
  );
}
