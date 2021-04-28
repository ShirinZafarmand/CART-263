class Note{

  constructor(x,y){
    this.x=x,
    this.y=y,
    this.width=100,
    this.height=50
  }

  draw(){
    push();
    fill(100,30,50);
    ellipse(this.x,this.y, 50)
    pop();
  }
}
