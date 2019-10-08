import { Point, Circle } from "./entity";

export const euclidean = (p: Point, q: Point): number => {
  return Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
};

export const hypDistance = (p: Point, q: Point): number => {
  // https://en.wikipedia.org/wiki/Poincar%C3%A9_disk_model#Distance
  const numer = 2 * (Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2));
  const denominator =
    (1 - (Math.pow(p.x, 2) + Math.pow(p.y, 2))) *
    (1 - (Math.pow(q.x, 2) + Math.pow(q.y, 2)));
  return Math.acosh(1 + numer / denominator);
};

export const slope = (a: Point, b: Point): number => {
  return (b.y - a.y) / (b.x - a.x);
};

export const perpLine = (l: number): number => {
  return -1 / l;
};

export const atan2ToRad = (angle: number): number => {
  return angle < 0 ? Math.abs(angle) : Math.PI * 2 - angle;
};

export function circleIntersection(c1: Circle, c2: Circle): [Point, Point] {
  /* dx and dy are the vertical and horizontal distances between
   * the circle centers.
   */
  const dx = c2.center.x - c1.center.x;
  const dy = c2.center.y - c1.center.y;
  /* Determine the straight-line distance between the centers. */
  const d = Math.sqrt(dy * dy + dx * dx);
  /* 'point 2' is the point where the line through the circle
   * intersection points crosses the line between the circle
   * centers.
  /* Determine the distance from point 0 to point 2. */
  const a = (c1.radius * c1.radius - c2.radius * c2.radius + d * d) / (2.0 * d);
  /* Determine the coordinates of point 2. */
  const x2 = c1.center.x + (dx * a) / d;
  const y2 = c1.center.y + (dy * a) / d;
  /* Determine the distance from point 2 to either of the
   * intersection points.
   */
  const h = Math.sqrt(c1.radius * c1.radius - a * a);
  /* Now determine the offsets of the intersection points from
   * point 2.
   */
  const rx = -dy * (h / d);
  const ry = dx * (h / d);
  return [
    new Point(Math.floor(x2 + rx), Math.floor(y2 + ry)),
    new Point(Math.floor(x2 - rx), Math.floor(y2 - ry))
  ];
}
