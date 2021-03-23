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
    let widthExtra;
    translate(this.x, this.y);
    noStroke();
    fill(29);
    //using quad instead of rect to set slope for the bars
    rect(500,300,50,25)
    //slowly increasing the slope
    this.tan=this.tan+0.01;
    //the movement speed for the bars
    this.y = this.y - this.speed;
    this.x = this.x + this.speed;
    if(this.x > widthExtra){
      this.x = -u;
    }
    if(this.x < -u){
      this.x = widthExtra;
    }
    pop();
  }
}
