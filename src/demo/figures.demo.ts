import { HypPolygon, HypPoint, Point } from "../core/entity";
import { euclidean } from "../core/geometry";
import { Program } from "../core/program";
import { Canvas } from "../core/canvas";

export class FiguresDemo extends Program {
  polygons: HypPolygon[];

  constructor(canvas: Canvas) {
    super(canvas);

    window.addEventListener("mousemove", () => {
      const point = this.point.toHypPoint(this.plane);
      const x = point.x;
      const y = point.y;

      this.polygons = [];
      const points: Point[][] = [];
      points.push(this.createSquare(x, y, 0.4));
      points.push(this.createTiangle(x, y + 0.5, 0.1));
      points.push(this.createTiangle(x + 0.5, y, 0.1));
      points.push(this.createSquare(x, y - 0.5, 0.1));
      points.push(this.createTiangle(x - 0.5, y, 0.1));

      points.forEach((element: Point[]) => {
        this.polygons.push(
          HypPolygon.fromVerticles(element, this.plane)
            .moebius(point, 0)
            .reflect(point)
        );
      });
    });
  }

  onLoop() {
    if (
      this.polygons &&
      euclidean(this.point, this.plane.center) < this.plane.radius
    ) {
      this.canvas.setColors("rgba(0,255,126,1)");
      this.polygons.forEach(element => {
        this.canvas.drawHypPolygon(element, true);
      });
      this.canvas.setColors("rgba(0,0,0,1)");
      this.canvas.setLineWidth(1);
      this.polygons.forEach(element => {
        this.canvas.drawHypPolygon(element, false);
      });
    }
  }

  createTiangle(x: number, y: number, dist: number): Point[] {
    const points: Point[] = [];
    points.push(new HypPoint(x, y + dist, this.plane).toCanvasCoords());
    points.push(new HypPoint(x + dist, y - dist, this.plane).toCanvasCoords());
    points.push(new HypPoint(x - dist, y - dist, this.plane).toCanvasCoords());
    return points;
  }

  createSquare(x: number, y: number, dist: number): Point[] {
    const points: Point[] = [];
    points.push(new HypPoint(x + dist, y + dist, this.plane).toCanvasCoords());
    points.push(new HypPoint(x + dist, y - dist, this.plane).toCanvasCoords());
    points.push(new HypPoint(x - dist, y - dist, this.plane).toCanvasCoords());
    points.push(new HypPoint(x - dist, y + dist, this.plane).toCanvasCoords());
    return points;
  }
}
