class Bacteria{
  constructor(x,y,image,relocate,rotation){
    this.x=x;
    this.y=y;
    this.image=image;
    this.minTint=255;
    this.tintRange=-4;
    this.angle=0;
    this.size=0;
    this.relocate=relocate;
    this.rotation=rotation;
  }

  update(){
    this.display();
  }

  display(){
    push();
    imageMode(CENTER);
    translate(this.x,this.y);
    this.angle=this.rotation;
    rotate(this.angle);
    this.size=random(130,145);
    tint(255, this.minTint);
    this.minTint= this.minTint+this.tintRange;
    if(this.minTint<10){
      this.tintRange=-this.tintRange;
      this.x+=this.relocate;
      this.y+=this.relocate;
    }
    if(this.minTint>=255){
      this.tintRange=-this.tintRange;
    }
    image(this.image,0,0,this.size,this.size);
    pop();
  }
}
