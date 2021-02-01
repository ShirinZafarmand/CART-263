"use strict";

/**
Spelling Game
Shirin Zafarmand

*/

const animals=[
  "mouse",
  "alligator",
];

let currentAnimal =``;
let currentAnswer =``;
let finalAnimal;
let correctAnswer;
let score=0
let timer;
let state ='title';

function preload(){
  correctAnswer= loadSound(`assets/sounds/correct.mp3`);
}


function setup() {
  createCanvas(windowWidth,windowHeight)
  if (annyang){
    let commands = {
      'I think it is *animal': guessAnimal
    };
    annyang.addCommands(commands);
    annyang.start();
    textSize(32);
    textAlign(CENTER,CENTER);
    //constructiong the timer
    timer= new Timer();
  }
}


function draw() {

  if(state==='title'){
    background(125)
    fill(255);
    text('There is a stubborn virus among the bacterias. It has to be cuaght before it becomes toxic. The time considered to complete this mission is on the left. ',width/2,height/2);
  }
  else if(state==='start'){
    background(0)
    fill(255);
    text(score,width/2,height/3);
    
    if (keyIsDown(32)){
      breakString();
    };

    if(currentAnimal===currentAnswer){
      fill(0,255,0);

    }

    else{
      fill(255,0,0);
    };

    text(currentAnswer,width/2,height/2);

    //displaying timer and showing the time that is left
    timer.display();
    timer.shrink();
    //when time is over they lose
    timer.timeOver();

    lost();
    won();
  }

}


function keyPressed(){
  if(keyCode===13 &&
    state==='title'){
      state='start';
    }
  }

  function guessAnimal(animal){
    currentAnswer=animal;
    console.log(currentAnswer);
  }

  function mousePressed(){
    currentAnimal= random(animals);
    responsiveVoice.speak(currentAnimal);
  }


  /**
  breaking the letters of the animal word
  */
  function breakString(string) {
    // Split the string into an array of characters
    finalAnimal = string.split('');
    return finalAnimal;
  }


  function lost(){
    if (state === 'lose'){
      background(150,0,0);
      fill(255);
      //show the losing titration
      text('It is too late to disinfect. Time is over.' ,width/2,height/2);
    };
  };


  function won(){
    if (state === 'win'){
      background(0,150,0);
      fill(255);
      //show the winning titration
      text('Made it in time' ,width/2,height/2);
    };
  }
