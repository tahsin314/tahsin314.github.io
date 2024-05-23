var line_len = 80; 
var ne_len = 20;
var int_count = 0;
var tot = 0;
var iter_step;
var rate = 1;
var message = "tickle",
  font,
  bounds, // holds x, y, w, h of the text's bounding box
  fontsize = 60,
  x_text, y_text; // x and y coordinates of the text

function setup() {
  createCanvas(560,560);
  background("#CAF0F8");
  frameRate(rate);
  textFont("Arial");
  textSize(58);
   //bounds = font.textBounds(message, 0, 0, fontsize);
  x_text = width / 2 - 100; 
  y_text = height / 2; 
  iter_step = int((width - width%80)*1.0/line_len);
  for(var i=0; i<=iter_step; i++) {
    line(0, i*line_len, width, i*line_len);
  }
 
}

function draw() {
  tot++;
  background("#CAF0F8");
  frameRate(rate);
  //if(mousePressed) frameRate(10);
  for(var i=0; i<=iter_step; i++) {
    line(0, i*line_len, width, i*line_len);
  }
  var x = random(0,width-00);
  var y = random(0,height-00);
  var angle = random(0,360);
  needle_draw(x, y, angle);
  //var s = String.format("%.2f", tot*1.0/int_count);
  var s = nf((1.0*tot/int_count),1,5);
  fill(0);
  textFont(100);
  textSize(100);
  text(str(s), x_text, y_text);
  //bounds = font.textBounds(message,x,y,fontsize);
  //if(mouseClicked()) rate = rate +5;
}


function needle_draw(x, y, angle) {
  var x_init = x - (ne_len*cos(angle*PI/180));
  var y_init = y - (ne_len*sin(angle*PI/180));
  
  var x_last = x + (ne_len*cos(angle*PI/180));
  var y_last = y + (ne_len*sin(angle*PI/180));
  
  line(x_init, y_init, x_last, y_last);
  
  for(var i=0; i<=iter_step; i++) {
    if(intersect(0, (i*line_len+20), width, (i*line_len+20), x_init, y_init, x_last, y_last)== true)  {
      stroke(0);
      line(x_init, y_init, x_last, y_last);
      
      int_count = int_count+1;
      break;
    }
    else {
      stroke(0);
      line(x_init, y_init, x_last, y_last);
      continue;
    }
  }

}

function intersect(x1_i, y1_i, x1_f, y1_f, x2_i, y2_i, x2_f, y2_f) {
  
  //Finding slope and costant term for line 1
  var epsilon = 1e-15;
  var a1 = (y1_f-y1_i)/(x1_f-x1_i+epsilon);
  var b1 = y1_i - a1*x1_i;
  
  //Finding slope and costant term for line 2
  var a2 = (y2_f-y2_i)/(x2_f-x2_i+epsilon);
  var b2 = y2_i - a2*x2_i;
  
  //Finding varersecting povar
  var x_varersect = -(b1-b2)/(a1-a2+ epsilon);
  //var y_varersect = a1*x_varersect + b1;
  
  if((x_varersect>=x2_i & x_varersect <=x2_f) | (x_varersect<=x2_i & x_varersect >=x2_f)) return true;
  else return false;
  
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    rate = rate-3;
  } else if (keyCode === RIGHT_ARROW) {
    rate = rate+3;
  }
}