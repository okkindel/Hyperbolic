import { HypPolygon, Point, HypLine } from "../core/entity";
import { Canvas } from "../core/canvas";
import { last } from "ramda";

export class PolygonDemo {
  polygon: HypPolygon;
  moving_point: Point;
  canvas: Canvas;
  point: Point;

  constructor(canvas: Canvas) {
    this.canvas = canvas;

    window.addEventListener("click", e => {
      if (!this.polygon) {
        if (!this.point) {
          this.point = new Point(e.clientX, canvas.canvas.height - e.clientY);
        } else {
          this.polygon = new HypPolygon(
            this.point,
            new Point(e.clientX, canvas.canvas.height - e.clientY),
            canvas.plane
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
      this.canvas.setColors("#9995");
      this.canvas.drawCircle(
        new HypLine(
          this.moving_point,
          last(this.polygon.verticles),
          this.canvas.plane
        ).arc
      );

      this.canvas.setColors("#6255");
      this.canvas.drawHypPolygon(this.polygon, true);

      this.canvas.setColors("#FFF");
      this.canvas.drawHypLine(
        new HypLine(
          last(this.polygon.verticles),
          this.moving_point,
          this.canvas.plane
        )
      );

      this.canvas.setColors("#615");
      this.polygon.verticles.forEach(verticle => {
        this.canvas.drawPoint(verticle);
      });

      this.canvas.drawPoint(this.moving_point);
    } else if (print) {
      this.canvas.setColors("#9995");
      this.canvas.drawCircle(
        new HypLine(this.point, this.moving_point, this.canvas.plane).arc
      );

      this.canvas.setColors("#FFF");
      this.canvas.drawHypLine(
        new HypLine(this.point, this.moving_point, this.canvas.plane)
      );

      this.canvas.drawPoint(this.point);
    }
  }
}
