class Play extends Phaser.Scene{

  constructor(){
    super({
      key: `play`,
    });
  }

  create(){
   this.cameras.main.backgroundColor.setTo(255,255,255);
    //  Our dynamic TileSprite that will bounce around
   this.block = this.physics.add.sprite( 450, 100, `golden-poo`);
   this.physics.add.existing(this.block, false);

   this.block.setVelocity(130, 180);
   this.block.setBounce(1, 1);
   this.block.setCollideWorldBounds(true);


   //  Our static TileSprite that will just receive collide events
   this.bamboo = this.add.tileSprite(400, 300, 7 * 3, 1000 * 4, 'player');
   this.bamboo1 = this.add.tileSprite(500, 300, 7 * 3, 1000 * 4, 'player');
   this.bamboo2 = this.add.tileSprite(600, 300, 7 * 3, 1000 * 4, 'player');

   this.physics.add.existing(this.bamboo, true);
   this.physics.add.existing(this.bamboo1, true);
   this.physics.add.existing(this.bamboo2, true);
   this.physics.add.collider(this.block, this.bamboo);
   this.physics.add.collider(this.block, this.bamboo1);
   this.physics.add.collider(this.block, this.bamboo2);
  this.color = 0xff5878
  this.rectan = this.physics.add.sprite( 400, 300, `rectan`);
  
  this.physics.add.overlap( this.block, this.rectan, this.exit, null, this);

}

exit(){
  //when the player overlays the golden poo, the image o golden poo disapears
   this.cameras.main.backgroundColor.setTo(100,100,100);
}

  //moving the player with arrow keys
  update(){

    }
  }
