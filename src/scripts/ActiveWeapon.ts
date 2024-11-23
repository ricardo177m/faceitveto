import { equipmentMap } from "@/config/equipment";

import { Player } from "./objects/Player";

export class ActiveWeapon {
  player: Player;
  sprite: HTMLImageElement;
  isLoaded: boolean = false;
  currentActiveWeapon: string | null = null;

  constructor(player: Player) {
    this.player = player;
    this.sprite = new Image();
    this.sprite.addEventListener("load", this._onLoad.bind(this));
  }

  update() {
    if (this.currentActiveWeapon === this.player.activeWeapon) return;
    this.currentActiveWeapon = this.player.activeWeapon;

    let asset =
      equipmentMap[this.currentActiveWeapon as keyof typeof equipmentMap] ||
      this.currentActiveWeapon?.toLowerCase();
    if (asset === "knife" && this.player.team === "T") asset = "knife_t";
    this.sprite.src = `/assets/equipment/${asset}.svg`;
    this.isLoaded = false;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.currentActiveWeapon || !this.player.worldPos) return;

    ctx.drawImage(
      this.sprite,
      this.player.worldPos.x + this.player.size.x * 0.9,
      this.player.worldPos.y - this.player.size.y / 2,
      this.player.size.x,
      this.player.size.y
    );
  }

  stop(): void {
    this.sprite.src = "";
    this.sprite.removeEventListener("load", this._onLoad.bind(this));
  }

  private _onLoad(): void {
    this.isLoaded = true;
  }
}
