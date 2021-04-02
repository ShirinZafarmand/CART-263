class Play extends Phaser.Scene{

  constructor(){
    super({
      key: `play`,
    });
  }

  create(){
    //displaying the player image
    this.player=this.physics.add.sprite(400,300, `player`);
    //constraining the player's position within the screen
    this.player.setCollideWorldBounds(true);

    //setting random position for golden poo
    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    //displaying the golden poo
    this.goldenPoo = this.physics.add.sprite( x, y, `golden-poo`);
    this.goldenPoo.setBounce(1);
    this.goldenPoo.setVelocity(150);
    //saving the random position of the golden poo
    this.hiddenPositionX=x;
    this.hiddenPositionY=y

    //array of pile of poos
    this.poo=this.physics.add.group({
      key: `poo`,
      quantity: 100,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });
    //constraining the pile of poos' position within the screen
    Phaser.Actions.RandomRectangle(this.poo.getChildren(), this.physics.world.bounds);
    // when the player overlaps the golden poo the revealing starts
    this.physics.add.overlap(this.player, this.goldenPoo, this.reveal, null, this);
    this.goldenPoo.setCollideWorldBounds(true);
    
    //colliding between the pile of poos and the player
    this.physics.add.collider(this.player, this.poo);
    //colliding between the pile of poos
    this.physics.add.collider(this.poo, this.poo);

    this.cursors= this.input.keyboard.createCursorKeys();

    //adding the coin sound effect to the scene
    this.sound.add('coin');
  }

  reveal(){
    //when the player overlays the golden poo, the image o golden poo disapears
    this.goldenPoo.destroy();
    //the funeral urn apears in the position of the golden poo
    this.funeralUrn=this.physics.add.sprite(this.hiddenPositionX,this.hiddenPositionY, `funeral-urn`);
    //playin the coin sound effect
    this.sound.play('coin');
  }


  //moving the player with arrow keys
  update(){
    if(this.cursors.left.isDown){
      this.player.setAngularVelocity(-150);
    }
    else if(this.cursors.right.isDown){
      this.player.setAngularVelocity(150);
    }
    else{
      this.player.setAngularVelocity(0);
    }

    if(this.cursors.up.isDown){
      this.physics.velocityFromRotation(this.player.rotation,200, this.player.body.acceleration);
    }
    else{
      this.player.setAcceleration(0);
    }
  }
}
