import { Circle, Point, Line, HypPolygon, HypLine } from "./entity";
import CONFIG = require("../assets/config.json");

export class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  plane: Circle;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = context;
    this.setupCanvas();
  }

  setupCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.setLineWidth(2);

    // set canvas origin to the lower-left corner
    this.ctx.translate(0, this.canvas.height);
    this.ctx.scale(1, -1);

    // setup plane
    this.plane = new Circle(
      new Point(this.canvas.width / 2, this.canvas.height / 2),
      Math.min((this.canvas.height - 100) / 2, (this.canvas.width - 100) / 2)
    );
  }

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

  setColors(color: string) {
    this.ctx.strokeStyle = color;
    this.ctx.fillStyle = color;
  }

  setLineWidth(weight: number) {
    this.ctx.lineWidth = weight;
  }

  drawOverlay() {
    // draw background
    this.setColors(CONFIG.BACKGROUND_COLOR);
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // draw plane
    const gradient = this.ctx.createRadialGradient(
      this.plane.center.x,
      this.plane.center.y,
      10,
      this.plane.center.x,
      this.plane.center.y,
      this.plane.radius
    );

    gradient.addColorStop(0, CONFIG.PLANE.INNER_COLOR);
    gradient.addColorStop(1, CONFIG.PLANE.OUTER_COLOR);
    this.drawCircle(this.plane);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();

    if (CONFIG.PLANE.DRAW_CENTER) {
      this.setColors("#FFF");
      this.drawPoint(this.plane.center);
    }
  }
}
