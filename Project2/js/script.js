"use strict";

/**************************************************
Project2- Prototype
shirin zafarmand

**************************************************/

var u;
var count;

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

}
