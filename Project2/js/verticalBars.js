class Verticalbars{

  constructor(x,y){
    this.x = x;
    this.y =y;
    this.j = 0;
    //the space between the bars
    this.space=25;
    //movement speed for the bars
    this.speed = 1;
    this.forward = true;
  }

  draw(){
    push();
    let widthExtra;
    translate(this.x, this.y);
    noStroke();
    //displaying the vertical bars
    fill(14, 26, 10);
    quad(this.j,0,this.j+this.space,0,this.j+25,height,this.j,height);
    pop();
  }
}
