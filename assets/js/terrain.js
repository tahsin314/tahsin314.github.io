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
    flying += 0.05; // Slower flying speed

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
            vertex(x * scl, y * scl, 1.5*z); // Add vertex point
            xoff += 0.1;
        }
        endShape(); // End drawing shape
        yoff += 0.1;
    }
}

// Function to get CSS variable values
function getCSSVariable(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function getColor(z) {
    const colors = [
        color(getCSSVariable('--color-secondary')),  // Dark green from CSS variable
        color(getCSSVariable('--color-primary')),    // Light green from CSS variable
        color(getCSSVariable('--color-accent')),     // Light greenish from CSS variable
        color(getCSSVariable('--color-light')),      // Light beige from CSS variable
        color(240, 255, 240) // Fallback for very light color (almost white)
    ];

    let t = map(z, -200, 250, 0, 1); // Normalize z to [0, 1]
    if (t < 0.25) return lerpColor(colors[0], colors[1], map(t, 0, 0.25, 0, 1));
    else if (t < 0.5) return lerpColor(colors[1], colors[2], map(t, 0.25, 0.5, 0, 1));
    else if (t < 0.75) return lerpColor(colors[2], colors[3], map(t, 0.5, 0.75, 0, 1));
    else return lerpColor(colors[3], colors[4], map(t, 0.75, 1.0, 0, 1));
}
