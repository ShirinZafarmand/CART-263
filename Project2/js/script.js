"use strict";

/**************************************************
Project2- Prototype
shirin zafarmand

**************************************************/
var u;
var count;
var verticalBars = [];
var horizontalBars =[];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //number of vertical lines
  u = 100;
  //overall width of the vertical lines
  let widthExtra = windowWidth;
  //adjusting the vertical lines based of the width
  count = int(widthExtra/u);
  var index1 = 0;
  var index2 =0;
  //constructiong the vertical bars
 for (let i = 0; i < count*2; i++) {
     verticalBars[index1++] = new Verticalbars((int(i)*u),0);
     horizontalBars[index2++] = new Horizontalbars((int(i)*u),0);
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
}

function mousePressed() {
  for (var i = 0; i <= count; i++) {
    verticalBars[i].pressed();
  }
}
