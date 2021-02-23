/**
Project 1
Shirin Zafarmand
*/

"use strict";

let state ='title';

let bg={
  r:0,
  g:0,
  b:0,
};


let circus={
  x:0,
  y:0,
  width:4800,
  height:2300,
  image:undefined
}

function preload() {
circus.image=loadImage(`assets/images/background.jpg`);
}


function setup() {
  createCanvas(windowWidth,windowHeight);
}


function draw() {
  background(bg.r,bg.g,bg.b);
  imageMode(CORNER);
  circus.width=windowWidth+3000
  circus.height=windowHeight+2000
  image(circus.image,circus.x,circus.y,circus.width,circus.height);


  circus.x=constrain(circus.x,-circus.width+windowWidth,0);
  circus.y=constrain(circus.y,-circus.height+windowHeight,0);
}
