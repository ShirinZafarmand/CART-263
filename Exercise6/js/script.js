/**
Raving Redactionist++
Shirin Zafarmand


*/

"use strict";

setInterval(hide, 500);


function hide(){
  $(`.revealed`).each(attemptCover);
}

function attemptCover(){
  let r= Math.random();
  if(r<0.8){
    $(this).removeClass(`releaved`);
    $(this).addClass(`redacted`);
  }
}
