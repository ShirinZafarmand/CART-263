/**
Project 1
Shirin Zafarmand

Caroline(a stop-motion peice) inspired game
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

let audioButton;
let introductionAudio;
let backgroundAudio;

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

let triangleStone={
  x:0,
  y:0,
  width:600,
  height:600,
  image:undefined
}

let childrenGhosts={
  x:0,
  y:0,
  width:0,
  height:0,
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
  display:false,
  found:false
}

let ghostEye2={
  x:1270,
  y:950,
  size:30,
  display:false,
  found:false
}

let ghostEye3={
  x:2400,
  y:940,
  size:80,
  display:false,
  found:false
}

function preload() {
  //load circus Image as background
  circus.image=loadImage(`assets/images/background.jpg`);
  //load trinagle stone image as an helping tool
  triangleStone.image=loadImage(`assets/images/triangleStone2.png`);
  //load button shadow image as a timer
  buttonShadow.image=loadImage(`assets/images/BUTTON.png`);
  //load the picture of 3 ghost children for the introduction
  childrenGhosts.image=loadImage(`assets/images/childrenGhosts.jpg`);
  //load the instruction audio that playes over the ghost children image
  introductionAudio= loadSound(`assets/sounds/introAudio.m4a`);
  //game background Audio
  backgroundAudio= loadSound(`assets/sounds/Dreaming.mp3`);
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
    //creating a button for playing the audio
    let buttonColor = color(50);
    audioButton = createButton('Play the Guiding Audio');
    audioButton.style('font-size','30px');
    audioButton.style('background-color', buttonColor);
    audioButton.position(10,70);
    //if the button is pressed play the audio
    audioButton.mousePressed(audio);
  }

  if(state==='title'){
    background(7,7,7);

    //3 ghost children image
    imageMode(CENTER);
    childrenGhosts.x=windowWidth/2;
    childrenGhosts.y=windowHeight/2;

    childrenGhosts.width=0.65*windowWidth;
    childrenGhosts.height=windowHeight;
    image(childrenGhosts.image,childrenGhosts.x,childrenGhosts.y,childrenGhosts.width,childrenGhosts.height);

    // the instruction of the game
    fill(255);
    push();
    textSize(26);
    text('Find our eyes. use the triangle stone to find them,',5.5*width/10,5*height/6);
    text('they are only visible through th circle of the stone.',5.5*width/10,5*height/6+30);
    text('Move your hand an press the arrow keys to vhange the view.',5.5*width/10,5*height/6+60);
    text('find them before the button takes up the screen.',5.5*width/10,5*height/6+90);
    text('Hurry! press the space key to start!',5.5*width/10,5*height/6+120);
    pop();
 }


  else if(state==='start'){
    background(bg.r,bg.g,bg.b);

    //displaying the background image of the circus
    imageMode(CORNER);
    circus.width=6/5*windowWidth;
    circus.height=windowHeight;
    image(circus.image,circus.x,circus.y,circus.width,circus.height);

    //pressing the arrow keys to help exploring the room
    screenMovements();

    //displaying the button shadow image
    push();
    imageMode(CENTER);
    buttonShadow.x=windowWidth/2;
    buttonShadow.y=windowHeight/2;
    image(buttonShadow.image,buttonShadow.x,buttonShadow.y,buttonShadow.width,buttonShadow.height);
    pop();

    //if there are predictions, the triangle stone and eye balls start to apear and function
    if(predictions.length>0){
      let hand= predictions[0];
      let index= hand.annotations.indexFinger;
      let tip= index[3];
      let base= index[0];
      let tipX= tip[0];
      let tipY= tip[1];
      let baseX= base[0];
      let baseY= base[1];

      //if the triangle stone is over eye balls, they appear on the screen
         //once the eye number 1 is found, the score goes higher
         stone1Discovery();

         //once the eye number 2 is found, the score goes higher
         stone2Discovery();

         //once the eye number 3 is found, the score goes higher
         stone3Discovery();


      //the location of the triangle stone is where the hand is
      triangleStone.x= baseX;
      triangleStone.y=baseY;

      //displying the triangle stone image
      imageMode(CENTER);
      image(triangleStone.image,triangleStone.x,triangleStone.y,triangleStone.width,triangleStone.height);

      //constraing the movements of the background
      circus.x=constrain(circus.x,-circus.width+windowWidth,0);
      circus.y=constrain(circus.y,-circus.height/2,0);
    }

    //score display
    push();
    fill(255,0,0);
    text(score + ' out of 3 eyes collected' ,180,40);
    pop();

    // button shadow shrinks and functions as a timer
    buttonShadowShrinking();
  }
}

//press the space key to change the state to start
function keyPressed(){
  if(keyCode===32 &&
    state==='title'){
      state='start';
      //playing background audio
        backgroundAudio.play();
    };
  }

//pressing the arrow keys to help exploring the room
function screenMovements(){
  if (keyIsDown(39)){
    circus.x=circus.x-5;
    ghostEye1.x=ghostEye1.x-5;
    ghostEye2.x=ghostEye2.x-5;
    ghostEye3.x=ghostEye3.x-5;
  };
  if (keyIsDown(37)){
    circus.x=circus.x+5;
    ghostEye1.x=ghostEye1.x+5;
    ghostEye2.x=ghostEye2.x+5;
    ghostEye3.x=ghostEye3.x+5;
  };
  if (keyIsDown(38)){
    circus.y=circus.y+5;
    ghostEye1.y=ghostEye1.y+5;
    ghostEye2.y=ghostEye2.y+5;
    ghostEye3.y=ghostEye3.y+5;
  };
  if (keyIsDown(40)){
    circus.y=circus.y-5;
    ghostEye1.y=ghostEye1.y-5;
    ghostEye2.y=ghostEye2.y-5;
    ghostEye3.y=ghostEye3.y-5;
  };
}

function stone1Discovery(){
  let d1= dist(triangleStone.x,triangleStone.y,ghostEye1.x,ghostEye1.y);
  if(d1<=70){
    ghostEye1.display=true;
    if(ghostEye1.found==false){
      //once the eye number 2 is found, the score goes higher
      score++;
      ghostEye1.found=true;
    }
  }

  else{
    ghostEye1.found=false;
  }
  if(ghostEye1.display===true){
    fill(0, 255, 238);
    //diplaying the eye balls number 1
    ellipse(ghostEye1.x,ghostEye1.y,ghostEye1.size);
  }
}

function stone2Discovery(){
  let d2= dist(triangleStone.x,triangleStone.y,ghostEye2.x,ghostEye2.y);
  if(d2<=70){
    ghostEye2.display=true;
    if(ghostEye2.found==false){
      //once the eye number 2 is found, the score goes higher
      score++;
      ghostEye2.found=true;
    }
  }
  else{
    ghostEye2.display=false;
  }

  if(ghostEye2.display===true){
    fill(100,0,0);
    //diplaying the eye balls number 2
    ellipse(ghostEye2.x,ghostEye2.y,ghostEye2.size);
  }
}

function stone3Discovery(){
  let d3= dist(triangleStone.x,triangleStone.y,ghostEye3.x,ghostEye3.y)
  if(d3<=70){
    ghostEye3.display=true;

  }
  else{
    ghostEye3.display=false;
  }

  if(ghostEye3.display===true){
    fill(255)
    //diplaying the eye balls number 3
    ellipse(ghostEye3.x,ghostEye3.y,ghostEye3.size);
  }
}

function buttonShadowShrinking(){
  //if the button shadow takes up almost the whole screen check the score
  buttonShadow.height=buttonShadow.height-buttonShadow.shrink;
  buttonShadow.width=buttonShadow.width-1.05*buttonShadow.shrink;

  //if the have collected all three eye balls, they win
  if(buttonShadow.height<windowHeight || buttonShadow.width<windowWidth && score>=3){
    background(66, 74, 73);
    fill(255);
    //show the winning titration
    text('Thank You for saving us!' ,width/2,height/2);
  }

  //if the haven't collected all three eye balls, they lsoe
  if(buttonShadow.height<windowHeight || buttonShadow.width<windowWidth && score<3){
    background(66, 74, 73);
    fill(255);
    //show the losing titration
    text('Oh no it is too late...' ,width/2,height/2);
  }
}

function audio(){
  //playing introduction audio(an audio straight out of the animation)
    introductionAudio.play();
}
