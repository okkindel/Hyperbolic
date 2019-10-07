import { Point, HypLine } from "./core/entity";
import { Canvas } from "./core/canvas";
import "./styles/main.scss";

/**
 * Canvas object.
 */
var canvas: Canvas;

/**
 * Init hyperbolic canvas engine on page load
 */
window.onload = () => {
  init();
  createLoop();
};

/**
 * Engine initialize function. Get canvas element. Resize element on page resize.
 */
function init() {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const context = canvasElement.getContext("2d");
  canvas = new Canvas(canvasElement, context);

  // resize canvas on window resize
  window.addEventListener("resize", () => {
    canvas.setupCanvas();
  });
}

/**
 * Main program loop.
 */
function createLoop() {
  // ----------------------------------------------------
  // TEST -----------------------------------------------
  // ----------------------------------------------------
  let point = new Point(canvas.canvas.width / 2, canvas.canvas.height / 2);
  window.addEventListener("click", e => {
    point = new Point(e.clientX, canvas.canvas.height - e.clientY);
  });

  let moving = new Point(0, 0);
  window.addEventListener("mousemove", e => {
    moving = new Point(e.clientX, canvas.canvas.height - e.clientY);
  });
  // ----------------------------------------------------
  // TEST -----------------------------------------------
  // ----------------------------------------------------

  window.setInterval(() => {
    canvas.drawOverlay();
    test(point, moving, canvas);
  }, 50);
}

// ----------------------------------------------------
// TEST -----------------------------------------------
// ----------------------------------------------------
function test(point: Point, moving: Point, canvas: Canvas) {
  canvas.setColors("rgba(105,24,48,0.5)");
  canvas.drawPoint(point);
  canvas.drawPoint(moving);
  const resCircle = new HypLine(point, moving, canvas.plane);

  canvas.drawCircle(resCircle.arc);

  let minAngle = Math.min(resCircle.startAngle, resCircle.endAngle);
  let maxAngle = Math.max(resCircle.startAngle, resCircle.endAngle);

  // FIXME: wrap 360
  //   if (
  //     ((resCircle.circle.center.x < 0 && resCircle.circle.center.y < 0) ||
  //       (resCircle.circle.center.x < 0 && resCircle.circle.center.y >= 0)) &&
  //     minAngle < Math.PI
  //   ) {
  //     const temp = minAngle;
  //     minAngle = maxAngle;
  //     maxAngle = temp;
  //   }

  canvas.setColors("#000");
  canvas.drawArc(resCircle.arc, minAngle, maxAngle);
}
// ----------------------------------------------------
// TEST -----------------------------------------------
// ----------------------------------------------------
