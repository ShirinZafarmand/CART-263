class Timer{

  //building timer structure
  constructor(){
    this.x=0;
    this.y=0;
    this.width=30;
    this.height=windowHeight;
    this.diminish=-1;
  };

  //displaying thr timer that covers the whole screen
  display(){
    push();
    rectMode(CORNER);
    fill(127);
    rect(this.x,this.y,this.width,this.height);
    pop();
  };

  //the speed of the timer
  shrink(){
    this.height=this.height+this.diminish;
  };

  //when time is over then change the state
  timeOver(){
    if(this.height<=0){
        state='lose';
      };
    };
  }
