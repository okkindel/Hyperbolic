class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  radius: number;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = context;
    window.addEventListener("resize", this.resizeCanvas);
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    console.log(this.canvas.width, this.canvas.height);
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  distanceFromCenter(x: number, y: number): number {
    var r =
      this.euclideanDistance(x, this.radius, y, this.radius) / this.radius;
    console.log("Euclidean", r);
    return Math.log((1 + r) / (1 - r));
  }

  euclideanDistance(x1: number, x2: number, y1: number, y2: number): number {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }
}
