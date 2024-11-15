import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/decoy.svg",
  color: "#f3f4f6",
};

export class Decoy extends Grenade {
  constructor(
    radar: RadarCanvas,
    grenade: MatchAnalysisGrenade,
    map: RadarMap
  ) {
    super(radar, grenade, map, sprite, 20);
  }

  drawExtra(): void {}
}
