class Entree{
  //the entrees follow the same direction and movements of the vertical bars

  constructor(x,y){
    this.x = x;
    this.y =y;
    this.j = 0;
    //the space between the entrees
    this.space=50;
    //movement speed for the entrees
    this.speed = 1;
    this.forward = true;
  }

  draw(){
    push();
    let widthExtra;
    translate(this.x, this.y);
    noStroke();
    fill(0);
    //drwaing the entrees
    quad(this.j,0,this.j+this.space,0,this.j+this.space,2*this.space,this.j,2*this.space);

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
