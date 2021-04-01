class Boot extends Phaser.Scene{

  constructor(){
    super({
      key: `boot`,
    });
  }

  preload(){
    //load assets
    this.load.image(`avatar`, `assets/images/avatar.png`);
    this.load.image(`funeral-urn`, `assets/images/funeral-urn.png`);
    this.load.image(`poo`, `assets/images/poo.png`);

    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create(){

  }

  update(){

  }
}
