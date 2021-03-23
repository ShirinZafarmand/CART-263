"use strict";

/**************************************************
Project2- Prototype
shirin zafarmand

**************************************************/
var u;
var count;
var verticalBars = [];
var horizontalBars =[];

let ball={
  x:200,
  y:0,
  size:50,
  movement:1
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //number of vertical lines
  u = 100;
  //overall width of the vertical lines
  let widthExtra = windowWidth;
  let heightExtra=windowHeight;
  //adjusting the vertical lines based of the width
  count = int(widthExtra/u);
  var index1 = 0;
  var index2 =0;
  //constructiong the vertical and horizontal bars
 for (let i = 0; i < count*2; i++) {
     verticalBars[index1++] = new Verticalbars((int(i)*u),0);
     let x=random(0,width);
     horizontalBars[index2++] = new Horizontalbars(x,(int(i)*u));
  }
}

function draw() {
  noStroke();
  background(0);
  //drawing the bars
  for (var i = 0; i <= count; i++) {
    verticalBars[i].draw();
    horizontalBars[i].draw();
  }

  //if the ball is still within the screen height
  if(ball.y<height){
    fill(200,0,0);
    //drawing the ball
    ellipse(ball.x,ball.y,ball.size);
    //moving the ball
    ball.y=ball.y+ball.movement;
  }
  //if the ball has left the screen reapear at a random y
  if(ball.y>=height){
    ball.x=random(0,width);
    ball.y=0;
    ball.y=ball.y+ball.movement;
  }
}

function mousePressed() {
  for (var i = 0; i <= count; i++) {
    verticalBars[i].pressed();
    horizontalBars[i].pressed();
  }
}
