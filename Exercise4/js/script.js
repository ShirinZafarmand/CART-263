/**
Bubble Pop
Shirin Zafarmand


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
}

function preload() {
  submarine.image=loadImage(`assets/images/submarine.png`)
}


function setup() {
  createCanvas(1000,600);
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


  for (let i = 0; i < squadSize; i++){
    jellyFishSquad[i]= createjellyFish(random(0,width),random(-5000,0));
  };

  //bubbles
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
    background(125)
    fill(255);
    //the instruction of the game
    text('1.',width/2,height/2);
    text('2',width/2,height/2+50);

  }

  else if(state==='start'){
    background(bg.r,bg.g,bg.b);
    bg.b+=0.05

    //displaying timer and showing the time that is left
    timer.display();
    timer.shrink();
    //when time is over they lose
    timer.timeOver();


    //score displey
    push()
    fill(255,0,0)
    text('Your Score: ' + score,100,40);

    lost();
    won();

    if(predictions.length>0){
      let hand= predictions[0];
      let index= hand.annotations.indexFinger;
      let tip= index[3];
      let base= index[0];
      let tipX= tip[0];
      let tipY= tip[1];
      let baseX= base[0];
      let baseY= base[1];


      submarine.x= baseX
      submarine.y=baseY
      let d2= dist(baseX,baseY,tipX,tipY)

      //submarine machine
      imageMode(CENTER);
      submarine.size=d2
      image(submarine.image,submarine.x,submarine.y,submarine.size,submarine.size)


      for (let i = 0; i<jellyFishSquad.length; i++){
        let jellyFish=jellyFishSquad[i];
        push();
        noStroke();
        fill(235, 180, 52);
        ellipse(jellyFish.x,jellyFish.y,jellyFish.size);
        pop();

        jellyFish.y=jellyFish.y+jellyFish.speed
        jellyFish.speed=jellyFish.speed+jellyFish.speedIncrease;

        //check
        let d=dist(submarine.x,submarine.y,jellyFish.x,jellyFish.y);
        if(d<jellyFish.size/2+d2/3){
          score=score-1
        }
      }


      //move the bubbles
      fish.x+=fish.vx;
      fish.y+=fish.vy;

      if(fish.y>windowHeight){
        fish.x=random(0,width);
        fish.y=0;
      }

      push();
      fill(0,100,200);
      noStroke();
      ellipse(fish.x,fish.y,fish.size);
      pop();

      let d3=dist(fish.x,fish.y,submarine.x,submarine.y)
      if(d3<fish.size/2+d2/2){
        fish.x=random(0,width);
        fish.y=0;
        score++
      }
    }
  }
  lost();
  won();

}

function lost(){
  if (state === 'lose'){
    background(150,0,0);
    fill(255);
    //show the losing titration
    text('You failed' ,width/2,height/2);
  };
};


function won(){
  if (state === 'win'){
    background(0,150,0);
    fill(255);
    //show the winning titration
    text('Made it in time' ,width/2,height/2);
  };
}

function keyPressed(){
  if(keyCode===32 &&
    state==='title'){
      state='start';
    }
  }
