class Horizontalbars{

  constructor(x,y){
    this.x = x;
    this.y =y;
    //
    this.j = 0;
    //the space between the bars
    this.tan=25;
    //movement speed for the bars
    this.speed = 1;
    this.forward = true;
  }

  draw(){
    push();
    let heightExtra;
    translate(this.x, this.y);
    noStroke();
    fill(15,30,0);
    //using quad instead of rect to set slope for the bars
    rect(this.j,this.j,100,25)
    //slowly increasing the slope
    this.tan=this.tan+0.01;
    //the movement speed for the bars
    this.y = this.y - 1;
    this.x = this.x + this.speed;
    if(this.y > heightExtra){
      this.y = -u;
    }
    if(this.y < -u){
      this.y = heightExtra;
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
