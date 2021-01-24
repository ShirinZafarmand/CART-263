"use strict";

/**************************************************
Exercise 1- Find The Virus
Shirin Zafarmand

Here is a description of this template p5 project.
**************************************************/

const NUM_BACTERIA_IMAGES=8;
const NUM_BACTERIAS=150;

let bacteriaImages=[];
let bacterias=[];

let virusImage = undefined;
let virus = undefined;

let disinfection;

let bg={
  r:0,
  g:0,
  b:0,
};

function preload(){
  for(let i = 0; i < NUM_BACTERIA_IMAGES; i++){
    let bacteriaImage =  loadImage(`assets/images/bacteria${i}.png`);
    bacteriaImages.push(bacteriaImage);
  }

  virusImage = loadImage(`assets/images/virus.png`);

  disinfection= loadSound(`assets/sounds/spray.mp3`);
}


function setup() {
createCanvas(windowWidth, windowHeight);

  for(let i=0; i<NUM_BACTERIAS; i++){
    let x= random(0,width);
    let y= random(0,height);
    let rotation=random(0.1,1);
    let relocate= random(0,50);
    let bacteriaImage=random(bacteriaImages);
    let bacteria = new Bacteria(x,y,bacteriaImage,relocate,rotation);
    bacterias.push(bacteria);
  }

  let x= random(0,width);
  let y= random(0,height);
  virus= new Virus(x,y,virusImage)
}


function draw() {
background(bg.r,bg.g,bg.b);

  for(let i = 0; i<bacterias.length; i++){
    bacterias[i].update();
  }

  virus.update();
}


function mousePressed(){
  virus.mousePressed();
}
