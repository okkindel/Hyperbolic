import { drawCircle, drawPoint, drawArc, drawLine } from "./utils";
import { inversion, circleFromPoints, bisector } from "./math";
import { Circle } from "./circle";
import { Point } from "./point";
import { min } from "ramda";

export class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  basicCircle: Circle;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = context;
    this.setCanvas();
  }

  changeColors(color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
  }

  setCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;

    // set canvas origin to the lower-left corner
    this.ctx.translate(0, this.canvas.height);
    this.ctx.scale(1, -1);

    this.drawOverlay();
  }

  drawOverlay() {
    this.ctx.fillStyle = "#123";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const basicRadius = min(
      (this.canvas.height - 100) / 2,
      (this.canvas.width - 100) / 2
    );

    const middlePoint = new Point(
      this.canvas.width / 2,
      this.canvas.height / 2
    );

    this.ctx.strokeStyle = "#FFF";
    this.ctx.fillStyle = "#FFF";

    const basicCircle = new Circle(middlePoint, basicRadius);
    this.basicCircle = basicCircle;
    drawPoint(this.ctx, middlePoint);
    drawCircle(this.ctx, basicCircle);
  }
}
