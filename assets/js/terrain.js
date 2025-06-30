// terrain.js - p5.js sketch for terrain animation

// Ensure p5.js is loaded before this script runs if not using instance mode.
// This script assumes p5.js is available globally.

p5.disableFriendlyErrors = true; 

let cols, rows; 
let scl = 30; 
let w_terrain = 2000; 
let h_terrain = 1600; 
let flying = 0.0;
let terrainColors = {};
let terrainNeedsRefresh = true;


function setup() { 
    let canvasContainer = document.getElementById('canvasContainer');
    if (!canvasContainer) { 
        console.error('Canvas container (canvasContainer) not found for p5.js.'); 
        return; 
    }
    let canvasWidth = canvasContainer.offsetWidth; 
    let canvasHeight = canvasContainer.offsetHeight;
    
    if (canvasWidth === 0 || canvasHeight === 0) { 
        console.warn('p5.js: Canvas container has zero dimensions. Defaulting to 400x200. Ensure the container is visible and has dimensions before setup.');
        canvasWidth = 400; 
        canvasHeight = 200; 
    }

    let canvas = createCanvas(canvasWidth, canvasHeight, WEBGL);
    canvas.parent('canvasContainer');
    cols = floor(w_terrain / scl); 
    rows = floor(h_terrain / scl); 
}

function draw() {
    if (typeof cols === 'undefined') return;

    if (terrainNeedsRefresh || frameCount % 60 === 0) {
        terrainColors = {
            deep: color(getCSSVariable('--terrain-deep')),
            mid: color(getCSSVariable('--terrain-mid')),
            high: color(getCSSVariable('--terrain-high')),
            peak: color(getCSSVariable('--terrain-peak')),
            light: color(240, 255, 240)
        };
        terrainNeedsRefresh = false;
     }

    flying += 0.05;

    let bgColString = getCSSVariable('--terrain-bg-p5') || '#212121';
    background(color(bgColString)); 

    strokeWeight(2); 
    let yoff = flying;
    translate(0, 50);
    rotateX(PI / 3);
    translate(-w_terrain / 2, -h_terrain / 2);

    for (let y = 0; y < rows; y++) {
        let xoff = 0.5;
        beginShape(POINTS);
        for (let x = 0; x < cols; x++) {
            let z = map(noise(xoff, yoff), 0, 1, -100, 250);
            stroke(getColor(z));
            vertex(x * scl, y * scl, 1.5 * z);
            xoff += 0.1;
        }
        endShape();
        yoff += 0.1;
    }
}


// Helper function to get CSS variable values for p5.js
// This needs to be available for p5.js functions like background() and color()
function getCSSVariable(name) { 
    if (document.documentElement) {
        let val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        if (val) return val; // Return as string, p5.js color() can parse it
    }
    // Fallback values if CSS variable is not found or not yet available
    if (name === '--terrain-deep') return '#065f46'; 
    if (name === '--terrain-mid') return '#10b981';   
    if (name === '--terrain-high') return '#34d399'; 
    if (name === '--terrain-peak') return '#6b7280';  
    if (name === '--terrain-bg-p5') return '#212121'; // Default p5 background if var is missing
    return '#FFFFFF'; // Default white for other cases
}

function getColor(z_val) {
    const t = constrain(map(z_val, -200, 250, 0, 1), 0, 1);
    if (t < 0.25) return lerpColor(terrainColors.deep, terrainColors.mid, map(t, 0, 0.25, 0, 1));
    else if (t < 0.5) return lerpColor(terrainColors.mid, terrainColors.high, map(t, 0.25, 0.5, 0, 1));
    else if (t < 0.75) return lerpColor(terrainColors.high, terrainColors.peak, map(t, 0.5, 0.75, 0, 1));
    else return lerpColor(terrainColors.peak, terrainColors.light, map(t, 0.75, 1.0, 0, 1));
}



function windowResized() { 
    let canvasContainer = document.getElementById('canvasContainer');
    if (canvasContainer) {
        let canvasWidth = canvasContainer.offsetWidth; 
        let canvasHeight = canvasContainer.offsetHeight;
         if (canvasWidth > 0 && canvasHeight > 0) { 
            resizeCanvas(canvasWidth, canvasHeight); 
        } else {
            // console.warn("p5.js: Cannot resize canvas, container has zero dimensions on resize.");
        }
    }
}
