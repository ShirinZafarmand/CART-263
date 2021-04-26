class Play extends Phaser.Scene{

  constructor(){
    super({
      key: `play`,
    });
  }

  create(){
    //  Our dynamic TileSprite that will bounce around
   var block = this.physics.add.sprite( 450, 100, `golden-poo`);
   this.physics.add.existing(block, false);

   block.body.setVelocity(130, 180);
   block.body.setBounce(1, 1);
   block.body.setCollideWorldBounds(true);


   //  Our static TileSprite that will just receive collide events
   let bamboo = this.add.tileSprite(400, 300, 10 * 3, 1000 * 4, 'player');

   let bamboo1 = this.add.tileSprite(500, 300, 10 * 3, 1000 * 4, 'player');


   this.physics.add.existing(bamboo, true);
   this.physics.add.existing(bamboo1, true);
   this.physics.add.collider(block, bamboo);
   this.physics.add.collider(block, bamboo1);
}




  //moving the player with arrow keys
  update(){

    }
  }
