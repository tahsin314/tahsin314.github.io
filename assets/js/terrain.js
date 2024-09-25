p5.disableFriendlyErrors = true; // disables FES

let cols, rows;
let scl = 30; // Increased Scale (lower resolution)
let w = 2000;
let h = 1600;
let terrain;
let flying = 0.0;

function setup() {
    let canvasContainer = document.getElementById('canvasContainer');
    if (!canvasContainer) {
        console.error('Canvas container not found.');
        return;
    }
    let width = canvasContainer.offsetWidth;
    let height = canvasContainer.offsetHeight;
    let canvas = createCanvas(width, height, WEBGL);
    canvas.parent('canvasContainer');

    cols = floor(w / scl); // Calculate number of columns
    rows = floor(h / scl); // Calculate number of rows
}

function draw() {
    flying += 0.1; // Slower flying speed

    background(33);
    strokeWeight(2);

    let yoff = flying;
    translate(0, 50);
    rotateX(PI / 3);
    translate(-w / 2, -h / 2);

    for (let y = 0; y < rows; y++) {
        let xoff = 0.5;
        beginShape(POINTS); // Start drawing shape
        for (let x = 0; x < cols; x++) {
            let z = map(noise(xoff, yoff), 0, 1, -100, 250);
            stroke(getColor(z)); // Use height-based color
            vertex(x * scl, y * scl, z); // Add vertex point
            xoff += 0.1;
        }
        endShape(); // End drawing shape
        yoff += 0.1;
    }
}

function getColor(z) {
    const colors = [
        color(0, 0, 0),
        color(78, 0, 103),
        color(128, 38, 143),
        color(180, 54, 148),
        color(229, 80, 128),
        color(251, 142, 102),
        color(253, 231, 37)
    ];

    let t = map(z, -200, 250, 0, 1); // Normalize z to [0, 1]
    if (t < 0.17) return lerpColor(colors[0], colors[1], map(t, 0, 0.17, 0, 1));
    else if (t < 0.34) return lerpColor(colors[1], colors[2], map(t, 0.17, 0.34, 0, 1));
    else if (t < 0.51) return lerpColor(colors[2], colors[3], map(t, 0.34, 0.51, 0, 1));
    else if (t < 0.68) return lerpColor(colors[3], colors[4], map(t, 0.51, 0.68, 0, 1));
    else if (t < 0.85) return lerpColor(colors[4], colors[5], map(t, 0.68, 0.85, 0, 1));
    else return lerpColor(colors[5], colors[6], map(t, 0.85, 1.0, 0, 1));
}
