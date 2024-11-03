var line_len = 80;   // Distance between parallel lines
var ne_len = 60;     // Needle length (should be less than line_len for accurate results)
var int_count = 0;   // Count of needles intersecting lines
var tot = 0;         // Total needles dropped
var rate = 1;        // Frame rate for dropping needles
var x_text, y_text;

function setup() {
  let canvas = createCanvas(1200, 800);
  canvas.parent("sketch-canvas");  // Attach the canvas to the div with id 'sketch-canvas'
  background("#CAF0F8");
  frameRate(rate);
  textFont("Arial");
  textSize(32);
  x_text = width / 2 - 100; 
  y_text = 40;

  // Draw the parallel lines once
  stroke("#03045E");
  strokeWeight(2);
  for (var i = 0; i <= height / line_len; i++) {
    line(0, i * line_len, width, i * line_len);
  }
}

function draw() {
  tot++;  // Increment total needle count

  // Set background color and draw lines each frame
  background("#774360");
  stroke("#03045E");
  for (var i = 0; i <= height / line_len; i++) {
    line(0, i * line_len + 120, width, i * line_len+120);
  }

  // Random position and angle for each needle
  var x = random(0, width);
  var y = random(120, height);
  var angle = random(0, PI);  // Angle in radians, only needs 0 to π

  // Draw needle and check for intersection
  needle_draw(x, y, angle);

  // Calculate and display the estimated value of π
  var pi_estimate = int_count > 0 ? (2 * ne_len * tot) / (line_len * int_count) : 0;
  fill("#023047");
  textAlign(CENTER, CENTER);
  text(`Number of Simulations: ${tot}`, width / 2, 40)
  text(`Estimated Value of π: ${nf(pi_estimate, 1, 5)}`, width / 2, 80);
}

function needle_draw(x, y, angle) {
  // Calculate endpoints of the needle
  var x_init = x - (ne_len / 2) * cos(angle);
  var y_init = y - (ne_len / 2) * sin(angle);
  var x_last = x + (ne_len / 2) * cos(angle);
  var y_last = y + (ne_len / 2) * sin(angle);

  // Check if the needle intersects any line
  var intersected = false;
  for (var i = 0; i <= height / line_len; i++) {
    var line_y = i * line_len;
    // Check if either endpoint is on opposite sides of a line
    if ((y_init < line_y && y_last > line_y) || (y_init > line_y && y_last < line_y)) {
      intersected = true;
      int_count++;
      break;
    }
  }

  // Draw the needle with color based on intersection
  if (intersected) {
    stroke("#FF6F61");  // Color for intersecting needles
  } else {
    stroke("#0077B6");  // Color for non-intersecting needles
  }
  strokeWeight(4);
  line(x_init, y_init, x_last, y_last);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rate = max(3, rate - 3);
  } else if (keyCode === RIGHT_ARROW) {
    rate += 3;
  }
  frameRate(rate);
}
