class LEVEL_ZERO extends Phaser.Scene{
  constructor(){
    super("LEVEL_ZERO");
  }
  create(){
    //load bg, bg music and sound effects
    this.add.image(800, 300, 'sky');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.fadeIn(500);
    createGroups(this);
    //Set level spawnpoint
    spawnpoint.x = 100;
    spawnpoint.y = 200;

    //Set next level
    nextLevel = "ONE";

    //Spawn player
    player = this.physics.add.sprite(0, 0, 'player');

    //Set player spawn point
    player.x = spawnpoint.x;
    player.y = spawnpoint.y;

    //load the void
    lava.create(200, 600, 'void').refreshBody();
    lava.create(600, 600, 'void').refreshBody();




    lava.create(200, 610, 'void').refreshBody();
    lava.create(600, 610, 'void').refreshBody();
    //create platforms
    platforms.create(770, 500, 'short_platform').refreshBody(); //bottom coin platform
    platforms.create(100, 268, 'short_platform').refreshBody(); //spawn platform
    platforms.create(770, 148, 'short_platform').refreshBody(); //top coin platform
    platforms.create(20, 450, 'short_platform').refreshBody(); // the blossom platform

    //create coins
    coins.create(770, 90, 'coin'); //top coin
    coins.create(770, 450, 'coin'); //bottom coin

    //create blossom
    blossom = blossoms.create(22, 400, 'blossom'); //blossom

    player.setGravityY(500);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    playerMovements(cursors,player);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(blossoms, platforms);

    this.physics.add.collider(player,lava,bad,null,this);
    this.physics.add.overlap(player, mobs, bad, null, this);
    this.physics.add.collider(player,blossoms,levelUp,null,this);
    this.physics.add.overlap(player, coins, claimCoin, null, this);
    refreshHealth(this);
  }
  update(){
    if(gameover == true){
      return;
    }
    refreshPoints(this);
    animateObjects(this);
    playerMovements(cursors,player);
  }
}
function goNext(){
  this.scene.stop();
  this.scene.start('LEVEL_ONE');
}
