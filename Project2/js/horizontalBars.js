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
    fill(0);
    //using quad instead of rect to set slope for the bars
    rect(this.j,this.j,50,25)
    //slowly increasing the slope
    this.tan=this.tan+0.01;
    //the movement speed for the bars
    this.y = this.y - this.speed;

    if(this.y > heightExtra){
      this.y = -u;
    }
    if(this.y < -u){
      this.y = heightExtra;
    }
    pop();
  }
}
