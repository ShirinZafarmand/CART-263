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

let jellyFishSquad=[];
let squadSize=280;


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
}


function createjellyFish(x,y){
  let jellyFish={
    x:x,
    y:y,
    size:50,
    speed:3,
  };
  return jellyFish;
};


function draw() {
  background(bg.r,bg.g,bg.b);
  bg.b+=0.05
  //score displey
  push()
  fill(255,0,0)
  text('Your Score: ' + score,100,20);
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
    image(submarine.image,submarine.x,submarine.y,d2,d2)


      for (let i = 0; i<jellyFishSquad.length; i++){
        let jellyFish=jellyFishSquad[i];
        push();
        fill(235, 180, 52);
        ellipse(jellyFish.x,jellyFish.y,jellyFish.size);
        pop();

        jellyFish.y=jellyFish.y+jellyFish.speed



        //check
        let d=dist(submarine.x,submarine.y,jellyFish.x,jellyFish.y);
        if(d<jellyFish.size/2+d2/3){
          bg.r=100
        }
      }
  }
}
