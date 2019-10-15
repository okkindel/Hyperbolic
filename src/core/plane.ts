import { Circle, Point } from "./entity";

/**
 * Poincare disc, main plane of engine.
 * This class is singleton pattern.
 */

export class Plane extends Circle {
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  private static instance: Plane;

  private constructor() {
    super(
      new Point(window.innerWidth / 2, window.innerHeight / 2),
      Math.min((window.innerHeight - 100) / 2, (window.innerWidth - 100) / 2)
    );
  }
  static getInstance() {
    if (!Plane.instance) {
      Plane.instance = new Plane();
    }
    return Plane.instance;
  }
}
