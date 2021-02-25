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
//scores
let score=0;

let bg={
  r:0,
  g:0,
  b:0,
};

let introductionAudio;

let circus={
  x:0,
  y:0,
  width:4800,
  height:2300,
  image:undefined
}

let triangleStone={
  x:0,
  y:0,
  width:600,
  height:600,
  image:undefined
}

let buttonShadow={
  x:0,
  y:0,
  width:13800,
  height:13000,
  image:undefined,
  shrink:15
}

let ghostEye1={
  x:310,
  y:750,
  size:50,
  display:false
}

let ghostEye2={
  x:1270,
  y:950,
  size:30,
  display:false
}

let ghostEye3={
  x:2400,
  y:940,
  size:80,
  display:false
}

function preload() {
  circus.image=loadImage(`assets/images/background.jpg`);
  triangleStone.image=loadImage(`assets/images/triangleStone2.png`);
  buttonShadow.image=loadImage(`assets/images/BUTTON.png`);
  introductionAudio= loadSound(`assets/sounds/introAudio.m4a`);
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  textSize(32);
  textAlign(CENTER,CENTER);
  //start the webcam and hide the html element
  video= createCapture(VIDEO);
  video.hide();

  //loading state
  handpose = ml5.handpose(video, {
    flipHorizontal:true
  });

  //predict event
  handpose.on(`predict`, function(results) {
    predictions= results;
  });
}


function draw() {

  if(state==='title'){
    introductionAudio.play();
  }
  else if(state==='start'){
    introductionAudio.stop();
  }
  
  if(state==='title'){
    background(125);
    fill(255);
    push();
    textSize(23);
    //the instruction of the game
    text('instructions',width/2,height/2);
    pop();
  }


  else if(state==='start'){
    background(bg.r,bg.g,bg.b);

    imageMode(CORNER);
    circus.width=6/5*windowWidth
    circus.height=windowHeight
    image(circus.image,circus.x,circus.y,circus.width,circus.height);

    if (keyIsDown(39)){
      circus.x=circus.x-5;
      ghostEye1.x=ghostEye1.x-5
      ghostEye2.x=ghostEye2.x-5
      ghostEye3.x=ghostEye3.x-5
    };
    if (keyIsDown(37)){
      circus.x=circus.x+5;
      ghostEye1.x=ghostEye1.x+5
      ghostEye2.x=ghostEye2.x+5
      ghostEye3.x=ghostEye3.x+5
    };
    if (keyIsDown(38)){
      circus.y=circus.y+5;
      ghostEye1.y=ghostEye1.y+5
      ghostEye2.y=ghostEye2.y+5
      ghostEye3.y=ghostEye3.y+5
    };
    if (keyIsDown(40)){
      circus.y=circus.y-5;
      ghostEye1.y=ghostEye1.y-5
      ghostEye2.y=ghostEye2.y-5
      ghostEye3.y=ghostEye3.y-5
    };


    push()
    imageMode(CENTER)
    buttonShadow.x=windowWidth/2
    buttonShadow.y=windowHeight/2
    image(buttonShadow.image,buttonShadow.x,buttonShadow.y,buttonShadow.width,buttonShadow.height)
    pop()

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


      let d1= dist(triangleStone.x,triangleStone.y,ghostEye1.x,ghostEye1.y)
      if(d1<=70){
        ghostEye1.display=true;
        score++
      }
      else{
        ghostEye1.display=false;
      }
      if(ghostEye1.display===true){
        fill(0, 255, 238)
        ellipse(ghostEye1.x,ghostEye1.y,ghostEye1.size)
      }


      let d2= dist(triangleStone.x,triangleStone.y,ghostEye2.x,ghostEye2.y)
      if(d2<=70){
        ghostEye2.display=true;
        score++
      }
      else{
        ghostEye2.display=false;
      }
      if(ghostEye2.display===true){
        fill(187, 0, 255)
        ellipse(ghostEye2.x,ghostEye2.y,ghostEye2.size)
      }


      let d3= dist(triangleStone.x,triangleStone.y,ghostEye3.x,ghostEye3.y)
      if(d3<=70){
        ghostEye3.display=true;
        score++
      }
      else{
        ghostEye3.display=false;
      }
      if(ghostEye3.display===true){
        fill(255)
        ellipse(ghostEye3.x,ghostEye3.y,ghostEye3.size)
      }

      triangleStone.x= baseX;
      triangleStone.y=baseY;

      imageMode(CENTER);
      image(triangleStone.image,triangleStone.x,triangleStone.y,triangleStone.width,triangleStone.height);
      circus.x=constrain(circus.x,-circus.width+windowWidth,0);
      circus.y=constrain(circus.y,-circus.height/2,0);
    }

    //score displey
    push();
    fill(255,0,0);
    text(score + ' out of 3 eyes collected' ,180,40);
    pop();

    if(buttonShadow.width===2000){
      background(150,0,0);
      fill(255);
      //show the losing titration
      text('sorry. You failed. maybe try again' ,width/2,height/2);
    }


    buttonShadow.height=buttonShadow.height-buttonShadow.shrink
    buttonShadow.width=buttonShadow.width-1.05*buttonShadow.shrink

    if(buttonShadow.height<windowHeight || buttonShadow.width<windowWidth && score>=3){
      background(100,100,100)
      fill(255);
      //show the winning titration
      text('Made it in time.' ,width/2,height/2);
    }
    if(buttonShadow.height<windowHeight || buttonShadow.width<windowWidth && score<3){
      background(0,100,0)
      fill(255);
      //show the losing titration
      text('sorry. You failed. maybe try again' ,width/2,height/2);
    }
  }
}

function keyPressed(){
  if(keyCode===32 &&
    state==='title'){
      state='start';
    };
  }
