"use strict";

/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

const animals=[
     "a-a-r-d-v-a-r-k",
     "a-l-l-i-g-a-t-o-r",
   ];

let currentAnimal =``;


function setup() {

}


function draw() {

}


function mousePressed(){
  currentAnimal= random(animals);
  let brokenString= breakString(currentAnimal);
  responsiveVoice.speak(brokenString);
}


/**
Reverses the provided string
*/
function breakString(string) {
  // Split the string into an array of characters
  let characters = string.split("-");

  let result = characters.join('-');
  // Return the result
  return result;
}
