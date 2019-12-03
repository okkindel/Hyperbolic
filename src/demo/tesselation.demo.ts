import { HypTile, HypPoint } from "../core/entity";
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
    let clicked = 0;

    window.addEventListener("click", () => {
      switch (clicked % 5) {
        case 0:
          this.createTiles({ n: 8, k: 3 });
          break;
        case 1:
          this.createTiles({ n: 8, k: 4 });
          break;
        case 2:
          this.createTiles({ n: 8, k: 5 });
          break;
        case 3:
          this.createTiles({ n: 3, k: 8 });
          break;
        case 4:
          this.createTiles({ n: 4, k: 7 });
          break;
      }
      clicked++;
    });
  }

  createTiles(config: IConfig) {
    this.tiles = [];
    const rule: number[] = [];
    this.tiles[0] = HypTile.createNKPolygon(
      config.n,
      config.k,
      this.center,
      this.plane
    );
    rule[0] = 0;
    let j = 1; // index of the next tile to create
    for (let i = 0; i < 15; ++i) {
      j = this.applyRule(i, j, rule, config);
    }
  }

  applyRule(i: number, j: number, rule: number[], config: IConfig): number {
    let r = rule[i];
    let special = r === 1;
    if (special) {
      r = 2;
    }
    let start = r === 4 ? 3 : 2;
    let quantity = config.k === 3 && r !== 0 ? config.n - r - 1 : config.n - r;
    for (let s = start; s < start + quantity; ++s) {
      // Create a tile adjacent to P[i]
      this.tiles[j] = this.createNextTile(this.tiles[i], s % config.n);
      rule[j] = config.k === 3 && s === start && r !== 0 ? 4 : 3;
      j++;

      let m = 0;
      if (special) {
        m = 2;
      } else if (s === 2 && r !== 0) {
        m = 1;
      }

      for (; m < config.k - 3; ++m) {
        // Create a tile adjacent to P[j-1]
        console.log(this.createNextTile(this.tiles[j - 1], 1))
        this.tiles[j] = this.createNextTile(this.tiles[j - 1], 1);
        rule[j] = config.n === 3 && m === config.k - 4 ? 1 : 2;
        j++;
      }
    }
    return j;
  }

  createNextTile(tile: HypTile, s: number): HypTile {
    let V = tile.getVertex(s);
    const _tile = HypTile.fromPolygon(tile.polygon, this.center, this.plane);
    return _tile.reflect(V);
  }

  onLoop() {
    this.canvas.setColors("rgba(224,61,13,1)");
    this.tiles.forEach(element => {
      this.canvas.drawHypPolygon(element.polygon, true);
    });
    this.canvas.setColors("rgba(0,0,0,1)");
    this.canvas.setLineWidth(1);
    this.tiles.forEach(element => {
      this.canvas.drawHypPolygon(element.polygon);
    });
  }
}
