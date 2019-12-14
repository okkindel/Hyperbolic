import { HypTile, HypPoint, Circle } from "../core/entity";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";

interface IConfig {
  n: number;
  k: number;
}

export class TesselationDemo extends Program {
  center = new HypPoint(0, 0, this.plane);
  x = new HypPoint(0, 0, this.plane).x;
  y = new HypPoint(0, 0, this.plane).y;
  tiles: HypTile[] = [];

  constructor(canvas: Canvas) {
    super(canvas);

    this.createTiles({ n: 5, k: 5 });
    let clicked = 1;

    window.addEventListener("click", () => {
      switch (clicked % 6) {
        case 0:
          this.createTiles({ n: 5, k: 5 });
          break;
        case 1:
          this.createTiles({ n: 8, k: 3 });
          break;
        case 2:
          this.createTiles({ n: 3, k: 8 });
          break;
        case 3:
          this.createTiles({ n: 4, k: 7 });
          break;
        case 4:
          this.createTiles({ n: 8, k: 5 });
          break;
        case 5:
          this.createTiles({ n: 8, k: 4 });
          break;
      }
      clicked++;
    });
  }

  createTiles(config: IConfig) {
    this.tiles = [
      HypTile.createNKPolygon(config.n, config.k, this.center, this.plane)
    ];
    for (let i = 0; i < 500; i++) {
      for (let s = 0; s < config.n; s++) {
        this.tiles.push(this.createNextTile(this.tiles[i], s));
      }
    }
  }

  createNextTile(tile: HypTile, s: number): HypTile {
    return HypTile.fromPolygon(
      tile.polygon.reflect(tile.getVertex(s)),
      this.center,
      this.plane
    );
  }

  onLoop() {
    this.canvas.setColors("black");
    this.canvas.drawCircle(
      new Circle(this.plane.center, this.plane.radius),
      true
    );
    let alpha = 300;
    this.tiles.forEach(element => {
      this.canvas.setColors(`rgba(255,255,255,${alpha / 500})`);
      this.canvas.drawHypPolygon(element.polygon, true);
      alpha--;
    });
  }
}
