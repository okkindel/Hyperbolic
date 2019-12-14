import { atan2ToRad, euclidean } from "../../geometry";
import { head, last } from "ramda";
import { Circle } from "../Circle";
import { Plane } from "../Plane";
import { Point } from "../Point";

/**
 * Line in Poincare concept.
 */
export class HypLine {
  anticlockwise = false;
  startAngle: number;
  endAngle: number;
  plane: Plane;
  arc: Circle;
  p: Point;
  q: Point;

  constructor(p: Point, q: Point, plane: Plane) {
    this.plane = plane;
    this.arc = this.calculateArc(p, q, plane);
    this.countAngle(this.arc);
  }

  private calculateArc(p: Point, q: Point, plane: Plane): Circle {
    const validPoint = p.x === plane.center.x && p.y === plane.center.y ? q : p;
    const arc = Circle.fromPoints(p, q, validPoint.inversion(plane));
    this.p = this.cutIfSticksOut(p, arc, plane);
    this.q = this.cutIfSticksOut(q, arc, plane);
    return arc;
  }

  private cutIfSticksOut(point: Point, circle: Circle, plane: Plane): Point {
    if (euclidean(point, plane.center) > plane.radius) {
      const intersection = plane.intersectPoints(circle);
      return euclidean(point, head(intersection)) <
        euclidean(point, last(intersection))
        ? head(intersection)
        : last(intersection);
    }
    return point;
  }

  private countAngle(circle: Circle) {
    this.startAngle = Math.atan2(
      this.p.y - circle.center.y,
      this.p.x - circle.center.x
    );
    this.endAngle = Math.atan2(
      this.q.y - circle.center.y,
      this.q.x - circle.center.x
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

    this.anticlockwise = (isRotated && !rotatesBackward) || rotatesForward;
  }
}
