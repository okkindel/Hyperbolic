import { Point } from "./Point";

export class Circle {
  center: Point;
  radius: number;

  constructor(center: Point, radius: number) {
    this.center = center;
    this.radius = radius;
  }

  intersectPoints(circle: Circle): [Point, Point] {
    /* dx and dy are the vertical and horizontal distances between
     * the circle centers.
     */
    const dx = circle.center.x - this.center.x;
    const dy = circle.center.y - this.center.y;
    /* Determine the straight-line distance between the centers. */
    const d = Math.sqrt(dy * dy + dx * dx);
    /* 'point 2' is the point where the line through the circle
     * intersection points crosses the line between the circle
     * centers.
    /* Determine the distance from point 0 to point 2. */
    const a =
      (this.radius * this.radius - circle.radius * circle.radius + d * d) /
      (2.0 * d);
    /* Determine the coordinates of point 2. */
    const x2 = this.center.x + (dx * a) / d;
    const y2 = this.center.y + (dy * a) / d;
    /* Determine the distance from point 2 to either of the
     * intersection points.
     */
    const h = Math.sqrt(this.radius * this.radius - a * a);
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
}
