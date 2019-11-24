import { Plane, Point } from "./entity";
import { Canvas } from "./canvas";

export class Program {
  canvas: Canvas;
  plane: Plane;
  point: Point;

  constructor(canvas: Canvas) {
    this.plane = Plane.getInstance();
    this.canvas = canvas;

    window.addEventListener("mousemove", e => {
      this.point = new Point(e.clientX, canvas.canvas.height - e.clientY);
    });
  }

  onLoop(): void {}
}
