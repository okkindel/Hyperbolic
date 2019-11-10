import { HypTile, HypPoint } from "../core/entity";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";

export class TilesDemo extends Program {
  tiles: HypTile[];

  constructor(canvas: Canvas) {
    super(canvas);

      const point = new HypPoint(0, 0, this.plane);
      const x = point.x;
      const y = point.y;

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
      
      // this.tiles.push(new HypTile(4, 0.3, new HypPoint(x, y, this.plane), this.plane));
      // this.tiles.push(new HypTile(4, 0.3, new HypPoint(x + 0.142, y + 0.142, this.plane), this.plane));
      // this.tiles.push(new HypTile(4, 0.3, new HypPoint(x - 0.142, y + 0.142, this.plane), this.plane));
      // this.tiles.push(new HypTile(4, 0.3, new HypPoint(x + 0.142, y - 0.142, this.plane), this.plane));
      // this.tiles.push(new HypTile(4, 0.3, new HypPoint(x - 0.142, y - 0.142, this.plane), this.plane));

      this.tiles.push(new HypTile(8, 0.45, new HypPoint(x, y, this.plane), this.plane));
      this.tiles.push(new HypTile(8, 0.45, new HypPoint(x + 0.45, y, this.plane), this.plane));
      this.tiles.push(new HypTile(8, 0.45, new HypPoint(x - 0.45, y, this.plane), this.plane));
      this.tiles.push(new HypTile(8, 0.45, new HypPoint(x, y + 0.45, this.plane), this.plane));
      this.tiles.push(new HypTile(8, 0.45, new HypPoint(x, y - 0.45, this.plane), this.plane));
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
