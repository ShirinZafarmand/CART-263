/**
Raving Redactionist++
Shirin Zafarmand


*/

"use strict";
$(`.top-secret`).on(`click`, redact);
setInterval(revelation, 500);

function redact(event){
  $(this).addClass(`redacted`);
  $(this).removeClass(`revealed`);
}

function revelation(){
  $(`.redacted`).each(attemptReveal);
}

function attemptReveal(){
  let r= Math.random();
  if(r<0.1){
    $(this).removeClass(`redacted`);
    $(this).addClass(`revealed`);
  }
}
