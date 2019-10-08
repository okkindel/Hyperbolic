import { head, last, append, equals } from "ramda";
import { HypLine } from "./hyp-line";
import { Circle } from "../circle";
import { Point } from "../point";

export class HypPolygon {
  verticles: Point[] = [];
  lines: HypLine[] = [];
  plane: Circle;

  constructor(p1: Point, p2: Point, plane: Circle) {
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
}
