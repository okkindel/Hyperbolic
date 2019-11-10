import { Program } from "../core/program";
import { HypTile, HypPoint, HypPolygon, Plane, HypLine } from "../core/entity";
import { Canvas } from "../core/canvas";
import { fromPolar } from "../core/geometry";

var center: HypPoint;

export class TilesDemo extends Program {
  tiles: HypTile[];

  constructor(canvas: Canvas) {
    super(canvas);

    window.addEventListener("mousemove", () => {
      const point = this.point.toHypPoint(this.plane);
      const x = point.x;
      const y = point.y;

      center = point;

      this.tiles = [];

      // for (let i = -1; i < 1; i+= 0.1) {
      //   for (let j = -1; j < 1; j+= 0.1) {
      //     this.tiles.push(
      //       new HypTile(
      //         4,
      //         0.14,
      //         new HypPoint(x + i, y + j, this.plane),
      //         this.plane,
      //         Math.PI / 4
      //       )
      //     );
      //   }
      // }

      this.tiles.push(new HypTile(3, 0.2, new HypPoint(x, y, this.plane), this.plane, Math.PI / 2));
      this.tiles.push(new HypTile(4, 0.2, new HypPoint(x + 0.2, y, this.plane), this.plane,  Math.PI / 4));
      this.tiles.push(new HypTile(5, 0.2, new HypPoint(x, y + 0.2, this.plane), this.plane));
      this.tiles.push(new HypTile(6, 0.2, new HypPoint(x + 0.2, y + 0.2, this.plane), this.plane));
      this.tiles.push(new HypTile(7, 0.2, new HypPoint(x - 0.2, y - 0.2, this.plane), this.plane));
      this.tiles.push(new HypTile(8, 0.2, new HypPoint(x + 0.2, y - 0.2, this.plane), this.plane));
      this.tiles.push(new HypTile(9, 0.2, new HypPoint(x - 0.2, y + 0.2, this.plane), this.plane));
      this.tiles.push(new HypTile(10, 0.2, new HypPoint(x - 0.2, y, this.plane), this.plane));
      this.tiles.push(new HypTile(11, 0.2, new HypPoint(x, y - 0.2, this.plane), this.plane));
    });
  }

  createLoop() {
    if (this.tiles) {
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
}
