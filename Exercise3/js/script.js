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

let redTones=0;


let fingerprint;

function preload() {
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`)


  fingerprint = loadImage('assets/images/fingerprint2.png');
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
  background(0);
push();

  let profile =`**SECURITY CHECK. CONFORM YOUR IDENTITY**

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;
pop();
  push();
  textSize(44);
  textAlign(LEFT);
  textFont(`Courier, monospace`)
  redTones=random(100,250)
  fill(redTones,0,0)
  text(profile,100,450)
  pop();


  image(fingerprint,200,850,500)
}

function keyPressed(){
  if(key === `c`){
    localStorage.removeItem(`spy-profile-data`)
  }
}
