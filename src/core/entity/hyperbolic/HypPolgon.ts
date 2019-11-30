import { head, last, append, equals } from "ramda";
import { HypPoint } from "./HypPoint";
import { HypLine } from "./HypLine";
import { Point } from "../Point";
import { Plane } from "../Plane";

export class HypPolygon {
  verticles: Point[] = [];
  lines: HypLine[] = [];
  plane: Plane;
  
  static fromVerticles(verts: Point[], plane: Plane): HypPolygon {
    const polygon = new HypPolygon(verts[0], verts[1], plane);
    verts.slice(2, verts.length).forEach((v: Point) => polygon.addVerticle(v));
    return polygon;
  }

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
    let verticles: Point[] = [];
    this.verticles.forEach((vert: Point, index: number) => {
      verticles[index] = point
        .moebius(vert.toHypPoint(this.plane), t)
        .toCanvasCoords();
    });
    return HypPolygon.fromVerticles(verticles, this.plane);
  }

  reflect(point: HypPoint): HypPolygon {
    let verticles: Point[] = [];
    this.verticles.forEach((vert: Point, index: number) => {
      verticles[index] = point
        .reflect(vert.toHypPoint(this.plane))
        .toCanvasCoords();
    });
    return HypPolygon.fromVerticles(verticles, this.plane);
  }
}
