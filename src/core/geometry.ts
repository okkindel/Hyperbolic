import { Point, Line, HypPoint, Plane } from "./entity";

/* ------------------------------ */
/** ------ Creating Point ------ **/
/* ------------------------------ */

export const midpoint = (p1: Point, p2: Point): Point => {
  // https://en.wikipedia.org/wiki/Midpoint
  return new Point((p2.x - p1.x) / 2 + p1.x, (p2.y - p1.y) / 2 + p1.y);
};

export const polarToCartesian = (
  point: Point,
  radius: number,
  slope: number
): Point => {
  return new Point(
    point.x + radius * Math.cos(slope),
    point.y + radius * Math.sin(slope)
  );
};

export const fromPolar = (r: number, t: number): HypPoint => {
  return new HypPoint(r * Math.cos(t), r * Math.sin(t), Plane.getInstance());
};

/* ------------------------------ */
/** ------- Creating Line ------ **/
/* ------------------------------ */

export const bisector = (p: Point, q: Point): Line => {
  const a = perpLine(slope(p, q));
  const mid = midpoint(p, q);
  return Line.fromPointSlope(mid, a);
};

/* ------------------------------ */
/** ----------- Utils ---------- **/
/* ------------------------------ */

export const hypDistance = (p: HypPoint, q: HypPoint): number => {
  // https://en.wikipedia.org/wiki/Poincar%C3%A9_disk_model#Distance
  const numer = 2 * (Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
  const denominator =
    (1 - (Math.pow(p.x, 2) + Math.pow(p.y, 2))) *
    (1 - (Math.pow(q.x, 2) + Math.pow(q.y, 2)));
  return Math.acosh(1 + numer / denominator);
};

export const euclidean = (p: Point, q: Point): number => {
  return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
};

export const perpLine = (l: number): number => {
  return -1 / l;
};

export const slope = (a: Point, b: Point): number => {
  return (b.y - a.y) / (b.x - a.x);
};

export const atan2ToRad = (angle: number): number => {
  return angle < 0 ? Math.abs(angle) : Math.PI * 2 - angle;
};
