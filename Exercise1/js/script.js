"use strict";

/**************************************************
Exercise 1- Find The Virus
Shirin Zafarmand

the game in which you have to find the virus lost among bacterias before the time is over. each time you click on the wrong virus, you
lose time. when the fade from the screen, their locations change randomly, so it's best to find it sooner and disinfect it.
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
  //loading bacteria image
  for(let i = 0; i < NUM_BACTERIA_IMAGES; i++){
    let bacteriaImage =  loadImage(`assets/images/bacteria${i}.png`);
    bacteriaImages.push(bacteriaImage);
  }
  //loading the virus image
  virusImage = loadImage(`assets/images/virus.png`);
  //loading disinfection spray sound
  disinfection= loadSound(`assets/sounds/spray.mp3`);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER,CENTER);

  for(let i=0; i<numBacteria; i++){
    //random loaction for bacterias
    let x= random(0,width);
    let y= random(0,height);
    //random rotation for bacterias
    let rotation=random(0.1,1);
    //reloacting the bacterias everytime they disapear from the screen
    let relocate= random(0,50);
    let bacteriaImage=random(bacteriaImages);
    //constructing bacterias
    let bacteria = new Bacteria(x,y,bacteriaImage,relocate,rotation);
    bacterias.push(bacteria);
  }

  //random loaction for virus
  let x= random(0,width);
  let y= random(0,height);
  //random rotation for bacterias
  let rotation=random(0.1,1);
  //reloacting the virus everytime it disapears from the screen
  let relocate= random(0,50);
  //constructing the virus
  virus= new Virus(x,y,virusImage);

  //constructiong the timer
  timer= new Timer();
}


function draw() {
  if(state==='title'){
    push();
    background(bg.r,bg.g,bg.b);
    fill(255);
    //instruction
    text('There is a stubborn virus among the bacterias. It has to be cuaght before it becomes toxic. The time considered to complete this mission is on the left. ',width/2,height/2);
    text('Everytime you click on the wrong one you lose a certain amout of time. Try to find it before they fade cause each time their location changes.',width/2,height/2+50);
    //picture of what the virus looks like
    virus.demo();
    pop();

    fill(100,50,67);
    rectMode(CENTER);
    text('Choose the level of difficulty. On keyboard 1-2-3.',width/2,height/2+300);
    //level of difficulty
    ellipse(width/2-200,height/2+400,130);
    ellipse(width/2+200,height/2+400,130);
    ellipse(width/2,height/2+400,130);

    push();
    fill(255);
    text('Easy',width/2-200,height/2+400);
    text('Medium',width/2,height/2+400);
    text('Hard',width/2+200,height/2+400);
    pop();

  }

  else if(state==='start'){
    background(bg.r,bg.g,bg.b);

    //displaying bacterias
    for(let i = 0; i<bacterias.length; i++){
      bacterias[i].update();
    }

    //displaying th virus
    virus.update();

    //displaying timer and showing the time that is left
    timer.display();
    timer.shrink();
    //when time is over they lose
    timer.timeOver();

    //show the losing titration
    lost();
    won();
  }
}

function mousePressed(){
  //check if the virus is found
  virus.mousePressed();
}

function keyPressed(){
  if(keyCode===49 &&
    state==='title'){
      state='start';
      //if chosen the easy level the timer runs slower
      timer.diminish=-2
    }

    else if(keyCode===50 &&
      state==='title'){
        state='start';
        timer.diminish=-3.5
      }

      else if(keyCode===51 &&
        state==='title'){
          state='start';
          //if chosen the easy level the timer runs fatser
          timer.diminish=-5
        }
      }

      function lost(){
        if (state === 'lose'){
          background(150,0,0);
          fill(255);
          //show the losing titration
          text('fuck' ,width/2,height/2);
        };
      };


      function won(){
        if (state === 'win'){
          background(0,150,0);
          fill(255);
          //show the winning titration
          text('yay' ,width/2,height/2);
        };
      }
