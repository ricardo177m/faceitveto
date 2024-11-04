import Level from "./Level";

interface LevelProps {
  level?: number;
  elo?: number;
  className?: string;
}

export default function LevelElo({ level, elo, className }: LevelProps) {
  return (
    <div
      className={`${className} inline-flex items-center rounded-full bg-dark-100 p-1`}
    >
      <Level elo={elo} level={level} className="size-7" />
      <span className="min-w-11 px-1 text-center text-sm">{elo ?? "-"}</span>
    </div>
  );
}
