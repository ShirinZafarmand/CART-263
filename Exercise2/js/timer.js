class Timer{

  //building timer structure
  constructor(){
    this.x=0;
    this.y=0;
    this.width=windowWidth;
    this.height=windowHeight;
    this.diminish=-0.4;
  };

  //displaying thr timer
  display(){
    push();
    rectMode(CORNER);
    fill(127,50);
    rect(this.x,this.y,this.width,this.height);
    pop();
  };

  //the speed of the timer
  shrink(){
    this.height=this.height+this.diminish;
    pitch=pitch+pitchIncrease;
    rate=rate+rateIncrease;
  };

  //when time is over then change the state
  timeOver(){
    if(this.height<=0 &&
    score<10){
        state='lose';
      }
      else if(this.height<=0 &&
      score>10){
        state='win'
      }
    };
  }
