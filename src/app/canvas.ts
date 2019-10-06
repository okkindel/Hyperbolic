export class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = context;

    // match to borders on resize
    window.addEventListener("resize", this.resizeCanvas);
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    console.log(this.canvas.width, this.canvas.height);
    this.draw();
  }

  draw() {
    this.ctx.fillStyle = "#123";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
