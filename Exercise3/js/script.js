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

let aliesAnswer;
let secretWeaponAnswer;
let aliesFinalAnswer;
let secretWeaponFinalAnswer;

let glitch={
  x:0,
  y:0,
  height:0,
  width:90,
}


let bg={
  r:0,
  g:0,
  b:0
}

let hiddenAlies;
let fingerprint;
let button;

function preload() {
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`)


  fingerprint = loadImage('assets/images/fingerprint2.png');
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  if (annyang){
    let commands = {
      'enter the *aliesAnswer': aliesLogIn,
    };

    annyang.addCommands(commands);
    annyang.start();
  }


  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  if (data !== null){
    let password= prompt(`password?`);
    if(password===data.password ){
      alert(`Prove you are human by saying the alies. When ready say: enter the *alies_name*`)
      spyProfile.name= data.name;
      spyProfile.alias=hiddenAlies;
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
  background(bg.r,bg.g,bg.b);
push();

  let profile =`**SECURITY CHECK. CONFIRM YOUR IDENTITY**
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

  push()
  rectMode(LEFT);
  fill(125)
  glitch.y=random(0,4000);
  glitch.height=random(10,20);
  glitch.width=windowWidth;
  rect(0,glitch.y,glitch.width,glitch.height)
  pop()

  image(fingerprint,200,850,500)
}


function keyPressed(){
  if(key === `c`){
    localStorage.removeItem(`spy-profile-data`)
  }
}


function aliesLogIn(aliesAnswer){
  aliesFinalAnswer = aliesAnswer;
  if(aliesFinalAnswer===spyProfile.alias){
    alert(`correct`);
    hiddenAlies = data.alies;
  }
  else {
    bg.r=100
  }
}
