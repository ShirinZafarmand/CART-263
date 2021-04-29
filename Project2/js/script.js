"use strict";

/**************************************************
Project2- Prototype
shirin zafarmand
**************************************************/
var u;
var u2;
var count1;
var count2;
var verticalBars = [];
var horizontalBars =[];
var entrees =[];
let notes=[];
let numNotes=20;
let baseMelody;
let state ='title';
let audioButton;

let ball={
  x:600,
  y:0,
  size:50,
  movement:1,
  movement1:0.8
}


function preload() {
  baseMelody=loadSound(`assets/sounds/melody.mp3`);
  let one =loadSound(`assets/sounds/one.mp3`);
  let two =loadSound(`assets/sounds/two.wav`);
  let three =loadSound(`assets/sounds/three.wav`);
  let four =loadSound(`assets/sounds/four.wav`);
  let five =loadSound(`assets/sounds/five.wav`);
  let six =loadSound(`assets/sounds/six.wav`);
  let seven =loadSound(`assets/sounds/seven.wav`);
  let eight =loadSound(`assets/sounds/eight.wav`);
  let nine =loadSound(`assets/sounds/nine.wav`);
  let ten =loadSound(`assets/sounds/ten.wav`);
}


function setup() {
  let cnv=createCanvas(windowWidth/1.5, windowHeight/1.5);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  textSize(32);
  textAlign(CENTER,CENTER);

  u = 100;
  u2 =20;
  //overall width and height of the screen
  let widthExtra = windowWidth;
  let heightExtra = windowHeight;
  //adjusting the number of vertical and horizontal bars based of the width and height os screen
  count1 = int(widthExtra/u);
  count2 = int(heightExtra/u2);
  var index1 = 0;
  var index2 = 0;
  var index3 = 0;
  //constructiong the vertical and the entrees
  for (let i = 0; i < count1*2; i++) {
    verticalBars[index1++] = new Verticalbars((int(i)*u),0);
    let y= random(0,height)
    entrees[index3++] = new Entree((int(i)*u),y);
  }
  //constructiong the horizontal bars
  for (let j = 0; j< count2*2; j++){
    let x=random(0,width);
    horizontalBars[index2++] = new Horizontalbars(x,(int(j)*u2));
  }

  for( let e =0; e <numNotes; e++){
    let x=random(0,width);
    let y= random(0,height);
    let note = new Note(x,y);
    notes.push(note);
  }
}


function draw() {
  if(state==='title'){
    background(125);
    //creating a button for playing the audio
    let buttonColor = color(50);
    audioButton = createButton('Play the game');
    audioButton.style('font-size','30px');
    audioButton.style('background-color', buttonColor);
    audioButton.position(width/1.5,height/3);
    //if the button is pressed play the audio
    audioButton.mousePressed(audio);

    text('description',width/2,height/2);

  }

  else if(state==='start'){
    noStroke();
    background(0);

    for( let i=0; i<notes.length; i++){
      let note=notes[i];
      note.draw();
      note.play();
    };

    //drawing the vertical bars and entrees
    for (var i = 0; i <= count1; i++) {
      verticalBars[i].draw();
      entrees[i].draw();
      entrees[i].keyPressed();
    }
    //drawing the horizontal bars
    for (var j = 0; j <= count2; j++) {
      horizontalBars[j].draw();
      horizontalBars[j].interaction();
    }

    //if the ball is still within the screen height
    if(ball.y<height){
      fill(200,0,0);
      //drawing the ball
      ellipse(ball.x,ball.y,ball.size);
      //moving the ball
      ball.y=ball.y+ball.movement;
      ball.x=ball.x+ball.movement1;
    }
    //if the ball has left the screen reapear at a random y
    if(ball.y>=height){
      ball.x=random(0,width);
      ball.y=0;
      ball.y=ball.y+ball.movement;
    }
  }
}

function mousePressed() {
  ball.movement1= -ball.movement1
}

function audio(){
  //playing introduction audio(an audio straight out of the animation)
  if(state==='title'){
    state='start';
    //playing background audio
    baseMelody.play();
    audioButton.hide();
  };
}
