/**
Raving Redactionist++
Shirin Zafarmand


*/

"use strict";

//the winning notification text
let correctNotif=`Your Secret Message Has Been Sent to The Agent`;
//the losing notification text
let wrongNotif=`You Have Entered the Wrong Message. Your Identity Is Exposed, Give Up to The Police`;
//the secret message in the text
let hiddenMessage= `red code exit the buildin`;

setInterval(hide, 500);

function hide(){
  $(`.revealed`).each(attemptCover);
}

//attempt to cover the words slowly
function attemptCover(){
  let r= Math.random();
  if(r<0.04){
    $(this).removeClass(`releaved`);
    $(this).addClass(`redacted`);
  }
}

//if the button is clicked save the entered message
$(`#button`).on(`click`, function(event){
  let input= $(`#message-input`).val();
  //check if the message is correct
  if(input === hiddenMessage){
    alert(notif);
  }
  else{
    alert(wrongNotif);
  }
})
