class Note{

  constructor(x,y,randomNote){
    this.x=x,
    this.y=y,
    this.size=40,
    this.playingNote=randomNote
  }

  draw(){
    push();
    fill(77, 66, 24);
    //drawing the balls that contain the random notes
    ellipse(this.x,this.y, this.size);
    pop();
  }

  play(randomNote){
    //measure the distance between the balls and the notes
    let d= dist(ball.x,ball.y, this.x,this.y);
    //check if the gate is within the distance, play the notes
    if(d<=40){
      this.size=0;
      for(let i=1; i<=1; i++){
        //set a volume and a fade in effect for the notes
        this.playingNote.setVolume(1.2,15);
        //play the note
        this.playingNote.play();
      }
    }
  }
}
