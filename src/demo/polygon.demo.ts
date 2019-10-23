import { HypPolygon, Point, HypLine } from "../core/entity";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";
import { last } from "ramda";

export class PolygonDemo extends Program {
  polygon: HypPolygon;
  clicked: Point;

  constructor(canvas: Canvas) {
    super(canvas);

    window.addEventListener("click", () => {
      if (!this.polygon) {
        if (!this.clicked) {
          this.clicked = this.point;
        } else {
          this.polygon = new HypPolygon(this.clicked, this.point, this.plane);
        }
      } else {
        this.polygon.addVerticle(this.point);
      }
    });
  }

  createLoop() {
    this.canvas.setLineWidth(1);

    if (this.polygon) {
      this.canvas.setColors("#FFF");
      this.canvas.drawCircle(
        new HypLine(this.point, last(this.polygon.verticles), this.plane).arc
      );

      this.canvas.setColors("rgba(252,7,90,1)");
      this.canvas.drawHypPolygon(this.polygon, true);

      this.canvas.setColors("#000");
      this.canvas.drawHypPolygon(this.polygon, false);

      this.canvas.setColors("#222");
      this.canvas.drawHypLine(
        new HypLine(last(this.polygon.verticles), this.point, this.plane)
      );

      this.canvas.setColors("rgba(50,52,49,1)");
      this.polygon.verticles.forEach(verticle => {
        this.canvas.drawPoint(verticle);
      });

      this.canvas.drawPoint(this.point);
    } else if (this.clicked) {
      this.canvas.setColors("#FFF");
      this.canvas.drawCircle(
        new HypLine(this.clicked, this.point, this.plane).arc
      );

      this.canvas.setColors("#222");
      this.canvas.drawHypLine(
        new HypLine(this.clicked, this.point, this.plane)
      );

      this.canvas.drawPoint(this.clicked);
    }
  }
}
