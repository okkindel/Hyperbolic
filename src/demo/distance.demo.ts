import { HypPoint, Point, Plane, HypLine } from "../core/entity";
import { Canvas } from "../core/canvas";
import { euclidean, hypDistance } from "../core/geometry";
import { Program } from "../core/program";

export class DistanceDemo extends Program {
  line: HypLine;

  constructor(canvas: Canvas) {
    super(canvas);

    window.addEventListener("mousemove", e => {
      const zero = new HypPoint(0.01, 0.01, this.plane).toCanvasCoords();
      this.line = new HypLine(zero, this.point, this.plane);

      const a = new Point(
        zero.toHypPoint(this.plane).x,
        zero.toHypPoint(this.plane).y
      );
      const b = new Point(this.point.x, this.point.y);

      console.log("e", euclidean(a, b));
      console.log(
        "h",
        hypDistance(
          zero.toHypPoint(this.plane),
          this.point.toHypPoint(this.plane)
        )
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
