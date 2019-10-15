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

/* ------------------------------ */
/** ----------- Utils ---------- **/
/* ------------------------------ */

export const hypDistance = (p: Point, q: Point): number => {
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

// function computeHyperbolicCircle(p, q) {
//   function findPoint(startPoint, endPoint, l, radius) {
//     const objective = function(z) {
//       const otherPoint = new Point(z[0], (-l.a / l.b) * z[0] - l.c / l.b);
//       return Math.pow(hypDistance(startPoint, otherPoint) - radius, 2);
//     };

//     let tol = 1e10;
//     const resultPoint = startPoint;
//     let i = 1;

//     const dist = endPoint != null ? hypDistance(startPoint, endPoint) : -1;
//     const ePoint = endPoint != null ? endPoint : startPoint;
//     while (
//       (tol > 0.001 && i < 100) ||
//       (tol < 0.001 && hypDistance(ePoint, resultPoint) < dist)
//     ) {
//       let x0;
//       if (endPoint != null)
//         x0 = [startPoint.x - 0.005 * i * (ePoint.x - startPoint.x)];
//       else x0 = [startPoint.x + 0.005 * i * startPoint.x];

//       const sol = numeric.uncmin(objective, x0);
//       const resultPoint = new Point(

//         sol.solution[0],
//         (-l.a / l.b) * sol.solution[0] - l.c / l.b
//         )
//       };
//       tol = sol.f;
//       i = i + 1;
//     }
//     return resultPoint;
//   }

//   function findPoint2(startPoint, l, radius) {
//     objective = function(z) {
//       otherPoint = { x: z[0], y: (-l.a / l.b) * z[0] - l.c / l.b };
//       return Math.pow(hypDistance(startPoint, otherPoint) - radius, 2);
//     };

//     tol = 1e10;
//     resultPoint = startPoint;
//     i = 1;

//     while (tol > 0.001 && i < 1000) {
//       x0 = [startPoint.x + Math.random() / 100];
//       sol = numeric.uncmin(objective, x0);
//       resultPoint = {
//         x: sol.solution[0],
//         y: (-l.a / l.b) * sol.solution[0] - l.c / l.b
//       };
//       tol = sol.f;
//       i = i + 1;
//     }
//     return resultPoint;
//   }
// }
