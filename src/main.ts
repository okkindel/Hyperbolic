// import { Canvas } from "./app/canvas";
import { Canvas } from "./app/canvas";
import "./styles/main.scss";

// Go to next cycle of program, TOOD: fix it

setTimeout(() => {
  const canvasHTML = <HTMLCanvasElement>document.getElementById("canvas");
  const context = canvasHTML.getContext("2d");
  new Canvas(canvasHTML, context);
}, 0);
