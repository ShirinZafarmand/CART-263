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
let bubble=undefined;
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

  //bubbles
  bubble={
    x:random(width),
    y:0,
    size:50,
    vx:0,
    vy:4
  }
}


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
    let dis= dist(baseX,baseY,tipX,tipY)

    //submarine machine
    imageMode(CENTER);
    image(submarine.image,submarine.x,submarine.y,dis,dis)


    //check
    let d=dist(tipX,tipY,bubble.x,bubble.y);
    if(d<bubble.size/2){
      bg.r=100
    }
  }

  //move the bubbles
  bubble.x+=bubble.vx;
  bubble.y+=bubble.vy;

  if(bubble.y>windowHeight){
    bubble.x=random(0,width);
    bubble.y=0;
  }

  push();
  fill(0,100,200);
  noStroke();
  ellipse(bubble.x,bubble.y,bubble.size);
  pop();
}
