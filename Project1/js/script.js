/**
Project 1
Shirin Zafarmand
*/

"use strict";

let state ='title';

//user's webcam
let video= undefined;
//handpose object
let handpose= undefined;
// the  predictions made once it's running
let predictions =[];

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

let buttonShadow={
  x:0,
  y:0,
  width:600,
  height:600,
  image:undefined
}


function preload() {
circus.image=loadImage(`assets/images/background.jpg`);
buttonShadow.image=loadImage(`assets/images/triangleStone2.png`);
}


function setup() {
  createCanvas(windowWidth,windowHeight);
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
}


function draw() {
  background(bg.r,bg.g,bg.b);

  imageMode(CORNER);
  circus.width=windowWidth+2000
  circus.height=windowHeight+1000
  image(circus.image,circus.x,circus.y,circus.width,circus.height);

  if (keyIsDown(39)){
    circus.x=circus.x-5;
  };
  if (keyIsDown(37)){
    circus.x=circus.x+5;
  };
  if (keyIsDown(40)){
    circus.y=circus.y-4
  };
  if (keyIsDown(38)){
    circus.y=circus.y+4
  };

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



    buttonShadow.x= baseX;
    buttonShadow.y=baseY;

    imageMode(CORNER);
    image(buttonShadow.image,buttonShadow.x,buttonShadow.y,buttonShadow.width,buttonShadow.height);
    circus.x=constrain(circus.x,-circus.width+windowWidth,0);
    circus.y=constrain(circus.y,-circus.height+windowHeight,0);
  }
}
