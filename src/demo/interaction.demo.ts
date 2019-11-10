import { HypTile, HypPoint } from "../core/entity";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";

export class InteractionDemo extends Program {
  tiles: HypTile[];
  rotate = 0;

  constructor(canvas: Canvas) {
    super(canvas);
  }

  createTiles() {
    const point = this.point 
        ? this.point.toHypPoint(this.plane) 
        : new HypPoint(0, 0, this.plane);
    const x = point.x;
    const y = point.y;

    this.tiles = [];

    this.tiles.push(new HypTile(4, 0.4, new HypPoint(x, y, this.plane), this.plane, this.rotate));
    this.tiles.push(new HypTile(3, 0.3, new HypPoint(x, y + 0.4, this.plane), this.plane, this.rotate));
    this.tiles.push(new HypTile(3, 0.3, new HypPoint(x + 0.4, y, this.plane), this.plane, this.rotate));
    this.tiles.push(new HypTile(4, 0.3, new HypPoint(x, y - 0.4, this.plane), this.plane, this.rotate));
    this.tiles.push(new HypTile(3, 0.3, new HypPoint(x - 0.4, y, this.plane), this.plane, this.rotate));
  }

  createLoop() {
    this.createTiles();

    this.canvas.setColors("rgba(235,255,113,1)");
    this.tiles.forEach(element => {
      this.canvas.drawHypPolygon(element.polygon, true);
    });
    this.canvas.setColors("rgba(0,0,0,1)");
    this.canvas.setLineWidth(1);
    this.tiles.forEach(element => {
      this.canvas.drawHypPolygon(element.polygon, false);
    });
    this.rotate+= 0.01;
  }
}
