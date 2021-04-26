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
   let bamboo = this.add.tileSprite(400, 300, 7 * 3, 1000 * 4, 'player');
   let bamboo1 = this.add.tileSprite(500, 300, 7 * 3, 1000 * 4, 'player');
   let bamboo2 = this.add.tileSprite(600, 300, 7 * 3, 1000 * 4, 'player');

   this.physics.add.existing(bamboo, true);
   this.physics.add.existing(bamboo1, true);
   this.physics.add.existing(bamboo2, true);
   this.physics.add.collider(block, bamboo);
   this.physics.add.collider(block, bamboo1);
   this.physics.add.collider(block, bamboo2);

  let rectan = this.add.rectangle(500, 400, 60, 30, 0xff6699);
}




  //moving the player with arrow keys
  update(){

    }
  }
