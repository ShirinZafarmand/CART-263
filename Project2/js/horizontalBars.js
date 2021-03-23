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
    fill(5,30,40);
    //using quad instead of rect to set slope for the bars
    rect(this.j,this.j+this.tan,width/2,25)
    //slowly increasing the slope
    this.tan=this.tan+0.01;
    //the movement speed for the bars
    this.y = this.y + this.speed;
    if(this.y > widthExtra){
      this.y = -u;
    }
    if(this.y < -u){
      this.y = widthExtra;
    }
    pop();
  }
}
