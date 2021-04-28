class Note{

  constructor(x,y){
    this.x=x,
    this.y=y,
    this.size=50
  }

  draw(){
    push();
    fill(100,30,50);
    ellipse(this.x,this.y, this.size)
    pop();
  }

  play(){
    let d= dist(ball.x,ball.y, this.x,this.y)
    if(d<=40){
      this.size=0
    }
  }
}
