import {
  HypPolygon,
  Point,
  CartesianPoint,
  HyperbolicPoint
} from "../core/entity";
import { Canvas } from "../core/canvas";
import { Plane } from "../core/plane";

export class SquaewDemo {
  polygon: HypPolygon;
  canvas: Canvas;
  plane: Plane;

  constructor(canvas: Canvas) {
    this.plane = Plane.getInstance();
    this.canvas = canvas;

    window.addEventListener("mousemove", e => {
      const point = new Point(
        e.clientX,
        canvas.canvas.height - e.clientY
      ).toCartesianCoords(this.plane);

      const x = point.x;
      const y = point.y;

      const point1 = new HyperbolicPoint(
        new CartesianPoint(x - 0.3, y + 0.3, this.plane),
        this.plane
      ).toCanvasCoords();
      const point2 = new HyperbolicPoint(
        new CartesianPoint(x + 0.3, y + 0.3, this.plane),
        this.plane
      ).toCanvasCoords();
      const point3 = new HyperbolicPoint(
        new CartesianPoint(x + 0.3, y - 0.3, this.plane),
        this.plane
      ).toCanvasCoords();
      const point4 = new HyperbolicPoint(
        new CartesianPoint(x - 0.3, y - 0.3, this.plane),
        this.plane
      ).toCanvasCoords();

      this.polygon = new HypPolygon(point1, point2, this.plane);
      this.polygon.addVerticle(point3);
      this.polygon.addVerticle(point4);
    });
  }

  createLoop() {
    if (this.polygon) {
      this.canvas.setColors("rgba(255,173,0,0.5)");
      this.canvas.drawHypPolygon(this.polygon, true);

      this.canvas.setColors("#915");
      this.polygon.verticles.forEach(verticle => {
        this.canvas.drawPoint(verticle);
      });

      this.polygon.getCompletePolygonLines().forEach(element => {
        this.canvas.setColors("#bbb5");
        this.canvas.drawCircle(element.arc);
      });
    }
  }
}
