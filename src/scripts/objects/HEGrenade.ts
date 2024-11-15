import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/hegrenade.svg",
  color: "#fecaca",
};

export class HEGrenade extends Grenade {
  constructor(
    radar: RadarCanvas,
    grenade: MatchAnalysisGrenade,
    map: RadarMap
  ) {
    super(radar, grenade, map, sprite);
  }

  drawExtra(): void {}
}
