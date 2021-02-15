class Ball{

  //building fish
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.speed=0;
    this.size=50;
    this.active=true;
    this.fill={
      r:0,
      g:0,
      b:255
    };
  };


  //balls falling down
  move(){
    this.speed=random(2,6)
    this.y= this.y+this.speed;

    if (this.y - this.size/2 >height){
      this.active=false;
    };
  };


  //displying balss
  display(){
    push();
    fill(this.fill.r,this.fill.g,this.fill.b);
    stroke(0);
    ellipse(this.x,this.y,this.size);
    pop();
  };
}
