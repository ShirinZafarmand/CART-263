"use strict";

/**
SPY PROFILE GENERETOR++
Shirin Zafarmand

This is a template. You must fill in the title,
author, and this description to match your project!
*/

let spyProfile={
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
};

let instrumentData= undefined;
let objectData= undefined;
let tarotData= undefined;


function preload() {
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`)
}


function setup() {
  createCanvas(windowWidth,windowHeight);


  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  if (data !== null){
    let password= prompt(`password?`);
    if(password===data.password){
      spyProfile.name= data.name;
      spyProfile.alias=data.alias;
      spyProfile.secretWeapon= data.secretWeapon;
      spyProfile.password= data.password;
    }
  }
  else{
    generateSpyProfile();
  }
}


function generateSpyProfile(){
  spyProfile.name = prompt(`what is your name?`);
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  spyProfile.secretWeapon= random(objectData.objects);
  let card= random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  localStorage.setItem(`spy-profile-data`,JSON.stringify(spyProfile));
}


function draw() {
  background(255);

  let profile =`**SPY PROFILE**

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textSize(24);
  textAlign(LEFT);
  fill(0);
  text(profile,1400,700)
  pop();
}

function keyPressed(){
  if(key === `c`){
    localStorage.removeItem(`spy-profile-data`)
  }
}
