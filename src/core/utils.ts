import { Point } from "./entity";

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
