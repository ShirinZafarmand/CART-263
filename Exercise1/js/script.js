"use strict";

/**************************************************
Exercise 1- Find The Virus
Shirin Zafarmand

Here is a description of this template p5 project.
**************************************************/

const NUM_BACTERIA_IMAGES=8;
let numBacteria=150;

let bacteriaImages=[];
let bacterias=[];

let virusImage = undefined;
let virus = undefined;

let disinfection;

let timer;
let state ='title';
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
  textSize(32);
  textAlign(CENTER,CENTER);

  for(let i=0; i<numBacteria; i++){
    let x= random(0,width);
    let y= random(0,height);
    let rotation=random(0.1,1);
    let relocate= random(0,50);
    let bacteriaImage=random(bacteriaImages);
    let bacteria = new Bacteria(x,y,bacteriaImage,relocate,rotation);
    bacterias.push(bacteria);
  }

  let relocate= random(0,50);
  let x= random(0,width);
  let y= random(0,height);
  virus= new Virus(x,y,virusImage)

  timer= new Timer();
}


function draw() {
  if(state==='title'){
    push();
    background(bg.r,bg.g,bg.b);
    fill(255);
    text('click right.',width/2,height/2);
    virus.demo();
    pop();

    fill(100,50,67);
    rectMode(CENTER);
    text('choose',width/2,height/2+300)
    ellipse(width/2-200,height/2+400,130)
    ellipse(width/2+200,height/2+400,130)
    ellipse(width/2,height/2+400,130)

    push();
    fill(255)
    text('easy',width/2-200,height/2+400)
    text('medium',width/2,height/2+400)
    text('hard',width/2+200,height/2+400)
    pop();

    }

    else if(state==='start'){
      background(bg.r,bg.g,bg.b);

      for(let i = 0; i<bacterias.length; i++){
        bacterias[i].update();
      }

      virus.update();

      //displaying timer and showing the time that is left
      timer.display();
      timer.shrink();
      //when time is overm shoe the ending titration(win/lose)
      timer.timeOver();
      //ending titration based on if you have whon or lose
      lost();
      won();
    }
  }

  function mousePressed(){
    virus.mousePressed();
  }

  function keyPressed(){
    if(keyCode===49 &&
      state==='title'){
        state='start';
        timer.diminish=-0.1
      }

      else if(keyCode===50 &&
        state==='title'){
          state='start';
          timer.diminish=-1
        }

      else if(keyCode===51 &&
        state==='title'){
          state='start';
          timer.diminish=-7
        }
      }

      function lost(){
        if (state === 'lose'){
          background(150,0,0)
          fill(255);
          text('fuck' ,width/2,height/2)
        };
      };


      function won(){
        if (state === 'win'){
          background(0,150,0)
          fill(255);
          text('yay' ,width/2,height/2)
        };
      }
