import { HypPolygon, HypPoint, Point, Plane } from "../core/entity";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";

export class SquareDemo extends Program {
  polygon: HypPolygon;
  polygon2: HypPolygon;

  constructor(canvas: Canvas) {
    super(canvas);

    window.addEventListener("mousemove", () => {
      const point = this.point.toHypPoint(this.plane);
      const x = point.x;
      const y = point.y;

      const point1 = new HypPoint(
        x + 0.3,
        y - 0.3,
        this.plane
      ).toCanvasCoords();
      const point2 = new HypPoint(
        x - 0.3,
        y - 0.3,
        this.plane
      ).toCanvasCoords();
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
      this.polygon2 = this.polygon.moebius(point, 0).reflect(point);
    });
  }

  createLoop() {
    if (this.polygon) {
      this.canvas.setColors("rgba(255,173,0,0.5)");
      this.canvas.drawHypPolygon(this.polygon, true);

      this.canvas.setColors("rgba(173,255,0,0.5)");
      this.canvas.drawHypPolygon(this.polygon2, true);

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
