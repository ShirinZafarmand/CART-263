"use strict";

/**************************************************
Project2- Meditation break
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
  //loading all the possible random notes
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

  //loading the background image
  bg = loadImage('assets/images/backgroundImage2.png');
}


function setup() {
  let cnv=createCanvas(windowWidth/1.5, windowHeight/1.5);
  //positioning the canvas in the middle of the screen
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);

  //create an audio in
  mic = new p5.AudioIn();
  //users must manually enable their browser microphone for recording to work properly
  mic.start();
  //create a sound recorder
  recorder = new p5.SoundRecorder();
  //connect the mic to the recorder
  recorder.setInput(mic);
  //create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();

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
  for (let i = 0; i < count1*3; i++) {
    verticalBars[index1++] = new Verticalbars((int(i)*u),0);
    //positioning them on the screen with a random y
    let y= random(0,height);
    entrees[index3++] = new Entree((int(i)*u),y);
  }

  //constructiong the horizontal bars
  for (let j = 0; j< count2*1.5; j++){
    //positioning them on the screen with a random x
    let x=random(0,width);
    horizontalBars[index2++] = new Horizontalbars(x,(int(j)*u2));
  }

  //constructiong the notes(bubbles)
  for( let e =0; e <numNotes; e++){
    //positioning them on the screen with a random x an y
    let x=random(0,width);
    let y= random(0,height);
    //chong the random note from the array
    let randomNote= random(singleNotes);
    let note = new Note(x,y,randomNote);
    notes.push(note);
  }
}


function draw() {
  if(state==='title'){
    background(bg);

    //creating a button for playing the main melody
    let buttonColor = color(50);
    audioButton = createButton('Play The Game');
    //including a style to the button
    audioButton.style('font-size','30px');
    audioButton.style('background-color', buttonColor);
    audioButton.position((windowWidth - width) / 2, (windowHeight - height) / 2);

    //if the button is pressed play the main melody
    audioButton.mousePressed(audio);

    //the description of the Game
    fill(100);
    text('this game is the meditation break where you randomly add flute notes tothe background music',width/2,height/2);
    text('by catching the small balls. click on the screen to change the movement of the blue ball and',width/2,height/2+40);
    text('if you get stuck between the benches, wait till you reach the postern holes and the play with the arrow keys. ',width/2,height/2+80);
    text('there is no winning or losing, just you having fun making a random melody',width/2,height/2+120);
    text('when ready, click the button on the left corner!',width/2,height/2+160);
  }

  else if(state==='start'){
    noStroke();
    background(bg);

    //displaying the notes(bubbles)
    for( let i=0; i<notes.length; i++){
      let note=notes[i];
      note.draw();
    }

    //displaying the vertical bars and entrees
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

    fill(114, 127, 148);
    //drawing the blue ball(user)
    ellipse(ball.x,ball.y,ball.size);
    //movements of the the blue ball(user)
    ball.y=ball.y+ball.movement;
    ball.x=ball.x+ball.movement1;

    //if the ball has left the screen reapear at a random x
    if(ball.y>=height){
      ball.x=random(0,width);
      ball.y=0;
      ball.y=ball.y+ball.movement;
    }
  }
}

function mousePressed() {
  //if the mouse is pressed change the direction of the movement(the blue ball)
  ball.movement1= -ball.movement1;

  //use the '.enabled' boolean to make sure user enabled the mic
  if (state ===`title` &&  mic.enabled) {
    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    //notify the user that the recording has started!
    fill(125);
    text('Recording now! Click to stop.',width/2,height/3);

    //change the state after the recording is complete
    state=`one`;

  }  else if (state===`one`) {
    //if the mouse is pressed stop recording
    recorder.stop();

    //notify the user that the recording has started!
    background(10);
    text('Recording stopped. Click to use it as a note.', width/2,height/3);

    //change the state after the recording is stopped
    state=`two`;

  }  else if (state===`two`) {
    //push the recording to the array of possible notes
    singleNotes.push(soundFile);
    //go back to the instruction state
    state=`title`
  }
}

function keyPressed(){
  //if the space key is pressed play the notes
  if (keyCode===32){
    for( let i=0; i<notes.length; i++){
      let note=notes[i];
      note.play();
    }
  }
}


function audio(){
  //playing background melody
  if(state==='title'){
    state='start';
    baseMelody.play();
    audioButton.hide();
  };
}
