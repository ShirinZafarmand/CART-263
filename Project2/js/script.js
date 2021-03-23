"use strict";

/**************************************************
Project2- Prototype
shirin zafarmand

**************************************************/
var u;
var count;
var mods = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  //number of vertical lines
  u = 100;
  //overall width of the lines
  let widthExtra = windowWidth;
  //adjusting the lines based of the width
  count = int(widthExtra/u);
}

function draw() {
  noStroke();
  background(0);
  for (var i = 0; i <= count; i++) {
    mods[i].draw();
  }
}


function mousePressed() {
  for (var i = 0; i <= count; i++) {
    mods[i].pressed();
  }
}
