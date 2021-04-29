class Note{

  constructor(x,y,m){
    this.x=x,
    this.y=y,
    this.size=50,
    this.playingNote=m
  }

  draw(){
    push();
    fill(100,30,50);
    ellipse(this.x,this.y, this.size)
    pop();
  }

  play(m){
    let d= dist(ball.x,ball.y, this.x,this.y)
    if(d<=40){
      this.size=0;
      for(let i=1; i<=1; i++){
        this.playingNote.play();
      }

    }
  }

}
