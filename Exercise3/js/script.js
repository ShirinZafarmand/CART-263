"use strict";

/**
SPY PROFILE GENERETOR++
Shirin Zafarmand

the user has registers with their name to create a spy profile. The next time they have to enter the password for the registered account in irder to
inter their profile. To check they are not robots and further security they must say the name of their alies. Otherwise their access gets restricted.
*/

let spyProfile={
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
  missionPartner:`**REDACTED**`
};

let instrumentData= undefined;
let objectData= undefined;
let tarotData= undefined;
let wrestlerData=undefined;

let redTones=0;

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
  //loading the JSON raw links
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`)
  wrestlerData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/wrestlers.json`)

  //loading the fingerprint image
  fingerprint = loadImage('assets/images/fingerprint2.png');
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  //setting annyang to recieve and save the answer user gives for their alies.
  if (annyang){
    let commands = {
      //saves the given name as a parameter
      'enter the *aliesAnswer': areYouHuman,
    };

    //add this command to annyang
    annyang.addCommands(commands);
    annyang.start();
  }

  //sparing the saved profile in the local storage
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));

  //check if their profile has been created
  if (data !== null){
    //ask the user for th password
    let password= prompt(`password?`);
    if(password===data.password ){
      alert(`Prove you are human by saying the alies. When ready say: enter the *alies_name*`)
      spyProfile.name= data.name;
      spyProfile.alias=hiddenAlies;
      spyProfile.secretWeapon= data.secretWeapon;
      spyProfile.password= data.password;
      spyProfile.missionPartner=data.missionPartner
    }
  }
  else{
    //if they haven't registered, generate a profile
    generateSpyProfile();
  }

  //creating a button for generating a new profile
  let buttonColor = color(50);
  button = createButton('Generate Another Profile');
  button.style('font-size','30px');
  button.style('background-color', buttonColor);
  button.position(150,750);
  //if the button is pressed generate a new profile
  button.mousePressed(generateSpyProfile);
}


function generateSpyProfile(){
  //ask for their name to create a profile
  spyProfile.name = prompt(`what is your name?`);
  //choose a random instrument from the instrument JSON
  let instrument = random(instrumentData.instruments);
  spyProfile.alias = `The ${instrument}`;
  //choose a random weapon from the objects JSON
  spyProfile.secretWeapon= random(objectData.objects);
  //choose a random partner from the wrestlers JSON
  spyProfile.missionPartner=random(wrestlerData.wrestlers)
  //choose a random password from the tarot JSON
  let card= random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  //stringify and save the profile
  localStorage.setItem(`spy-profile-data`,JSON.stringify(spyProfile));
}


function draw() {
  background(bg.r,bg.g,bg.b);

  //displying the profile
  push();
  let profile =`**SECURITY CHECK. CONFIRM YOUR IDENTITY**
  Name: ${spyProfile.name}
  Alias: ${spyProfile.alias}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}
  Mission Partner: ${spyProfile.missionPartner}`;
  pop();


  push();
  textSize(44);
  textAlign(LEFT);
  textFont(`Courier, monospace`)
  //flickering text color for the profile
  redTones=random(100,250)
  fill(redTones,0,0)
  text(profile,100,450)
  pop();

  //glitch effect for the mysterious vusials
  push()
  rectMode(LEFT);
  fill(125)
  glitch.y=random(0,4000);
  glitch.height=random(10,20);
  glitch.width=windowWidth;
  rect(0,glitch.y,glitch.width,glitch.height)
  pop()

  //fingerprint image display
  image(fingerprint,200,850,500)
}

// a key to delete a registered profile
function keyPressed(){
  if(key === `d`){
    localStorage.removeItem(`spy-profile-data`)
  }
}

//check if the user is not a robot
function areYouHuman(aliesAnswer){
  aliesFinalAnswer = aliesAnswer;
  //if the given answer for alies is correct, grant their further access
  let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
  if(aliesFinalAnswer===spyProfile.alias){
    alert(`**Access Granted**`);
    hiddenAlies = data.alies;
  }
  //if the given answer for alies is wrong, prevent their further access
  else {
    alert(`**Access Restricted**`);
  }
}
