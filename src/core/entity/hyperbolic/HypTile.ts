import { HypPolygon } from "./HypPolgon";
import { HypPoint } from "./HypPoint";
import { HypLine } from "./HypLine";
import { Plane } from "../Plane";

export class HypTile {
  points: HypPoint[] = [];
  polygon: HypPolygon;
  numOfVerts: number;
  center: HypPoint;
  plane: Plane;

  startAngle?: number;
  distance?: number;

  static fromPolygon(
    polygon: HypPolygon,
    center: HypPoint,
    plane: Plane
  ): HypTile {
    const tile = new HypTile(plane, center);
    tile.points = polygon.verticles.map(point => point.toHypPoint(plane));
    tile.numOfVerts = polygon.verticles.length;
    tile.polygon = polygon;
    return tile;
  }

  static createNKPolygon(
    n: number,
    k: number,
    center: HypPoint,
    plane: Plane,
    quasiregular = false
  ): HypTile {
    const tile = new HypTile(plane, center);
    tile.generateNKTile(n, k, quasiregular);
    tile.numOfVerts = n;
    return tile;
  }

  static createRegularPolygon(
    numOfVerts: number,
    distance: number,
    center: HypPoint,
    plane: Plane,
    startAngle = 0
  ): HypTile {
    const tile = new HypTile(plane, center);
    tile.startAngle = startAngle;
    tile.numOfVerts = numOfVerts;
    tile.distance = distance;
    tile.createRegularPolygon();
    return tile;
  }

  private constructor(plane: Plane, center: HypPoint) {
    this.center = center;
    this.plane = plane;
  }

  reflect(point: HypPoint): HypTile {
    this.polygon = this.polygon.reflect(point);
    return this;
  }

  moebius(point: HypPoint, t: number): HypTile {
    this.polygon = this.polygon.moebius(point, t);
    return this;
  }

  getVertex(i: number): HypPoint {
    return this.points[i % this.numOfVerts];
  }

  getEdge(i: number): HypLine {
    const lines = this.polygon.getCompletePolygonLines();
    return lines[i % lines.length];
  }

  createRegularPolygon() {
    for (let i = 0; i < this.numOfVerts; i++) {
      const point = new HypPoint(
        this.center.x +
          this.distance *
            Math.cos((2 * Math.PI * i) / this.numOfVerts + this.startAngle),
        this.center.y +
          this.distance *
            Math.sin((2 * Math.PI * i) / this.numOfVerts + this.startAngle),
        this.plane
      );
      this.points.push(point);
    }
    this.polygon = HypPolygon.fromVerticles(
      this.points.map(point => point.toCanvasCoords()),
      this.plane
    )
      .moebius(this.center, 0)
      .reflect(this.center);
  }

  generateNKTile = (n: number, k: number, quasiregular: boolean) => {
    // Let ABC be a triangle in a regular (n,k - tiling, where
    //    A is the center of an n-gon (also center of the disk),
    //    B is a vertex of the n-gon, and
    //    C is the midpoint of a side of the n-gon adjacent to B.
    const angleA = Math.PI / n;
    const angleB = Math.PI / k;
    const angleC = Math.PI / 2.0;
    const sinA = Math.sin(angleA);
    const sinB = Math.sin(angleB);
    let s =
      Math.sin(angleC - angleB - angleA) /
      Math.sqrt(1.0 - sinB * sinB - sinA * sinA);
    // But for a quasiregular tiling, we need the distance s from A to C.
    if (quasiregular) {
      s = (s * s + 1.0) / (2.0 * s * Math.cos(angleA));
      s = s - Math.sqrt(s * s - 1.0);
    }

    for (let i = 0; i < n; i++) {
      const point = new HypPoint(
        this.center.x + s * Math.cos((3 + 2 * i) * angleA),
        this.center.y + s * Math.sin((3 + 2 * i) * angleA),
        this.plane
      );
      this.points.push(point);
    }

    this.polygon = HypPolygon.fromVerticles(
      this.points.map(point => point.toCanvasCoords()),
      this.plane
    )
      .moebius(this.center, 0)
      .reflect(this.center);
  };
}
