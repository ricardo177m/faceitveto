import Image from "next/image";

interface LevelProps {
  level?: number;
  elo?: number;
  className?: string;
  size?: number;
}

export default function Level({ level, elo, className, size }: LevelProps) {
  const levelasset = !level ? "0" : level.toString();

  return (
    <Image
      src={`/assets/faceit-levels/${levelasset}.svg`}
      alt={`Level ${levelasset}`}
      title={`CS2 Level ${levelasset}${elo ? ` (${elo} elo)` : ""}`}
      width={size || 16}
      height={size || 16}
      className={className}
    />
  );
}
