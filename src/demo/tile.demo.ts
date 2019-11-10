import { HypTile, HypPoint } from "../core/entity";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";

export class TilesDemo extends Program {
  x = new HypPoint(0, 0, this.plane).x;
  y = new HypPoint(0, 0, this.plane).y;
  tiles: HypTile[];

  constructor(canvas: Canvas) {
    super(canvas);
    let clicked = 0;

    window.addEventListener("click", () => {
      if (clicked % 3 === 0) {
        this.tiles = [];
        this.tiles.push(new HypTile(8, 0.45, new HypPoint(this.x, this.y, this.plane), this.plane));
        this.tiles.push(new HypTile(8, 0.45, new HypPoint(this.x + 0.45, this.y, this.plane), this.plane));
        this.tiles.push(new HypTile(8, 0.45, new HypPoint(this.x - 0.45, this.y, this.plane), this.plane));
        this.tiles.push(new HypTile(8, 0.45, new HypPoint(this.x, this.y + 0.45, this.plane), this.plane));
        this.tiles.push(new HypTile(8, 0.45, new HypPoint(this.x, this.y - 0.45, this.plane), this.plane));
      }
      if (clicked % 3 === 1) {
        this.tiles = [];
        this.tiles.push(new HypTile(4, 0.3, new HypPoint(this.x, this.y, this.plane), this.plane));
        this.tiles.push(new HypTile(4, 0.3, new HypPoint(this.x + 0.142, this.y + 0.142, this.plane), this.plane));
        this.tiles.push(new HypTile(4, 0.3, new HypPoint(this.x - 0.142, this.y + 0.142, this.plane), this.plane));
        this.tiles.push(new HypTile(4, 0.3, new HypPoint(this.x + 0.142, this.y - 0.142, this.plane), this.plane));
        this.tiles.push(new HypTile(4, 0.3, new HypPoint(this.x - 0.142, this.y - 0.142, this.plane), this.plane));
      }
      if (clicked % 3 === 2) {
        this.tiles = [];
        for (let i = -1; i < 1; i+= 0.1) {
          for (let j = -1; j < 1; j+= 0.1) {
            this.tiles.push(
              new HypTile(
                4,
                0.14,
                new HypPoint(this.x + i, this.y + j, this.plane),
                this.plane,
                Math.PI / 4
              )
            );
          }
        }
      }
      clicked++;
    });
  }

  createLoop() {
    this.canvas.setColors("rgba(0,255,126,1)");
    this.tiles.forEach(element => {
      this.canvas.drawHypPolygon(element.polygon, true);
    });
    this.canvas.setColors("rgba(0,0,0,1)");
    this.canvas.setLineWidth(1);
    this.tiles.forEach(element => {
      this.canvas.drawHypPolygon(element.polygon, false);
    });
  }
}
