import CONFIG = require("./assets/config.json");
import { Point, HypLine } from "./core/entity";
import { Canvas } from "./core/canvas";
import "./styles/main.scss";

/**
 * Canvas object.
 */
var canvas: Canvas;

/**
 * Init hyperbolic canvas engine on page load.
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
  let lines: HypLine[] = [];
  let isMarked = false;
  let moving: Point;
  let point: Point;

  window.addEventListener("click", e => {
    if (!isMarked) {
      point = new Point(e.clientX, canvas.canvas.height - e.clientY);
      isMarked = true;
    } else {
      const resCircle = new HypLine(point, moving, canvas.plane);
      lines.push(resCircle);
      isMarked = false;
    }
  });

  window.addEventListener("mousemove", e => {
    if (isMarked) {
      moving = new Point(e.clientX, canvas.canvas.height - e.clientY);
    }
  });
  // TEST -----------------------------------------------
  // ----------------------------------------------------

  window.setInterval(() => {
    canvas.drawOverlay();
    test(point, moving, lines, isMarked, canvas);
  }, 1000 / CONFIG.FRAMES);
}

// ----------------------------------------------------
// TEST -----------------------------------------------
function test(
  point: Point,
  moving: Point,
  lines: HypLine[],
  isMarked: boolean,
  canvas: Canvas
) {
  if (isMarked && moving && point) {
    const resCircle = new HypLine(point, moving, canvas.plane);

    // canvas.setColors("#7773");
    // canvas.drawCircle(resCircle.circle);

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
    canvas.drawPoint(point);
    canvas.drawPoint(moving);
    canvas.drawArc(resCircle.arc, minAngle, maxAngle);
  }

  lines.forEach(element => {
    let minAngle = Math.min(element.startAngle, element.endAngle);
    let maxAngle = Math.max(element.startAngle, element.endAngle);
    // TEST
    canvas.setColors("#ccc3");
    canvas.drawSection(element.p, element.q);
    canvas.drawCircle(element.arc);

    canvas.setColors("#123");
    canvas.drawPoint(element.p);
    canvas.drawPoint(element.q);
    canvas.drawArc(element.arc, minAngle, maxAngle);
  });
}
// TEST -----------------------------------------------
// ----------------------------------------------------
