"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

const animals=[
     "mouse",
     "alligator",
   ];

let currentAnimal =``;
let currentAnswer =``;
let finalAnimal;

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
  fill(0,255,0)
}

else{
  fill(255,0,0)
}
text(currentAnswer,width/2,height/2)
}

function guessAnimal(animal){
  currentAnswer=animal;
  console.log(currentAnswer)
}

function mousePressed(){
  currentAnimal= random(animals);
  responsiveVoice.speak(currentAnimal);
}


/**
Reverses the provided string
*/
function breakString(currentAnimal) {
  // Split the string into an array of characters
  let finalAnimal = currentAnimal.split('');
return finalAnimal;
}
