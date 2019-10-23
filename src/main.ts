import { FiguresDemo } from "./demo/figures.demo";
import { PolygonDemo } from "./demo/polygon.demo";
import { Engine } from "./core/engine";
import { Canvas } from "./core/canvas";
import "./styles/main.scss";

var canvas: Canvas;
var engine: Engine;

/**
 * Init hyperbolic canvas engine on page load.
 */
window.onload = () => {
  const element = document.getElementById("canvas") as HTMLCanvasElement;
  canvas = new Canvas(element, element.getContext("2d"));
  engine = new Engine(canvas);
  createChooserButton();

  engine.createLoop(new FiguresDemo(canvas));
};

const createChooserButton = () => {
  const button = document.createElement("button");
  button.className = "button";
  button.onclick = () => {
    engine.removeLoop();
    engine.createLoop(new PolygonDemo(canvas));
  };
  document.body.appendChild(button);
};
