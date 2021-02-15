class Timer{

  //building timer structure
  constructor(){
    this.x=0;
    this.y=0;
    this.width=windowWidth;
    this.height=15;
    this.diminish=-4;
  };

  //displaying thr timer
  display(){
    push();
    rectMode(CORNER);
    fill(255);
    rect(this.x,this.y,this.width,this.height);
    pop();
  };

  //the speed of the timer
  shrink(){
    this.width=this.width+this.diminish;
  };

  //when time is over then change the state
  timeOver(){
    if(this.height<=0 && score<4){
        state='lose';
      }
      else if(this.height<=0 &&
      score>=4){
        state='win'
      }
    };
  }
