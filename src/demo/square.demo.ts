import { HypPolygon, HypPoint, Point, Plane } from "../core/entity";
import { Canvas } from "../core/canvas";

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
      ).toHypPoint(this.plane);

      const x = point.x;
      const y = point.y;

      const temp1 = new HypPoint(x + 0.3, y - 0.3, this.plane);
      const temp2 = new HypPoint(x - 0.3, y - 0.3, this.plane);
      // const point3 = point.reflect(temp1).toCanvasCoords();
      // const point4 = point.reflect(temp2).toCanvasCoords();
      const point1 = temp1.toCanvasCoords();
      const point2 = temp2.toCanvasCoords();
      const point3 = new HypPoint(
        x - 0.3,
        y + 0.3,
        this.plane
      ).toCanvasCoords();
      const point4 = new HypPoint(
        x + 0.3,
        y + 0.3,
        this.plane
      ).toCanvasCoords();

      this.polygon = new HypPolygon(point1, point2, this.plane);
      this.polygon.addVerticle(point3);
      this.polygon.addVerticle(point4);
      this.polygon = this.polygon.moebius(point, 0);
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
