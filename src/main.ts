import { PolygonDemo } from "./demos/polygon.demo";
import CONFIG = require("./assets/config.json");
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

  /* resize canvas on window resize */
  window.addEventListener("resize", () => {
    canvas.setupCanvas();
  });
}

/**
 * Main program loop.
 */
function createLoop() {
  const demo = new PolygonDemo(canvas);

  window.setInterval(() => {
    canvas.drawOverlay();
    demo.createLoop();
  }, 1000 / CONFIG.FRAMES);
}
