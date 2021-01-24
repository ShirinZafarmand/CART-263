class Virus extends Bacteria{
  constructor(x,y,image,relocate,rotation){
    super(x,y,image);
    this.found=false;
    this.rotationSpeed=0.25;
  }

  update(){
    super.update();

    if (this.found){
      this.angle += 1;
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
    else{
      bg.r=100;
    }
  }
}
