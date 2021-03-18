/**
Raving Redactionist++
Shirin Zafarmand


*/

"use strict";

let correctNotif=`Your Secret Message Has Been Sent to The Agent`;
let wrongNotif=`You Have Entered the Wrong Message. Your Identity Is Exposed, Give Up to The Police`;
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
  else{
    alert(wrongNotif);
  }
})
