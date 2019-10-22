import { head, last, append, equals } from "ramda";
import { HypPoint } from "./HypPoint";
import { HypLine } from "./HypLine";
import { Point } from "../Point";
import { Plane } from "../Plane";

export class HypPolygon {
  verticles: Point[] = [];
  lines: HypLine[] = [];
  plane: Plane;

  constructor(p1: Point, p2: Point, plane: Plane) {
    const line = new HypLine(p1, p2, plane);
    this.lines.push(line);
    this.verticles.push(line.p);
    this.verticles.push(line.q);
    this.plane = plane;
  }

  addVerticle(point: Point) {
    const line = new HypLine(last(this.verticles), point, this.plane);
    this.verticles.push(line.q);
    this.lines.push(line);
  }

  getCompletePolygonLines(): HypLine[] {
    return equals(this.verticles.length, 1)
      ? this.lines
      : append(
          new HypLine(last(this.verticles), head(this.verticles), this.plane),
          this.lines
        );
  }

  moebius(point: HypPoint, t: number): HypPolygon {
    let verts: Point[] = [];
    this.verticles.forEach((vertex: Point) => {
      verts.push(
        vertex
          .toHypPoint(this.plane)
          .moebius(point, t)
          .toCanvasCoords()
      );
    });
    const polygon = new HypPolygon(verts[0], verts[1], this.plane);
    for (let i = 2; i < verts.length; i++) {
      polygon.addVerticle(verts[i]);
    }
    return polygon;
  }
}
