class Canvas {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  diameter: number;
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
    this.ctx.fillStyle = "#123";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /*
   * returns a Point object with attributes x and y, relative to canvas center
   */
  pointAt(x?: number, y?: number, arr?: number[], inverse?: boolean) {
    // this should allow function to be called with (array, boolean) as well
    if (!isNil(arr)) {
      y = x[1];
      x = x[0];
    }
    return new Point(x / this.radius - 1, y / this.radius - 1, inverse);
  }

  drawLineThroughIdealPoints(t1: number, t2: number) {
    // TODO special case where t1 + t2 === TAU
    //      tangent lines are parallel, and never intersect
    //      hyp === 1 / 0 === Infinity === bad
    //
    //      just draw a straight line?  Does the line exist?
    var diff = t1 > t2 ? t1 - t2 : t2 - t1;
    var halfDiff = diff / 2;
    var farSide = Math.sin(halfDiff); // ?
    var hyp = 1 / Math.sin(Math.PI / 2 - halfDiff);
    // hyp is distance to center of circle whose arc is the line in question
  }

  distanceFromCenter(p: Point) {
    // TODO "edge cases" (ha!) in which a point sufficiently close to boundary is NaN due to floating point math
    var r = this.euclideanDistance(p, new Point(0, 0));
    // TODO is this the right base to use?  is base related to curvature?
    var base = 1.1;
    return Math.log((1 + r) / (1 - r)) / Math.log(base);
  }

  euclideanDistance = function(p1: Point, p2: Point) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  hyperbolicDistance(p1: Point, p2: Point) {
    // TODO distance between 2 points
  }

  // centerOfCircleFromThreePoints(p1: Point, p2: Point, p3: Point): Point {
  //   // TODO make someone else check this
  //   if (p1.equals(p2) || p1.equals(p3) || p2.equals(p3)) {
  //     // points are not unique
  //     // TODO throw exception ?
  //     return null;
  //   }
  //   var x, y;
  //   // center points of chords
  //   var c1 = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
  //   var c2 = new Point((p3.x + p2.x) / 2, (p3.y + p2.y) / 2);
  //   // slopes of chord bisectors
  //   var m1 = (-1 * (p1.x - p2.x)) / (p1.y - p2.y);
  //   var m2 = (-1 * (p3.x - p2.x)) / (p3.y - p2.y);

  //   if (m1 === m2) {
  //     // points are all in a line
  //     // TODO throw exception ?
  //     return null;
  //   }

  //   if (m1 === Infinity || m1 === -Infinity) {
  //     x = c1.x;
  //   } else if (m2 === Infinity || m2 === -Infinity) {
  //     x = c2.x;
  //   }

  //   if (m1 === 0) {
  //     y = c1.y;
  //   } else if (m2 === 0) {
  //     y = c2.y;
  //   }

  //   x = x || (c1.x * m1 - c2.x * m2 + c2.y - c1.y) / (m1 - m2);
  //   if (m1 === Infinity || m1 === -Infinity) {
  //     y = y || m2 * (x - c2.x) + c2.y;
  //   } else {
  //     y = y || m1 * (x - c1.x) + c1.y;
  //   }
  //   return new Point(x, y);
  // }
}
