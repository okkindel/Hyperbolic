import { HypPolygon, Point, HypLine } from "../core/entity";
import { Canvas } from "../core/canvas";
import { Plane } from "../core/plane";
import { last } from "ramda";

export class PolygonDemo {
  polygon: HypPolygon;
  moving_point: Point;
  canvas: Canvas;
  plane: Plane;
  point: Point;

  constructor(canvas: Canvas) {
    this.plane = Plane.getInstance();
    this.canvas = canvas;

    window.addEventListener("click", e => {
      if (!this.polygon) {
        if (!this.point) {
          this.point = new Point(e.clientX, canvas.canvas.height - e.clientY);
        } else {
          this.polygon = new HypPolygon(
            this.point,
            new Point(e.clientX, canvas.canvas.height - e.clientY),
            Plane.getInstance()
          );
        }
      } else {
        this.polygon.addVerticle(
          new Point(e.clientX, canvas.canvas.height - e.clientY)
        );
      }
    });

    window.addEventListener("mousemove", e => {
      this.moving_point = new Point(
        e.clientX,
        canvas.canvas.height - e.clientY
      );
    });
  }

  createLoop() {
    if (this.polygon) {
      this.canvas.setColors("#bbb5");
      this.canvas.drawCircle(
        new HypLine(this.moving_point, last(this.polygon.verticles), this.plane)
          .arc
      );

      this.canvas.setColors("rgba(255,173,0,0.5)");
      this.canvas.drawHypPolygon(this.polygon, true);

      this.canvas.setColors("#FFF");
      this.canvas.drawHypLine(
        new HypLine(last(this.polygon.verticles), this.moving_point, this.plane)
      );

      this.canvas.setColors("#915");
      this.polygon.verticles.forEach(verticle => {
        this.canvas.drawPoint(verticle);
      });

      this.canvas.drawPoint(this.moving_point);
    } else if (this.point) {
      this.canvas.setColors("#bbb5");
      this.canvas.drawCircle(
        new HypLine(this.point, this.moving_point, this.plane).arc
      );

      this.canvas.setColors("#FFF");
      this.canvas.drawHypLine(
        new HypLine(this.point, this.moving_point, this.plane)
      );

      this.canvas.drawPoint(this.point);
    }
  }
}
