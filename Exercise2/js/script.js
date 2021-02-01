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
  }
}


function draw() {
background(0)

if (keyIsDown(32)){
  breakString();
};

if(finalAnimal===currentAnswer){
  fill(0,255,0);
  correctAnswer.play();
}

else{
  fill(255,0,0);
};

text(currentAnswer,width/2,height/2);
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
