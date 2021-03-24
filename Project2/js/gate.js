class Gate{

  constructor(x,y){
    this.x = x;
    this.y =y;
    //
    this.j = 0;
    //the space between the bars
    this.tan=50;
    //movement speed for the bars
    this.speed = 1;
    this.forward = true;
  }

  draw(){
    push();
    let widthExtra;
    translate(this.x, this.y);
    noStroke();
    fill(0);
    //using quad instead of rect to set slope for the bars
    quad(this.j,0,this.j+this.tan,0,this.j+this.tan,100,this.j,100);
    //the movement speed for the bars
    this.x = this.x + this.speed;
    if(this.x > widthExtra){
      this.x = -u;
    }
    if(this.x < -u){
      this.x = widthExtra;
    }
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
