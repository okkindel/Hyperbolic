import { perpLine, slope, euclidean } from "./utils";
import { Circle, Point, Line } from "./entity";

/* ------------------------------ */
/** ------ Creating Point ------ **/
/* ------------------------------ */

export const inversion = (circle: Circle, p: Point): Point => {
  // https://en.wikipedia.org/wiki/Inversive_geometry#inverse_of_a_point
  const c = circle.center;
  const r = circle.radius;
  const denominator = Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2);
  return new Point(
    c.x + (r * r * (p.x - c.x)) / denominator,
    c.y + (r * r * (p.y - c.y)) / denominator
  );
};

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

/* ------------------------------ */
/** ------- Creating Line ------ **/
/* ------------------------------ */

export const lineFromPoints = (p: Point, q: Point): Line => {
  const m = slope(p, q);
  const b = -m * p.x + p.y;
  return new Line(m, b);
};

export const lineFromPointSlope = (p: Point, m: number): Line => {
  const b = -m * p.x + p.y;
  return new Line(m, b);
};

export const bisector = (p: Point, q: Point): Line => {
  const a = perpLine(slope(p, q));
  const mid = midpoint(p, q);
  return lineFromPointSlope(mid, a);
};

/* ------------------------------ */
/** ------ Creating Circle ----- **/
/* ------------------------------ */

export const circleFromPoints = (p: Point, q: Point, r: Point): Circle => {
  // https://www.qc.edu.hk/math/Advanced%20Level/circle%20given%203%20points.htm
  const b1 = bisector(p, q);
  const b2 = bisector(q, r);
  const center = b1.intersectPoint(b2);
  const radius = euclidean(p, center);
  return new Circle(center, radius);
};
