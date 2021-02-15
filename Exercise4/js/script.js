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
let balls=[];
let numBalls= 100;

let bg={
  r:0,
  g:0,
  b:0,
};


function preload() {
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

  for( let i=0; i <numBalls; i++){
    let x=random(0,width);
    let y= random(-5000,-50);
    let ball = new Ball(x,y);
    balls.push(ball);
  }
}


function draw() {
  background(bg.r,bg.g,bg.b);
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
    }

    for( let i=0; i<balls.length; i++){
      let ball=balls[i];
      if (ball.active){
        ball.move();
        ball.display();
      };
    };
  }
