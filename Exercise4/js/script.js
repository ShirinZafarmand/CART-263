/**
Bubble Pop
Shirin Zafarmand

in this game a submarine is floating upward to the surface of water and faces a group of jellyfish which it has to avoid. along the way it has to
catch the fish. the submarine moves according to the position of the palm. the size of the submarine is also based on how close or far the hand is
from the webcam. before the time is over the user has to achieve 4 scores.
*/

"use strict";

//user's webcam
let video= undefined;
//handpose object
let handpose= undefined;
// the  predictions made once it's running
let predictions =[];
//scores
let score=0;

let timer;

let jellyFishSquad=[];
let squadSize=280;

let fish=undefined;

let state ='title';

let bg={
  r:0,
  g:0,
  b:0,
};

let submarine={
  x:0,
  y:0,
  size:200,
  image:undefined
};

function preload() {
  submarine.image=loadImage(`assets/images/submarine.png`);
}


function setup() {
  createCanvas(1500,1000);
  textSize(32);
  textAlign(CENTER,CENTER);
  //start the webcam and hide the html element
  video= createCapture(VIDEO);
  video.hide();

  //constructiong the timer
  timer= new Timer();

  //loading state
  handpose = ml5.handpose(video, {
    flipHorizontal:true
  }, function(){
    console.log(`model loaded.`);
  });

  //predict event
  handpose.on(`predict`, function(results) {
    console.log(results);
    predictions= results;
  });

  //creating jellyfish at random positions
  for (let i = 0; i < squadSize; i++){
    jellyFishSquad[i]= createjellyFish(random(0,width),random(-5000,0));
  };

  //the fishe the submarine has to collect
  fish={
    x:random(width),
    y:0,
    size:50,
    vx:0,
    vy:4
  }
}


function createjellyFish(x,y){
  let jellyFish={
    x:x,
    y:y,
    size:50,
    speed:3,
    speedIncrease:0.01/2,
  };
  return jellyFish;
};


function draw() {
  if(state==='title'){
    background(125);
    fill(255);
    push();
    textSize(23);
    //the instruction of the game
    text('in this game a submarine is floating upward to the surface of water and faces a group of jellyfish which it has to avoid.',width/2,height/2);
    text('along the way it has to catch the fish. the submarine moves according to the position of the palm.',width/2,height/2+50);
    text('the size of the submarine is also based on how close or far the hand is from the webcam. before the time is over the user has to achieve 4 scores.',width/2,height/2+100);
    text('before the time is over the user has to achieve 4 scores.',width/2,height/2+150);
    pop();
  }

  else if(state==='start'){
    background(bg.r,bg.g,bg.b);
    bg.b+=0.05;

    //displaying timer and showing the time that is left
    timer.display();
    timer.shrink();
    //when time is over they lose or win according to the score they have
    timer.timeOver();


    //score displey
    push();
    fill(255,0,0);
    text('Your Score: ' + score,100,40);
    pop();

    //if there are predictions to show objects of the game
    if(predictions.length>0){
      let hand= predictions[0];
      let index= hand.annotations.indexFinger;
      let tip= index[3];
      let base= index[0];
      let tipX= tip[0];
      let tipY= tip[1];
      let baseX= base[0];
      let baseY= base[1];

      //the position of the submarine machine is based on the position of the palm
      submarine.x= baseX;
      submarine.y=baseY;

      //measure the distance between the tip and the base
      let d2= dist(baseX,baseY,tipX,tipY);

      //submarine machine
      imageMode(CENTER);
      //the distance of the base and index's tip as the image size
      submarine.size=d2;
      image(submarine.image,submarine.x,submarine.y,submarine.size,submarine.size);

      //dipsplaying the jellyfish
      for (let i = 0; i<jellyFishSquad.length; i++){
        let jellyFish=jellyFishSquad[i];
        push();
        noStroke();
        fill(235, 180, 52);
        ellipse(jellyFish.x,jellyFish.y,jellyFish.size);
        pop();

        // moving the jellyfish
        jellyFish.y=jellyFish.y+jellyFish.speed;
        //increasing the jelyfish's speed by time
        jellyFish.speed=jellyFish.speed+jellyFish.speedIncrease;

        //check if the jelyfish has touched the submarine machine
        let d=dist(submarine.x,submarine.y,jellyFish.x,jellyFish.y);
        if(d<jellyFish.size/2+d2/3){
          score=score-1;
        }
      }

      //move the fish
      fish.x+=fish.vx;
      fish.y+=fish.vy;
      //if the fish is out of screen create a new one at random position
      if(fish.y>windowHeight){
        fish.x=random(0,width);
        fish.y=0;
      };

      //displaying the fish
      push();
      fill(0,100,200);
      noStroke();
      ellipse(fish.x,fish.y,fish.size);
      pop();

      //check if the fish has been caught
      let d3=dist(fish.x,fish.y,submarine.x,submarine.y)
      if(d3<fish.size/2+d2/2){
        fish.x=random(0,width);
        fish.y=0;
        score++;
      };
    };
  }

  //check if their score is at the determined rate to check if they have won or lost
  lost();
  won();
}


function lost(){
  if (state === 'lose'){
    background(150,0,0);
    fill(255);
    //show the losing titration
    text('sorry. You failed. maybe try again' ,width/2,height/2);
  };
};


function won(){
  if (state === 'win'){
    background(0,150,0);
    fill(255);
    //show the winning titration
    text('Made it in time.' ,width/2,height/2);
  };
}


function keyPressed(){
  if(keyCode===32 &&
    state==='title'){
      state='start';
  };
}
