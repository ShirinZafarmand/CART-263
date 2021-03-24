"use strict";

/**************************************************
Project2- Prototype
shirin zafarmand

**************************************************/
var u;
var u2;
var count1;
var count2;
var verticalBars = [];
var horizontalBars =[];
var gates =[];

let ball={
  x:600,
  y:0,
  size:50,
  movement:1
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //number of vertical lines
  u = 100;
  u2 =19;
  //overall width of the vertical lines
  let widthExtra = windowWidth;
  let heightExtra = windowHeight;
  //adjusting the vertical lines based of the width
  count1 = int(widthExtra/u);
  count2 = int(heightExtra/u2);
  var index1 = 0;
  var index2 = 0;
  var index3 = 0;
  //constructiong the vertical and horizontal bars
 for (let i = 0; i < count1*2; i++) {
    verticalBars[index1++] = new Verticalbars((int(i)*u),0);
    let y= random(0,height)
    gates[index3++] = new Gate((int(i)*u),y);
  }
 for (let j = 0; j< count2*2; j++){
    let x=random(0,width);
    horizontalBars[index2++] = new Horizontalbars(x,(int(j)*u2));
  }
}

function draw() {
  noStroke();
  background(0);
  //drawing the bars
  for (var i = 0; i <= count1; i++) {
    verticalBars[i].draw();
    gates[i].draw();
  }
  for (var j = 0; j <= count2; j++) {
    horizontalBars[j].draw();
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
  for (var i = 0; i <= count1; i++) {
    verticalBars[i].pressed();
    gates[i].pressed();
  }
  for (var j = 0;j <= count2; j++) {
    horizontalBars[j].pressed();
  }
}
