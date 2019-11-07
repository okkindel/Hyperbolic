import { HypPolygon } from "./HypPolgon";
import { HypPoint } from "./HypPoint";
import { Plane } from "../Plane";

export class HypTile {
  points: HypPoint[] = [];
  polygon: HypPolygon;
  center: HypPoint;
  plane: Plane;

  startAngle: number;
  numOfVerts: number;
  distance: number;

  constructor(
    numOfVerts: number,
    distance: number,
    center: HypPoint,
    plane: Plane,
    startAngle?: number
  ) {
    this.startAngle = startAngle || 0;
    this.numOfVerts = numOfVerts;
    this.distance = distance;
    this.center = center;
    this.plane = plane;

    this.createTile();
  }

  createTile() {
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
}
