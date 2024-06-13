p5.disableFriendlyErrors = true; // disables FES
let cols, rows;
        let scl = 20; // Scale
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
            canvas.parent('canvasContainer');  // Attach the canvas to the container
        
            cols = w / scl;
            rows = h / scl;
            // terrain = new Array(cols).fill().map(() => new Array(rows));
            temp_terrain = 0;
        }

        function draw() {
            flying += 0.2;
            background(33);
            strokeWeight(2); // Adjust the size of the points
        
            let yoff = flying;
            translate(0, 50);
            rotateX(PI / 3);
            translate(-w / 2, -h / 2);
        
            for (let y = 0; y < rows; y++) {
                let xoff = 0.5;
                for (let x = 0; x < cols; x++) {
                    // Compute terrain height
                    // terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 250);
                    temp_terrain = map(noise(xoff, yoff), 0, 1, -100, 250);
                    
                    // Draw the point
                    push();
                    translate(x * scl, y * scl, temp_terrain);
                    stroke(getColor(temp_terrain)); // Color based on height
                    point();
                    pop();
        
                    xoff += 0.1;
                }
                yoff += 0.1;
            }
        }

        function getColor(z) {
            const colors = [
                color(0, 0, 0),     // Black
                color(78, 0, 103),  // Dark purple
                color(128, 38, 143), // Purple
                color(180, 54, 148), // Lighter purple
                color(229, 80, 128), // Pinkish
                color(251, 142, 102),// Light pink
                color(253, 231, 37)  // Bright yellow
            ];

            let t = map(z, -200, 250, 0, 1); // Normalize z to [0, 1]
            if (t < 0.17) return lerpColor(colors[0], colors[1], map(t, 0, 0.17, 0, 1));
            else if (t < 0.34) return lerpColor(colors[1], colors[2], map(t, 0.17, 0.34, 0, 1));
            else if (t < 0.51) return lerpColor(colors[2], colors[3], map(t, 0.34, 0.51, 0, 1));
            else if (t < 0.68) return lerpColor(colors[3], colors[4], map(t, 0.51, 0.68, 0, 1));
            else if (t < 0.85) return lerpColor(colors[4], colors[5], map(t, 0.68, 0.85, 0, 1));
            else return lerpColor(colors[5], colors[6], map(t, 0.85, 1.0, 0, 1));
        }