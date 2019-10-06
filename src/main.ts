// import { Canvas } from "./app/canvas";
import { Canvas } from "./app/canvas";
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
  window.setInterval(() => {
    canvas.setCanvas();
  }, 500);
}
