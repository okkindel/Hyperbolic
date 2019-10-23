import { head, last } from "ramda";
import { Circle } from "../Circle";
import { Plane } from "../Plane";
import { Point } from "../Point";
import {
  circleFromPoints,
  atan2ToRad,
  inversion,
  euclidean
} from "../../geometry";

/**
 * Line in Poincare concept.
 */
export class HypLine {
  antyclokwise = false;
  startAngle: number;
  endAngle: number;
  plane: Plane;
  arc: Circle;
  p: Point;
  q: Point;

  constructor(p: Point, q: Point, plane: Plane) {
    this.plane = plane;
    this.p = p;
    this.q = q;
    this.calculateArc();
  }

  calculateArc() {
    this.arc = circleFromPoints(this.p, this.q, inversion(this.plane, this.p));
    this.p = this.cutIfSticksOut(this.p);
    this.q = this.cutIfSticksOut(this.q);
    this.countAngle();
  }

  cutIfSticksOut(point: Point): Point {
    if (euclidean(point, this.plane.center) > this.plane.radius) {
      const intersection = this.plane.intersectPoints(this.arc);
      return euclidean(point, head(intersection)) <
        euclidean(point, last(intersection))
        ? head(intersection)
        : last(intersection);
    }
    return point;
  }

  countAngle() {
    this.startAngle = Math.atan2(
      this.p.y - this.arc.center.y,
      this.p.x - this.arc.center.x
    );
    this.endAngle = Math.atan2(
      this.q.y - this.arc.center.y,
      this.q.x - this.arc.center.x
    );

    const radStartAngle = atan2ToRad(this.startAngle);
    const radEndAngle = atan2ToRad(this.endAngle);

    const isRotated = radStartAngle < radEndAngle;

    const rotatesForward =
      radStartAngle > Math.PI &&
      radEndAngle < Math.PI &&
      Math.abs(radStartAngle - radEndAngle) > Math.PI;

    const rotatesBackward =
      radEndAngle > Math.PI &&
      radStartAngle < Math.PI &&
      Math.abs(radStartAngle - radEndAngle) > Math.PI;

    this.antyclokwise = (isRotated && !rotatesBackward) || rotatesForward;
  }
}
