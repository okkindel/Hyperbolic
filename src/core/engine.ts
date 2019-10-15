import { PolygonDemo } from "../demo/polygon.demo";
import CONFIG = require("../assets/config.json");
import { Canvas } from "./canvas";
import { SquaewDemo } from "../demo/square.demo";

export class Engine {
  /**
   * Canvas object.
   */
  canvas: Canvas;

  /**
   * Engine initialize function. Get canvas element. Resize element on page resize.
   */
  constructor() {
    const canvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const context = canvasElement.getContext("2d");
    this.canvas = new Canvas(canvasElement, context);

    /* resize canvas on window resize */
    window.addEventListener("resize", () => {
      this.canvas.setupCanvas();
    });
  }

  /**
   * Main program loop.
   */
  createLoop() {
    /* just a simple test program */
    // const demo = new PolygonDemo(this.canvas);
    const demo = new SquaewDemo(this.canvas);

    window.setInterval(() => {
      this.canvas.drawOverlay();
      demo.createLoop();
    }, 1000 / CONFIG.FRAMES);
  }
}
