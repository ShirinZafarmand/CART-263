class Virus extends Bacteria{
  constructor(x,y,image,relocate,rotation){
    super(x,y,image,relocate,rotation);
    this.found=false;
    //changing the direction of virus
    this.rotationSpeed=0.25;
  }

  update(){
    super.update();
    //if the virus is found it disapears
    if (this.found){
      this.image.height=0;
      this.image.width=0;
      state='win';
    }
  }

  mousePressed(){
    //check if the user has clicked on the virus
    if(mouseX> this.x - this.image.width/2 &&
      mouseX< this.x + this.image.width/2 &&
      mouseY> this.y - this.image.height/2 &&
      mouseY< this.y + this.image.height/2){
        this.found=true;
        disinfection.play();
      }
      //if the user has been mistaken, user loses time
      if(mouseX< this.x - this.image.width/2 ||
        mouseX> this.x + this.image.width/2 ||
        mouseY< this.y - this.image.height/2 ||
        mouseY> this.y + this.image.height/2){
          timer.height=timer.height-100;
        };
      }

      demo(){
        //show an example of how the virus looks like
        imageMode(CENTER);
        image(this.image,windowWidth/2,windowHeight/2+200,300,250);
      }
    }
