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
var entrees =[];

let ball={
  x:600,
  y:0,
  size:50,
  movement:1,
  movement1:0.8
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  u = 100;
  u2 =20;
  //overall width and height of the screen
  let widthExtra = windowWidth;
  let heightExtra = windowHeight;
  //adjusting the number of vertical and horizontal bars based of the width and height os screen
  count1 = int(widthExtra/u);
  count2 = int(heightExtra/u2);
  var index1 = 0;
  var index2 = 0;
  var index3 = 0;
  //constructiong the vertical and the entrees
  for (let i = 0; i < count1*2; i++) {
    verticalBars[index1++] = new Verticalbars((int(i)*u),0);
    let y= random(0,height)
    entrees[index3++] = new Entree((int(i)*u),y);
  }
  //constructiong the horizontal bars
  for (let j = 0; j< count2*2; j++){
    let x=random(0,width);
    horizontalBars[index2++] = new Horizontalbars(x,(int(j)*u2));
  }
}

function draw() {
  noStroke();
  background(0);
  //drawing the vertical bars and entrees
  for (var i = 0; i <= count1; i++) {
    verticalBars[i].draw();
    entrees[i].draw();
  }
  //drawing the horizontal bars
  for (var j = 0; j <= count2; j++) {
    horizontalBars[j].draw();
    horizontalBars[j].interaction();
  }

  //if the ball is still within the screen height
  if(ball.y<height){
    fill(200,0,0);
    //drawing the ball
    ellipse(ball.x,ball.y,ball.size);
    //moving the ball
    ball.y=ball.y+ball.movement;
    ball.x=ball.x+ball.movement1;
  }
  //if the ball has left the screen reapear at a random y
  if(ball.y>=height){
    ball.x=random(0,width);
    ball.y=0;
    ball.y=ball.y+ball.movement;
  }
}

function mousePressed() {
    ball.movement1= -ball.movement1
}
