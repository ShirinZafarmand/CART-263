class Timer{

  //building timer structure
  constructor(){
      this.x=0,
      this.y=0,
      this.width=13800,
      this.height=13000,
      this.image=undefined,
      this.shrink=15
  };

loadingImage(){
  this.image=loadImage(`assets/images/BUTTON.png`);
}

  //displaying thr timer
  display(){
    push()
    imageMode(CENTER)
    this.x=windowWidth/2
    this.y=windowHeight/2
    image(this.image,this.x,this.y,this.width,this.height)
    pop()
    this.width=constrain(this.width,100,13800)
  };

  //the speed of the timer
  shrink(){
    this.height=this.height-this.shrink
    this.width=this.width-this.shrink
  };

  //when time is over then change the state
  timeOver(){
    if(this.width===2000){
      background(150,0,0);
      fill(255);
      //show the losing titration
      text('sorry. You failed. maybe try again' ,width/2,height/2);
    }
    };
  }
