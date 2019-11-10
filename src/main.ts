import { TesselationDemo } from "./demo/tesselation.demo";
import { InteractionDemo } from "./demo/interaction.demo";
import { FiguresDemo } from "./demo/figures.demo";
import { PolygonDemo } from "./demo/polygon.demo";
import { RegularDemo } from "./demo/regular.demo";

import { Engine } from "./core/engine";
import { Canvas } from "./core/canvas";
import { head } from "ramda";
import "./styles/main.scss";

var programs = [
  InteractionDemo,
  TesselationDemo,
  FiguresDemo,
  PolygonDemo,
  RegularDemo
];
var canvas: Canvas;
var engine: Engine;

/**
 * Init hyperbolic canvas engine on page load.
 */
window.onload = () => {
  const element = document.getElementById("canvas") as HTMLCanvasElement;
  canvas = new Canvas(element, element.getContext("2d"));
  engine = new Engine(canvas);
  createChooserButtons();

  engine.createLoop(new InteractionDemo(canvas));
};

/**
 * Create buttons for choosing programs.
 */
const createChooserButtons = () => {
  const div = document.createElement("buttons");
  div.className = "buttons";

  programs.forEach(program => {
    const button = document.createElement("button");
    button.innerHTML = head(program.name);
    button.onclick = () => {
      engine.removeLoop();
      engine.createLoop(new program(canvas));
    };
    div.appendChild(button);
  });

  document.body.appendChild(div);
};
