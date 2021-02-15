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
//the bubble
let bubble = undefined;
//scores
let score=0;
//bubble arrays
let bubbleSquad=[];
let bubbleNumber=5;


function preload() {
}


function setup() {
  createCanvas(1000,800);
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


  //bubble
  for (let i = 0; i < bubbleNumber; i++){
    bubbleSquad[i]= createbubble();
  };
}


function draw() {
  background(0);
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

    push();
    noFill();
    stroke(255,255,255);
    strokeWeight(2);
    line(baseX, baseY, tipX, tipY);
    pop();

//pin head
    push();
    noStroke();
    fill(255);
    ellipse(baseX, baseY, 20);
    pop();


    for (let i = 0; i<bubbleSquad.length; i++){
      let bubble=bubbleSquad[i];

      //check bubble popping
      let d= dist(tipX, tipY, bubble.x, bubble.y);
      if(d < bubble.size/2){
        bubble.x=random(width);
        bubble.y=height;
        score=score+1;
      }

      //move the Bubble
      bubble.x+=bubble.vx;
      bubble.y+=bubble.vy;

      if(bubble.y<0){
        bubble.x =random (width);
        bubble.y = height;
      }

      push();
      fill(0,100,200);
      noStroke();
      ellipse(bubble.x,bubble.y, bubble.size);
      pop();
    }
  }
}

function createbubble(){
  let bubble={
    x:random(width),
    y:random(-200,0),
    size:100,
    vx:0,
    vy:-2
  };
  return bubble;
};
