"use strict";

/**
Guess the word
Shirin Zafarmand
The user hears a animal word which is pronounced in different accent. the rate and the volume get higher az the time goes by
so distinguishing the word gets harder. They should raise the score to 30 in order to win.
*/

const animals=[
  "aardvark",
        "alligator",
        "alpaca",
        "antelope",
        "ape",
        "armadillo",
        "baboon",
        "badger",
        "bat",
        "bear",
        "beaver",
        "bison",
        "boar",
        "buffalo",
        "bull",
        "camel",
        "canary",
        "capybara",
        "cat",
        "chameleon",
        "cheetah",
        "chimpanzee",
        "chinchilla",
        "chipmunk",
        "cougar",
        "cow",
        "coyote",
        "crocodile",
        "crow",
        "deer",
        "dingo",
        "dog",
        "donkey",
        "dromedary",
        "elephant",
        "elk",
        "ewe",
        "ferret",
        "finch",
        "fish",
        "fox",
        "frog",
        "gazelle",
        "gila monster",
        "giraffe",
        "gnu",
        "goat",
        "gopher",
        "gorilla",
        "grizzly bear",
        "ground hog",
        "guinea pig",
        "hamster",
        "hedgehog",
        "hippopotamus",
        "hog",
        "horse",
        "hyena",
        "ibex",
        "iguana",
        "impala",
        "jackal",
        "jaguar",
        "kangaroo",
        "koala",
        "lamb",
        "lemur",
        "leopard",
        "lion",
        "lizard",
        "llama",
        "lynx",
        "mandrill",
        "marmoset",
        "mink",
        "mole",
        "mongoose",
        "monkey",
        "moose",
        "mountain goat",
        "mouse",
        "mule",
        "muskrat",
        "mustang",
        "mynah bird",
        "newt",
        "ocelot",
        "opossum",
        "orangutan",
        "oryx",
        "otter",
        "ox",
        "panda",
        "panther",
        "parakeet",
        "parrot",
        "pig",
        "platypus",
        "polar bear",
        "porcupine",
        "porpoise",
        "prairie dog",
        "puma",
        "rabbit",
        "raccoon",
        "ram",
        "rat",
        "reindeer",
        "reptile",
        "rhinoceros",
        "salamander",
        "seal",
        "sheep",
        "shrew",
        "silver fox",
        "skunk",
        "sloth",
        "snake",
        "squirrel",
        "tapir",
        "tiger",
        "toad",
        "turtle",
        "walrus",
        "warthog",
        "weasel",
        "whale",
        "wildcat",
        "wolf",
        "wolverine",
        "wombat",
        "woodchuck",
        "yak",
        "zebra"
];

const languages=[
  "UK English Male",
  "French Male",
  "German Male",
  "Dutch Male",
  "Swedish Male",
  "Chinese Female",
  "Russian Female",
  "Turkish Male",
  "Arabic Male",
  "Latin Female",
  "Welsh Male",
  "Hindi Female"
]

let currentAnimal =``;
let currentAnswer =``;
let voice="";
let correctAnswer;
let wrongAnswer;
let scoreIncrease=false;
let score=0;
let timer;
let state ='title';
let pitch=2.5;
let rate=1.5;
let pitchIncrease=0.001
let rateIncrease=0.0001/2;

function preload(){
  //load the correct answer sound effect
  correctAnswer= loadSound(`assets/sounds/correct.mp3`);
  //load the wrong answer sound effect
  wrongAnswer= loadSound(`assets/sounds/wrong.mp3`);
}


function setup() {
  createCanvas(windowWidth,windowHeight)
  if (annyang){
    let commands = {
      //save the name of the animal as an answer
      'I think it is *animal': guessAnimal
    };
    //add the asnwer to annyang command storage
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
    //the instruction of the game
    text('There are different animals that are pronounced with multi-cutural accents but as the time goes the pitch and rate goes higher.',width/2,height/2);
    text('You have to gain 30 scores in the given time in order to win. ready? press the enter key',width/2,height/2+50);

  }

  else if(state==='start'){
    background(0)
    fill(255);
    //displaying th escore
    text('Your Score: ' + score,width/2,height/3);

    //check if the answer matched the word
    if(currentAnimal===currentAnswer && scoreIncrease===true){
      fill(0,255,0);
    }

    else{
      //if the answer id wrong the text color is red
      fill(255,0,0);
    };

    //display the given answer
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

//transition from instructions to the game
function keyPressed(){
  if(keyCode===13 &&
    state==='title'){
      state='start';
    }
  }

  function guessAnimal(animal){
    currentAnswer=animal;
    console.log(currentAnswer);
    scoreIncrease=true;
    if(currentAnimal===currentAnswer){
      //if the answer is right increase the score by one
        score++/2
        //play the correct answer sound effect
        correctAnswer.play();
    }
  }

  function mousePressed(){
    //choose a random animal name from the array
    currentAnimal= random(animals);
    //choose a random pronunciation from the array
    voice=random(languages);
    //displaying the voice that says the animal name
    responsiveVoice.speak(currentAnimal,voice,{
      pitch:pitch,
      rate:rate,
    });
  }



  function lost(){
    if (state === 'lose'){
      background(150,0,0);
      fill(255);
      //show the losing titration
      text('You failed to spell these words correctly and in time' ,width/2,height/2);
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
