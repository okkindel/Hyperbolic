import CONFIG = require("../assets/config.json");
import { Program } from "./program";
import { Canvas } from "./canvas";

export class Engine {
  interval: number;
  canvas: Canvas;

  /**
   * Engine initialize function. Get canvas element. Resize element on page resize.
   */
  constructor(canvas: Canvas) {
    this.canvas = canvas;
    /* resize canvas on window resize */
    window.addEventListener("resize", () => {
      this.canvas.setupCanvas();
    });
  }

  /**
   * Main program loop.
   */
  createLoop(program: Program) {
    this.interval = window.setInterval(() => {
      this.canvas.drawOverlay();
      program.onLoop();
    }, 1000 / CONFIG.FRAMES);
  }

  removeLoop() {
    clearInterval(this.interval);
  }
}
