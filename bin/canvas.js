const isNil = (value) => value === null || value === undefined;
const TAU = 2 * Math.PI;
class Point {
    constructor(x, y, inverse) {
        this.x = x;
        this.y = inverse ? 1 - y : y;
    }
    scale(canvas, inverse) {
        return canvas.scalePoint(this, inverse);
    }
    equals(otherPoint) {
        return this.x === otherPoint.x && this.y === otherPoint.y;
    }
    between(p1, p2) {
        return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }
    slopeBetween(p1, p2) {
        return (p1.y - p2.y) / (p1.x - p2.x);
    }
    bisectorSlopeBetween(p1, p2) {
        return -1 / this.slopeBetween(p1, p2);
    }
}
class Line {
}
class Canvas {
    constructor(canvas, context) {
        this.euclideanDistance = function (p1, p2) {
            return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        };
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
    pointAt(x, y, arr, inverse) {
        if (!isNil(arr)) {
            y = x[1];
            x = x[0];
        }
        return new Point(x / this.radius - 1, y / this.radius - 1, inverse);
    }
    scalePoint(point, inverse) {
        var x = (point.x + 1) * this.radius;
        var y = (point.y + 1) * this.radius;
        return [x, inverse ? this.diameter - y : y];
    }
    drawLineThroughIdealPoints(t1, t2) {
        var diff = t1 > t2 ? t1 - t2 : t2 - t1;
        var halfDiff = diff / 2;
        var farSide = Math.sin(halfDiff);
        var hyp = 1 / Math.sin(Math.PI / 2 - halfDiff);
    }
    drawPolygon(vertices) {
        var n = vertices.length;
        if (n < 3) {
            return false;
        }
        for (var i = 0; i < n; i++) {
            this.drawLine(vertices[i], vertices[(i + 1) % n]);
        }
        return true;
    }
    drawNGondrawNGon(n, center, radius, rotation) {
        if (n < 3) {
            return false;
        }
        var direction = rotation || 0;
        var increment = TAU / n;
        var vertices = [];
        for (var i = 0; i < n; i++) {
            vertices.push(this.findDistantPoint(center, radius, direction));
            direction += increment;
        }
        return this.drawPolygon(vertices);
    }
    drawPolygonFromPoints(vertices) {
    }
    findDistantPoint(point, distance, direction) {
    }
    drawLine(p1, p2, infinite) {
    }
    distanceFromCenter(p) {
        var r = this.euclideanDistance(p, new Point(0, 0));
        var base = 1.1;
        return Math.log((1 + r) / (1 - r)) / Math.log(base);
    }
    hyperbolicDistance(p1, p2) {
    }
    centerOfCircleFromThreePoints(p1, p2, p3) {
        if (p1.equals(p2) || p1.equals(p3) || p2.equals(p3)) {
            return null;
        }
        var x, y;
        var c1 = new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
        var c2 = new Point((p3.x + p2.x) / 2, (p3.y + p2.y) / 2);
        var m1 = (-1 * (p1.x - p2.x)) / (p1.y - p2.y);
        var m2 = (-1 * (p3.x - p2.x)) / (p3.y - p2.y);
        if (m1 === m2) {
            return null;
        }
        if (m1 === Infinity || m1 === -Infinity) {
            x = c1.x;
        }
        else if (m2 === Infinity || m2 === -Infinity) {
            x = c2.x;
        }
        if (m1 === 0) {
            y = c1.y;
        }
        else if (m2 === 0) {
            y = c2.y;
        }
        x = x || (c1.x * m1 - c2.x * m2 + c2.y - c1.y) / (m1 - m2);
        if (m1 === Infinity || m1 === -Infinity) {
            y = y || m2 * (x - c2.x) + c2.y;
        }
        else {
            y = y || m1 * (x - c1.x) + c1.y;
        }
        return new Point(x, y);
    }
}
