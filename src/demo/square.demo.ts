import { HypPolygon, Point, CartesianPoint } from "../core/entity";
import { Canvas } from "../core/canvas";
import { Plane } from "../core/plane";

export class SquaewDemo {
  polygon: HypPolygon;
  canvas: Canvas;
  plane: Plane;

  constructor(canvas: Canvas) {
    this.plane = Plane.getInstance();
    this.canvas = canvas;

    const point1 = new CartesianPoint(-0.5, 0.5, this.plane).toCanvasCoords();
    const point2 = new CartesianPoint(0.5, 0.5, this.plane).toCanvasCoords();
    const point3 = new CartesianPoint(0.5, -0.5, this.plane).toCanvasCoords();
    const point4 = new CartesianPoint(-0.5, -0.5, this.plane).toCanvasCoords();

    this.polygon = new HypPolygon(point1, point2, this.plane);
    this.polygon.addVerticle(point3);
    this.polygon.addVerticle(point4);
  }

  createLoop() {
    if (this.polygon) {
      this.canvas.setColors("rgba(255,173,0,0.5)");
      this.canvas.drawHypPolygon(this.polygon, true);

      this.canvas.setColors("#915");
      this.polygon.verticles.forEach(verticle => {
        this.canvas.drawPoint(verticle);
      });

      this.canvas.setColors("#bbb5");
      this.polygon.getCompletePolygonLines().forEach(element => {
        this.canvas.drawCircle(element.arc);
      });
    }
  }
}
