const width = 1250;
const height = 565;

// intersect point between two 2d circles,
// which as {-1, 1} to select the one you want
// ported from https://www.shadertoy.com/view/ltG3z1
// See also https://stackoverflow.com/a/3349134/4004986
const intersect = (c0, r0, c1, r1, which) => {
    const dxy = c1.copy().sub(c0);
    const d = dxy.mag();
    const a = (r0 * r0 - r1 * r1 + d * d) / (2.0 * d);
    const p2 = c0.copy().add(dxy.copy().mult(a / d));
    const h = sqrt(r0 * r0 - a * a);
    const rxy = new p5.Vector(-dxy.y * (h / d), dxy.x * (h / d));
    return p2.copy().add(rxy.copy().mult(which));
};

window.setup = function () {
    createCanvas(1250, 565);
    rectMode(RADIUS);
    ellipseMode(RADIUS);
};

window.draw = function () {
    background(255);

    stroke(0);
    strokeWeight(5);
    noFill(); 

    const c0 = new p5.Vector(200, 200);
    const r0 = 100;

    const c1 = new p5.Vector(260, 200);
    const r1 = 150;

    ellipse(c0.x, c0.y, r0);
    ellipse(c1.x, c1.y, r1);

    const p1 = intersect(c0, r0, c1, r1, -1);
    const p2 = intersect(c0, r0, c1, r1, 1);

    noStroke();
    fill(255, 0, 0);
    rect(p1.x, p1.y, 5);
    fill(0, 255, 0);
    rect(p2.x, p2.y, 5);
};
