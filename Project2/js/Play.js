class Play extends Phaser.Scene{

  constructor(){
    super({
      key: `play`,
    });
  }

  create(){
    //  Our dynamic TileSprite that will bounce around
   var block = this.physics.add.sprite( 100, 100, `golden-poo`);
   this.physics.add.existing(block, false);

   block.body.setVelocity(130, 180);
   block.body.setBounce(1, 1);
   block.body.setCollideWorldBounds(true);

   //  Our static TileSprite that will just receive collide events
   var staticBlock = this.add.tileSprite(400, 300, 10 * 3, 1000 * 4, 'player');

   this.physics.add.existing(staticBlock, true);

   this.physics.add.collider(block, staticBlock);
}




  //moving the player with arrow keys
  update(){

    }
  }
