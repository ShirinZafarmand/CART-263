class Entree{
  //the entrees follow the same direction and movements of the vertical bars

  constructor(x,y){
    this.x = x;
    this.y =y;
    this.j = 0;
    //the space between the entrees
    this.space=51;
    //movement speed for the entrees
    this.speed = -1;
    this.forward = true;
    this.color=0;
  }

  draw(){
    push();
    let widthExtra;
    translate(this.x, this.y);
    noStroke();
    fill(this.color);
    //drwaing the entrees
    quad(this.j,0        ,this.j+this.space/2,0,       this.j+this.space/2,2*this.space,        this.j,2*this.space);
    pop();

this.y=this.y+this.speed

  }


  keyPressed(){
    let d= dist(this.x, this.y, ball.x, ball.y)
    if(keyCode===37 && d<50){
      ball.x= ball.x-100;
      ball.movement1=0.8
      ball.movement=1
    }
    if(keyCode===39 && d<70){
      ball.x= ball.x+100;
      ball.movement1=0.8
      ball.movement=1
    }
  }

}
