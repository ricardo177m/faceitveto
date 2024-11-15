import type { RadarCanvas } from "../RadarCanvas";
import { RadarMap } from "../RadarMap";
import { Grenade } from "./Grenade";

const sprite = {
  src: "/assets/equipment/flashbang.svg",
  color: "#cffafe",
};

export class Flashbang extends Grenade {
  constructor(
    radar: RadarCanvas,
    grenade: MatchAnalysisGrenade,
    map: RadarMap
  ) {
    super(radar, grenade, map, sprite);
  }

  drawExtra(): void {}
}
