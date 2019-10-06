import { Point } from "./point";
import { Line } from "./line";
import { Circle } from "./circle";

// just simple angle tangent
export type Slope = number;
export type Angle = number;

export const euclidean = (p: Point, q: Point): number => {
  return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
};

// nasze a w ax+b, tangens konta nachylenia do ox
export const slope = (a: Point, b: Point): Slope => {
  return (b.y - a.y) / (b.x - a.x);
};

export const middle = (p1: Point, p2: Point): Point => {
  return new Point((p2.x - p1.x) / 2 + p1.x, (p2.y - p1.y) / 2 + p1.y);
};

export const perpendicular = (l: number): number => {
  return -1 / l;
};

/* ------------------------------ */
/** ------- Creating Line ------ **/
/* ------------------------------ */

export const lineFromPoints = (p: Point, q: Point): Line => {
  const m = slope(p, q);
  const b = -m * p.x + p.y;
  return new Line(m, b);
};

export const lineFromPointSlope = (p: Point, m: Slope): Line => {
  const b = -m * p.x + p.y;
  return new Line(m, b);
};

export const bisector = (p: Point, q: Point): Line => {
  const a = perpendicular(slope(p, q));
  const mid = middle(p, q);
  return lineFromPointSlope(mid, a);
};

/* ------------------------------ */
/** ------ Creating Circle ----- **/
/* ------------------------------ */

export const circleFromPoints = (p: Point, q: Point, r: Point): Circle => {
  const l1 = bisector(p, q);
  const l2 = bisector(q, r);
  const origin = l1.intersect(l2);
  const radius = euclidean(p, origin);
  return new Circle(origin, radius);
};
