class Bacteria{
  constructor(x,y,image,relocate,rotation){
    //bacterias locations
    this.x=x;
    this.y=y;
    this.image=image;
    //the begining amount of tarsnparency
    this.tint=255;
    //slowly becomes trasnparent
    this.tintRange=-4;
    this.angle=0;
    //image size
    this.size=0;
    this.relocate=relocate;
    this.rotation=rotation;
  }

  update(){
    //display the bacteria
    this.display();
  }

  display(){
    push();
    imageMode(CENTER);
    translate(this.x,this.y);
    //rotate the bacteria images
    this.angle=this.rotation;
    rotate(this.angle);
    //change their sizes randomly so have a glitch effect
    this.size=random(130,145);
    tint(255, this.tint);
    //change the trasnparency
    this.tint= this.tint+this.tintRange;
    //make them reapear once they are almost transparent
    if(this.tint<10){
      this.tintRange=-this.tintRange;
      //relocating the images once they reapear
      this.x+=this.relocate;
      this.y+=this.relocate;
    }
    if(this.minTint>=255){
      this.tintRange=-this.tintRange;
    }
    //showing the image
    image(this.image,0,0,this.size,this.size);
    pop();
  }
}
