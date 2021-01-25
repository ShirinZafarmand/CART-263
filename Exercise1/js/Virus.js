class Virus extends Bacteria{
  constructor(x,y,image,relocate,rotation){
    super(x,y,image,relocate,rotation);
    this.found=false;
    this.rotationSpeed=0.25;
  }

  update(){
    super.update();

    if (this.found){
      this.image.height=0;
      this.image.width=0;
      state='win';
    }
  }

  mousePressed(){
    if(mouseX> this.x - this.image.width/2 &&
       mouseX< this.x + this.image.width/2 &&
       mouseY> this.y - this.image.height/2 &&
       mouseY< this.y + this.image.height/2){
       this.found=true;
       disinfection.play();
    }
   if(mouseX< this.x - this.image.width/2 ||
      mouseX> this.x + this.image.width/2 ||
      mouseY< this.y - this.image.height/2 ||
      mouseY> this.y + this.image.height/2){
        timer.height=timer.height-100
    }
  }

  demo(){
    imageMode(CENTER);
    image(this.image,windowWidth/2,windowHeight/2+150,300,250)
  }
}
