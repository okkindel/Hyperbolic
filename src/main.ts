import { Engine } from "./core/engine";
import { Canvas } from "./core/canvas";
import "./styles/main.scss";

import { FiguresDemo } from "./demo/figures.demo";
import { DistanceDemo } from "./demo/distance.demo";
import { PolygonDemo } from "./demo/polygon.demo";
import { SquareDemo } from "./demo/square.demo";

/**
 * Init hyperbolic canvas engine on page load.
 */
window.onload = () => {
  const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
  const canvas = new Canvas(canvasElement, canvasElement.getContext("2d"));
  const engine = new Engine(canvas);

  /* simple test programs */
  // const demo = new PolygonDemo(canvas);
  // const demo = new SquareDemo(canvas);
  // const demo = new DistanceDemo(canvas);
  const demo = new FiguresDemo(canvas);

  engine.createLoop(demo);
};
