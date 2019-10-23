import { HypPoint, Point, Plane, HypLine } from "../core/entity";
import { Canvas } from "../core/canvas";
import { euclidean, hypDistance } from "../core/geometry";

export class DistanceDemo {
  line: HypLine;
  canvas: Canvas;
  plane: Plane;

  constructor(canvas: Canvas) {
    this.plane = Plane.getInstance();
    this.canvas = canvas;

    window.addEventListener("mousemove", e => {
      const zero = new HypPoint(0.01, 0.01, this.plane).toCanvasCoords();
      const point = new Point(e.clientX, canvas.canvas.height - e.clientY);
      this.line = new HypLine(zero, point, this.plane);

      const a = new Point(
        zero.toHypPoint(this.plane).x,
        zero.toHypPoint(this.plane).y
      );
      const b = new Point(
        point.toHypPoint(this.plane).x,
        point.toHypPoint(this.plane).y
      );

      console.log("e", euclidean(a, b));
      console.log(
        "h",
        hypDistance(zero.toHypPoint(this.plane), point.toHypPoint(this.plane))
      );
    });
  }

  createLoop() {
    if (this.line) {
      this.canvas.setColors("rgba(255,173,0,0.5)");
      this.canvas.drawHypLine(this.line);
    }
  }
}
