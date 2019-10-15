import { Circle, Point, Line, HypPolygon, HypLine } from "./entity";
import CONFIG = require("../assets/config.json");
import { Plane } from "./plane";

export class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = context;
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.setLineWidth(2);
    /* set canvas origin to the lower-left corner */
    this.ctx.translate(0, this.canvas.height);
    this.ctx.scale(1, -1);
  }

  drawOverlay() {
    // draw background
    this.setColors(CONFIG.BACKGROUND_COLOR);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw plane
    const plane = Plane.getInstance();
    const gradient = this.ctx.createRadialGradient(
      plane.center.x,
      plane.center.y,
      10,
      plane.center.x,
      plane.center.y,
      plane.radius
    );
    gradient.addColorStop(0, CONFIG.PLANE.INNER_COLOR);
    gradient.addColorStop(1, CONFIG.PLANE.OUTER_COLOR);

    this.ctx.fillStyle = gradient;
    this.drawCircle(plane);
    this.ctx.fill();

    if (CONFIG.PLANE.DRAW_CENTER) {
      this.setColors("#FFF");
      this.drawPoint(plane.center);
    }
  }

  /********************
   * Drawing funtions *
   *******************/

  drawPoint(point: Point) {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, this.ctx.lineWidth, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  drawLine(line: Line) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, line.at(0));
    this.ctx.lineTo(this.ctx.canvas.width, line.at(this.ctx.canvas.width));
    this.ctx.stroke();
  }

  drawSection(p: Point, q: Point) {
    this.ctx.beginPath();
    this.ctx.moveTo(p.x, p.y);
    this.ctx.lineTo(q.x, q.y);
    this.ctx.stroke();
  }

  drawCircle(circle: Circle) {
    this.ctx.beginPath();
    this.ctx.arc(
      circle.center.x,
      circle.center.y,
      circle.radius,
      0,
      2 * Math.PI
    );
    this.ctx.stroke();
  }

  drawArc(line: HypLine) {
    this.ctx.arc(
      line.arc.center.x,
      line.arc.center.y,
      line.arc.radius,
      line.startAngle,
      line.endAngle,
      line.antyclokwise
    );
  }

  drawHypLine(line: HypLine) {
    this.ctx.beginPath();
    this.drawArc(line);
    this.ctx.stroke();
  }

  drawHypPolygon(polygon: HypPolygon, isFilled?: boolean) {
    this.ctx.beginPath();
    polygon.getCompletePolygonLines().forEach(element => {
      this.drawArc(element);
    });
    this.ctx.stroke();
    if (isFilled) this.ctx.fill();
  }

  /********************
   ** Utils funtions **
   *******************/

  setColors(color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
  }

  setLineWidth(weight: number) {
    this.ctx.lineWidth = weight;
  }
}
