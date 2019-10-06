import { drawCircle, drawPoint, drawArc } from "./utils";
import { Circle } from "./circle";
import { Point } from "./point";
import { min } from "ramda";
import { inversion, circleFromPoints } from "./math";

export class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = context;
    this.setCanvas();
  }

  setCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
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
    drawPoint(this.ctx, middlePoint);
    drawCircle(this.ctx, basicCircle);

    // --------------------------      --------------------------
    // -------------------------- test --------------------------
    // --------------------------      --------------------------

    const p = new Point(-160, -40);
    drawPoint(this.ctx, p);
    const q = new Point(100, 120);
    drawPoint(this.ctx, q);
    const r = new Point(-30, -90);
    drawPoint(this.ctx, r);
    const pp = inversion(basicCircle, p);
    const qq = inversion(basicCircle, q);
    const rr = inversion(basicCircle, r);

    this.ctx.strokeStyle = "#900";
    drawCircle(this.ctx, circleFromPoints(p, q, rr));
    this.ctx.strokeStyle = "#aa0";
    drawCircle(this.ctx, circleFromPoints(p, r, qq));
    this.ctx.strokeStyle = "#fa0";
    drawCircle(this.ctx, circleFromPoints(r, q, pp));
  }
}
