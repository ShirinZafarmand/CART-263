class Boot extends Phaser.Scene{

  constructor(){
    super({
      key: `boot`,
    });
  }

  preload(){
    //load assets
    //the player
    this.load.image(`player`, `assets/images/bamboo.png`);
    //the golden urn
    this.load.image(`funeral-urn`, `assets/images/funeral-urn.png`);
    //the poo
    this.load.image(`poo`, `assets/images/poo.png`);
    //the special poo
    this.load.image(`golden-poo`, `assets/images/golden-poo.png`);

    //load coin sound effect
    this.load.audio('coin', 'assets/sounds/coin.wav');

    //start the scene when all is loaded
    this.load.on(`complete`, () => {
      this.scene.start(`play`);
    });
  }

  create(){

  }

  update(){

  }
}
