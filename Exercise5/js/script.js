/**
Haiku Generator++
Shirin Zafarmand

*/

"use strict";
let fiveSyllableLines=[
  `O, to be a tree`,
  `The cat does not know`,
  `We are all forests`,
  `You have done your best`,
  `They are all gone now`
];
let sevenSyllableLines=[
  `Say the things left unsaid`,
  `Never believe the wind's lies`,
  `The autumn stretches its legs`,
  `Nothing can satisfy you`,
  `They will not come back again`
];
let backgroundGif=[
  `css/one.gif`,
  `css/two.gif`,
  `css/three.gif`,
  `css/four.gif`,
  `css/five.gif`,
  `css/six.gif`,
  `css/seven.gif`
]

let line1=random(fiveSyllableLines);
let line2=random(sevenSyllableLines);
let line3=random(fiveSyllableLines);

console.log(line1);
console.log(line2);
console.log(line3);

let line1P= document.getElementById(`line-1`);
let line2P= document.getElementById(`line-2`);
let line3P= document.getElementById(`line-3`);

line1P.innerText=line1;
line2P.innerText=line2;
line3P.innerText=line3;

let position=0;
let position2=0;
let position3=0;


let button2=document.getElementById(`stop-button`);
button2.addEventListener(`click`,function(event){
document.getElementById(`image`).src=random(backgroundGif);
clearTimeout(moveLine1);
clearTimeout(moveLine2);
clearTimeout(moveLine3);
});


let button=document.getElementById(`start-button`);
button.addEventListener(`click`,function(event){
  requestAnimationFrame(function(){
    moveLine1();
    moveLine2();
    moveLine3();
  })
});


function setNewLine(element){
  if(element===line1P || element===line3P){
    element.innerText=random(fiveSyllableLines);
  }
  else if(element===line2P){
    element.innerText=random(sevenSyllableLines)
  }
}

function random(array){
  let index=Math.floor(Math.random()*array.length);
  return array[index]
}

let speed=10;
function moveLine1(){
  let line1position = document.getElementById("line-1")
  line1position.style.position="relative";
  position +=speed;
  line1position.style.left= position + "px";
  setInterval(setNewLine(line1P),1000);
  if(position>window.innerWidth){
    position=0;
  }
}

let speed2=15;
function moveLine2(){
  let line2position = document.getElementById("line-2")
  line2position.style.position="relative";
  position2 +=speed2;
  line2position.style.left= position2 + "px";
  setInterval(setNewLine(line2P),1000);
  if(position2>window.innerWidth){
    position2=0;
  }
}

let speed3=20;
function moveLine3(){
  let line3position = document.getElementById("line-3")
  line3position.style.position="relative";
  position3 +=speed3;
  line3position.style.left= position3 + "px";
  setInterval(setNewLine(line3P),1000);
  if(position3>window.innerWidth){
    position3=0;
  }
}
