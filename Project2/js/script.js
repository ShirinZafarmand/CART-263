"use strict";

/**************************************************
Project2- Prototype
shirin zafarmand

**************************************************/
var u;
var count;
var bars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //number of vertical lines
  u = 100;
  //overall width of the lines
  let widthExtra = windowWidth;
  //adjusting the lines based of the width
  count = int(widthExtra/u);
  var index = 0;
  //constructiong the bars
 for (let i = 0; i < count*2; i++) {
     bars[index++] = new Bars((int(i)*u),0);
  }
}

function draw() {
  noStroke();
  background(0);
  //drawing the bars
  for (var i = 0; i <= count; i++) {
    bars[i].draw();
  }
}

function mousePressed() {
  for (var i = 0; i <= count; i++) {
    bars[i].pressed();
  }
}
