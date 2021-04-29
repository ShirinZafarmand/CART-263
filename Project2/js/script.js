"use strict";

/**************************************************
Project2
shirin zafarmand
**************************************************/
var u;
var u2;
var count1;
var count2;
var verticalBars = [];
var horizontalBars =[];
var entrees =[];
var entrees2 =[];
let notes=[];
let numNotes=20;
let baseMelody;
let state ='title';
let audioButton;
let singleNotes=[];
let bg;
let mic;
let recorder;
let soundFile;

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
  singleNotes.push(one);
  let two =loadSound(`assets/sounds/two.wav`);
  singleNotes.push(two);
  let three =loadSound(`assets/sounds/three.wav`);
  singleNotes.push(three);
  let four =loadSound(`assets/sounds/four.wav`);
  singleNotes.push(four);
  let five =loadSound(`assets/sounds/five.wav`);
  singleNotes.push(five);
  let six =loadSound(`assets/sounds/six.wav`);
  singleNotes.push(six);
  let seven =loadSound(`assets/sounds/seven.wav`);
  singleNotes.push(seven);
  let eight =loadSound(`assets/sounds/eight.wav`);
  singleNotes.push(eight);
  let nine =loadSound(`assets/sounds/nine.wav`);
  singleNotes.push(nine);
  let ten =loadSound(`assets/sounds/ten.wav`);
  singleNotes.push(ten);

  bg = loadImage('assets/images/backgroundImage2.png');
}


function setup() {
  let cnv=createCanvas(windowWidth/1.5, windowHeight/1.5);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  textSize(32);
  textAlign(CENTER,CENTER);



  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();




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
  for (let i = 0; i < count1*3; i++) {
    verticalBars[index1++] = new Verticalbars((int(i)*u),0);
    let y= random(0,height)
    entrees[index3++] = new Entree((int(i)*u),y);
  }

  //constructiong the horizontal bars
  for (let j = 0; j< count2*1.5; j++){
    let x=random(0,width);
    horizontalBars[index2++] = new Horizontalbars(x,(int(j)*u2));
  }

  for( let e =0; e <numNotes; e++){
    let x=random(0,width);
    let y= random(0,height);
    let m= random(singleNotes);
    let note = new Note(x,y,m);
    notes.push(note);
  }
}


function draw() {
  if(state==='title'){
    background(bg);

    //creating a button for playing the audio
    let buttonColor = color(50);
    audioButton = createButton('Play The Game');
    audioButton.style('font-size','30px');
    audioButton.style('background-color', buttonColor);
    let buttonX=(windowWidth - width) / 2;;
    let buttonY=(windowHeight - height) / 2;
    audioButton.position(buttonX,buttonY);

    //if the button is pressed play the audio
    audioButton.mousePressed(audio);




    //the description text of the game
    fill(120);
    text('description',width/2,height/2);
  }

  else if(state==='start'){
    noStroke();
    background(bg);

    let buttonColor = color(50);
    audioButton = createButton('Pause The Game ');
    audioButton.style('font-size','30px');
    audioButton.style('background-color', buttonColor);
    let buttonX=(windowWidth - width) / 2;;
    let buttonY=(windowHeight - height) / 2;
    audioButton.position(buttonX,buttonY);

    //if the button is pressed play the audio
    audioButton.mousePressed(pause);

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

    for (var i = 0; i <= count1; i++) {
      verticalBars[i].draw();
      entrees[i].draw();
      entrees[i].keyPressed();
    }

    //drawing the horizontal bars
    for (var e = 0; e <= count2; e++) {
      horizontalBars[e].draw();
      horizontalBars[e].interaction();
    }

    //if the ball is still within the screen height
      fill(114, 127, 148);
      //drawing the ball
      ellipse(ball.x,ball.y,ball.size);
      //moving the ball
      ball.y=ball.y+ball.movement;
      ball.x=ball.x+ball.movement1;

//if(ball.y<-50){
//  ball.x=random(0,width);
//  ball.y=0;
//  ball.y=ball.y+1;
//}

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
  };
}

function pause(){
  //playing introduction audio(an audio straight out of the animation)
  if(state==='start'){
    state='title';
    //playing background audio
    baseMelody.stop();
  };
}
