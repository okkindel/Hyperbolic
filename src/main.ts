import { Point, HypPolygon, HypLine } from "./core/entity";
import CONFIG = require("./assets/config.json");
import { Canvas } from "./core/canvas";
import { last } from "ramda";
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
  let point: Point;
  let polygon: HypPolygon;

  window.addEventListener("click", e => {
    if (!polygon) {
      if (!point) {
        point = new Point(e.clientX, canvas.canvas.height - e.clientY);
      } else {
        polygon = new HypPolygon(
          point,
          new Point(e.clientX, canvas.canvas.height - e.clientY),
          canvas.plane
        );
      }
    } else {
      polygon.addVerticle(
        new Point(e.clientX, canvas.canvas.height - e.clientY)
      );
    }
  });

  window.addEventListener("mousemove", e => {
    if (polygon) {
      point = new Point(e.clientX, canvas.canvas.height - e.clientY);
    }
  });

  // TEST -----------------------------------------------
  // ----------------------------------------------------

  window.setInterval(() => {
    canvas.drawOverlay();
    test(point, polygon, canvas);
  }, 1000 / CONFIG.FRAMES);
}

// ----------------------------------------------------
// TEST -----------------------------------------------
function test(point: Point, polygon: HypPolygon, canvas: Canvas) {
  if (polygon) {
    canvas.setColors("#150");
    canvas.drawCircle(
      new HypLine(point, last(polygon.verticles), canvas.plane).arc
    );

    canvas.setColors("#650");
    canvas.drawHypLine(
      new HypLine(point, last(polygon.verticles), canvas.plane)
    );

    canvas.setColors("#4005");
    canvas.drawHypPolygon(polygon, true);
  }
}
// TEST -----------------------------------------------
// ----------------------------------------------------
