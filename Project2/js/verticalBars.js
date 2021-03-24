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
    fill(15,30,0);
    quad(this.j,0,this.j+this.space,0,this.j+25,height,this.j,height);
    //slowly adding a slope
    this.space=this.space+0.01;
    //the movement speed for the bars
    this.x = this.x + this.speed;
    pop();
  }

  pressed(){
    //if the mouse is pressed change the direction of movement
    if (this.forward === true){
      this.speed = this.speed*-1;
      this.forward = false;
    } else {
      this.speed = this.speed*-1;
      this.forward = true;
    }
  }
}
