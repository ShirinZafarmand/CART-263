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

let backgroundMusic;

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

let ghostEye1={
  x:280,
  y:730,
  size:50,
  display:false
}




function preload() {
circus.image=loadImage(`assets/images/background.jpg`);
buttonShadow.image=loadImage(`assets/images/triangleStone2.png`);
backgroundMusic= loadSound(`assets/sounds/creepyAudio.mp3`);
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
  circus.width=6/5*windowWidth
  circus.height=windowHeight
  image(circus.image,circus.x,circus.y,circus.width,circus.height);

  if (keyIsDown(39)){
    circus.x=circus.x-5;
    ghostEye1.x=ghostEye1.x-5
  };
  if (keyIsDown(37)){
    circus.x=circus.x+5;
    ghostEye1.x=ghostEye1.x+5
  };
  if (keyIsDown(38)){
    circus.y=circus.y+5;
    ghostEye1.y=ghostEye1.y+5
  };
  if (keyIsDown(40)){
    circus.y=circus.y-5;
    ghostEye1.y=ghostEye1.y5
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


      let d= dist(buttonShadow.x,buttonShadow.y,ghostEye1.x,ghostEye1.y)
      if(d<=70){
        ghostEye1.display=true;
      }
      else{
        ghostEye1.display=true;
      }

      if(ghostEye1.display===true){
        fill(255)
        ellipse(ghostEye1.x,ghostEye1.y,ghostEye1.size)
      }


    buttonShadow.x= baseX;
    buttonShadow.y=baseY;

    imageMode(CENTER);
    image(buttonShadow.image,buttonShadow.x,buttonShadow.y,buttonShadow.width,buttonShadow.height);
    circus.x=constrain(circus.x,-circus.width+windowWidth,0);
    circus.y=constrain(circus.y,-circus.height/2,0);
  }
}
