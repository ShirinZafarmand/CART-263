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
    fill(14, 26, 10);
    //displaying the horizontal bars
    rectMode(CENTER);
    rect(this.j,this.j,70,25);
    //the movement speed for the bars
    this.y = this.y - 1;

    //if the bar has left the screen reapear at a random y
    if(this.y<=-40){
      this.y=1700;
    }
    pop();
  }


  interaction(){
    //measure the distance between the blue ball(user) and the bars
    let d= dist(ball.x,ball.y, this.x,this.y);

    //check if the blue ball is within the distance, the horizontal bars carry it  upwards
    if(d<=40){
      ball.movement= -1;
      ball.y=ball.y+ball.movement;
      ball.movement1=0;
    }
  }
}
