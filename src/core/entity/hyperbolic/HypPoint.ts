import { fromPolar } from "../../geometry";
import { Point } from "../Point";
import { Plane } from "../Plane";

export class HypPoint {
  norm2: number;
  plane: Plane;
  x: number;
  y: number;

  constructor(x: number, y: number, plane: Plane) {
    this.norm2 = x * x + y * y;
    this.plane = plane;
    this.x = x;
    this.y = y;
  }

  toCanvasCoords(): Point {
    return new Point(
      this.x * this.plane.radius + this.plane.windowWidth / 2,
      this.y * this.plane.radius + this.plane.windowHeight / 2
    );
  }

  /**
   * https://mathcs.clarku.edu/~djoyce/poincare/Point.java
   *
   * Reflect the point A through this point B to get the returned point C.
   * The rule for computing A thru B (as Point numbers) is:		|
   *
   *            B - t A	         where t = (1+BB')/2, and
   * A |> B = -----------               B' is the Point
   *           t -  A B'                conjugate of B
   */
  reflect(point: HypPoint): HypPoint {
    const t = (1 + this.norm2) / 2;
    const times = point.times(t);
    const numerator = new HypPoint(
      this.x - times.x,
      this.y - times.y,
      this.plane
    );
    const minus = point.times(new HypPoint(this.x, -this.y, this.plane));
    const denominator = new HypPoint(t - minus.x, -minus.y, this.plane);
    return numerator.over(denominator);
  }

  // http://homepages.gac.edu/~hvidsten/geom-text/web-chapters/hyper-transf.pdf
  moebius(point: HypPoint, t: number): HypPoint {
    const minus = new HypPoint(this.x - point.x, this.y - point.y, this.plane);
    const numerator = fromPolar(1, t).times(minus);
    const times = this.times(new HypPoint(point.x, -point.y, this.plane));
    const denominator = new HypPoint(1 - times.x, -times.y, this.plane);
    return numerator.over(denominator);
  }

  times(point: HypPoint | number): HypPoint {
    if (point instanceof HypPoint) {
      return new HypPoint(
        this.x * point.x - this.y * point.y,
        this.y * point.x + this.x * point.y,
        this.plane
      );
    } else {
      return new HypPoint(point * this.x, point * this.y, this.plane);
    }
  }

  over(point: HypPoint | number): HypPoint {
    if (point instanceof HypPoint) {
      const deniminator = point.norm2;
      return new HypPoint(
        (this.x * point.x + this.y * point.y) / deniminator,
        (this.y * point.x - this.x * point.y) / deniminator,
        this.plane
      );
    } else {
      return new HypPoint(this.x / point, this.y / point, this.plane);
    }
  }
}
