import { HLine } from "./app/hyperbolic";
import { Canvas } from "./app/canvas";
import { Point } from "./app/point";
import "./styles/main.scss";

var canvas: Canvas;

window.onload = () => {
  init();
  createLoop();
};

function init() {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvasElement.getContext("2d");
  canvas = new Canvas(canvasElement, context);

  // resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.setupCanvas();
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
    canvas.drawOverlay();

    canvas.setColors("#fa0");
    canvas.drawPoint(point);
    canvas.drawPoint(moving);
    const resCircle = new HLine(point, moving, canvas.plane);

    canvas.drawCircle(resCircle.circle);

    let minAngle = Math.min(resCircle.startAngle, resCircle.endAngle);
    let maxAngle = Math.max(resCircle.startAngle, resCircle.endAngle);

    // FIXME: wrap 360
    // if (
    //   ((resCircle.circle.center.x < canvas.canvas.width &&
    //     resCircle.circle.center.y < canvas.canvas.height) ||
    //     (resCircle.circle.center.x < canvas.canvas.width &&
    //       resCircle.circle.center.y >= canvas.canvas.height)) &&
    //   minAngle < Math.PI
    // ) {
    //   const temp = minAngle;
    //   minAngle = maxAngle;
    //   maxAngle = temp;
    // }

    canvas.setColors("#900");
    canvas.drawArc(resCircle.circle, minAngle, maxAngle);
  }, 50);
}
