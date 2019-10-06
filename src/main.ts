import { circleFromPoints, inversion } from "./app/math";
import { drawPoint, drawCircle } from "./app/utils";
import { Canvas } from "./app/canvas";
import { Point } from "./app/point";
import "./styles/main.scss";

var canvas: Canvas;

window.onload = () => {
  init();
  createLoop();
};

function init() {
  const canvasHTML = <HTMLCanvasElement>document.getElementById("canvas");
  const context = canvasHTML.getContext("2d");
  canvas = new Canvas(canvasHTML, context);

  // resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.setCanvas();
  });
}

function createLoop() {
  let point = new Point(canvas.canvas.width / 2, canvas.canvas.height / 2);
  window.addEventListener("click", e => {
    point = new Point(e.clientX, canvas.canvas.height - e.clientY);
  });

  let moving = new Point(0, 0);
  window.addEventListener("mousemove", e => {
    moving = new Point(e.clientX, canvas.canvas.height - e.clientY);
  });

  window.setInterval(() => {
    canvas.setCanvas();

    canvas.changeColors("#fa0");
    drawPoint(canvas.ctx, point);
    drawPoint(canvas.ctx, moving);

    drawCircle(
      canvas.ctx,
      circleFromPoints(point, moving, inversion(canvas.basicCircle, point))
    );
  }, 50);
}
