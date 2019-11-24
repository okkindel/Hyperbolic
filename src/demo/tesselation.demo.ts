import { HypTile, HypPoint } from "../core/entity";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";

export class TesselationDemo extends Program {
  center = new HypPoint(0, 0, this.plane);
  x = new HypPoint(0, 0, this.plane).x;
  y = new HypPoint(0, 0, this.plane).y;

  n = 8;
  k = 3;
  q = true;

  tiles: HypTile[] = [];

  constructor(canvas: Canvas) {
    super(canvas);

    this.tiles = [];
    this.determineTiles();
  }

  determineTiles() {
    const rule: number[] = [];
    this.tiles[0] = HypTile.createNKPolygon(
      this.n,
      this.k,
      this.center,
      this.plane,
      this.q
    );
    rule[0] = 0;
    let j = 1; // index of the next tile to create
    for (let i = 0; i < 100; ++i) {
      j = this.applyRule(i, j, rule);
    }
  }

  applyRule(i: number, j: number, rule: number[]): number {
    let r = rule[i];
    let special = r === 1;
    if (special) {
      r = 2;
    }
    let start = r === 4 ? 3 : 2;
    let quantity = this.k === 3 && r !== 0 ? this.n - r - 1 : this.n - r;
    for (let s = start; s < start + quantity; ++s) {
      // Create a tile adjacent to P[i]
    //   console.log('j', j)
      this.tiles[j] = this.createNextTile(this.tiles[i], s % this.n);
      rule[j] = this.k === 3 && s === start && r !== 0 ? 4 : 3;
      j++;

      let m = 0;
      if (special) {
        m = 2;
      } else if (s === 2 && r !== 0) {
        m = 1;
      }

      for (; m < this.k - 3; ++m) {
        // Create a tile adjacent to P[j-1]
        this.tiles[j] = this.createNextTile(this.tiles[j - 1], 1);
        rule[j] = this.n === 3 && m === this.k - 4 ? 1 : 2;
        j++;
      }
    }
    return j;
  }

  createNextTile(tile: HypTile, s: number): HypTile {
    if (this.q) {
      let V = tile.getVertex(s);
    //   console.log(s, V)
      const tile1 = HypTile.fromPolygon(tile.polygon, this.center, this.plane);
      return tile1.reflect(V);
    } else {
      //   regular
      //   let C = new Line(tile.getVertex(s), tile.getVertex((s + 1) % this.n));
      //   return tile.reflect(C, this.n + s + 1, true);
    }
  }

  onLoop() {
    this.canvas.setColors("rgba(0,255,126,1)");
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
