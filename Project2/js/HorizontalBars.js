class Horizontalbars{

  constructor(x,y){
    this.x = x;
    this.y =y;
    this.j = 0;
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
    //displaying the horizontal bars
    rectMode(CENTER);
    rect(this.j,this.j,100,25)
    //the movement speed for the bars
    this.y = this.y - 1;


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

  interaction(){
    let d= dist(ball.x,ball.y, this.x,this.y)
    if(d<=40){
      ball.movement= -1;
      ball.y=ball.y+ball.movement;
      ball.movement1=0;

    }
  }
}
