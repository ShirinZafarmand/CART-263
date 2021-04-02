class Play extends Phaser.Scene{

  constructor(){
    super({
      key: `play`,
    });
  }

  create(){
    this.player=this.physics.add.sprite(400,300, `player`);
    this.player.setCollideWorldBounds(true);

    let x = Math.random() * this.sys.canvas.width;
    let y = Math.random() * this.sys.canvas.height;
    this.goldenPoo = this.physics.add.sprite( x, y, `golden-poo`);
    this.hiddenPositionX=x;
    this.hiddenPositionY=y

    this.poo=this.physics.add.group({
      key: `poo`,
      quantity: 100,
      bounceX: 0.5,
      bounceY: 0.5,
      collideWorldBounds: true,
      dragX: 50,
      dragY: 50
    });
    Phaser.Actions.RandomRectangle(this.poo.getChildren(), this.physics.world.bounds);

    this.physics.add.overlap(this.player, this.goldenPoo, this.reveal, null, this);
    this.physics.add.collider(this.player, this.poo);
    this.physics.add.collider(this.poo, this.poo);

    this.cursors= this.input.keyboard.createCursorKeys();

    this.sound.add('coin');
  }

  reveal(){
    this.goldenPoo.destroy();
    this.funeralUrn=this.physics.add.sprite(this.hiddenPositionX,this.hiddenPositionY, `funeral-urn`);
    this.sound.play('coin');
  }


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
