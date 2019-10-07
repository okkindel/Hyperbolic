import { Circle } from "./circle";
import { HypLine } from "./line";
import { Point } from "./point";
import { last } from "ramda";

export class HypPolygon {
  verticles: Point[] = [];
  lines: HypLine[] = [];
  plane: Circle;

  constructor(p1: Point, p2: Point, plane: Circle) {
    this.lines.push(new HypLine(p1, p2, plane));
    this.verticles.push(p1);
    this.verticles.push(p2);
    this.plane = plane;
  }

  addVerticle(point: Point) {
    this.lines.push(new HypLine(last(this.verticles), point, this.plane));
    this.verticles.push(point);
  }
}
