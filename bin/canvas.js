var Canvas = (function () {
    function Canvas(canvas, context) {
        this.canvas = canvas;
        this.ctx = context;
        window.addEventListener("resize", this.resizeCanvas);
        this.resizeCanvas();
    }
    Canvas.prototype.resizeCanvas = function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        console.log(this.canvas.width, this.canvas.height);
        this.draw();
    };
    Canvas.prototype.draw = function () {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    Canvas.prototype.distanceFromCenter = function (x, y) {
        var r = this.euclideanDistance(x, this.radius, y, this.radius) / this.radius;
        console.log("Euclidean", r);
        return Math.log((1 + r) / (1 - r));
    };
    Canvas.prototype.euclideanDistance = function (x1, x2, y1, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
    return Canvas;
}());
