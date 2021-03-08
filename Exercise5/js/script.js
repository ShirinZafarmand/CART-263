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

line1P.addEventListener(`click`,lineClicked);
line2P.addEventListener(`click`,lineClicked);
line3P.addEventListener(`click`,lineClicked);



setInterval(moveLine1,20)
let position=0;

function lineClicked(event){
  fadeOut(event.target,1);
}

function fadeOut(element,opacity){
  opacity-=0.01;
  element.style[`opacity`]=opacity;
  if(opacity>0){
    requestAnimationFrame(function(){
      fadeOut(element,opacity);
    });
  }
  else{
    setNewLine(element);
    fadeIn(element,0);
  }
}

function fadeIn(element,opacity){
  opacity+=0.01;
  element.style[`opacity`]=opacity;
  if(opacity<1){
    requestAnimationFrame(function(){
      fadeIn(element,opacity)
    })
  }
}

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


function moveLine1(){
    let line1position = document.getElementById("line-1")
    line1position.style.position="relative";
    position +=10;
    line1position.style.left= position + "px";
}
