/**
Raving Redactionist++
Shirin Zafarmand


*/
let notif=`Your Secret Message Has Been Sent to The Agent`
"use strict";
let hiddenMessage= `red code exit the buildin`;
setInterval(hide, 500);

function hide(){
  $(`.revealed`).each(attemptCover);
}

function attemptCover(){
  let r= Math.random();
  if(r<0.06){
    $(this).removeClass(`releaved`);
    $(this).addClass(`redacted`);
  }
}

$(`#button`).on(`click`, function(event){
  let input= $(`#message-input`).val();
  if(input === hiddenMessage){
    alert(notif);
  }
})
