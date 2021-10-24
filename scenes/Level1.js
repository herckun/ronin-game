class LEVEL_ONE extends Phaser.Scene{
  constructor(){
    super("LEVEL_ONE");
  }

  create(){
    console.log(this.scene);
    this.add.image(800, 300, 'sky');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.fadeIn(500);
    createGroups(this);
    //Set level spawnpoint
    spawnpoint.x = 100;
    spawnpoint.y = 490;

    //Set next level
    nextLevel = "TWO";

    //Spawn player
    player = this.physics.add.sprite(0, 0, 'player');

    //Set player spawn point
    player.x = spawnpoint.x;
    player.y = spawnpoint.y;

    //load the void
    lava.create(200, 600, 'void').refreshBody();
    lava.create(600, 600, 'void').refreshBody();


    platforms.create(100, 550, 'short_platform').refreshBody();
    platforms.create(760, 350, 'short_platform').refreshBody();
    platforms.create(60, 250, 'short_platform').refreshBody();
    platforms.create(760, 500, 'short_platform').refreshBody();
    platforms.create(700,146, 'short_platform').refreshBody();


    //Spawn coins
    coins.create(770, 450, 'coin');
    coins.create(25, 195, 'coin');




    blossom = blossoms.create(770, 80, 'blossom');

    //spwan Ghosts
    ghosts["Ghost1"] = this.physics.add.sprite(500, 450, 'ghost1');
    ghosts["Ghost1"].setName('Ghost1');
    ghosts["Ghost2"] = this.physics.add.sprite(700, 150, 'ghost1');
    ghosts["Ghost2"].setName('Ghost2');
    mobs.add(ghosts["Ghost1"]);
    mobs.add(ghosts["Ghost2"]);

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
    animateGhostHorizontal(ghosts["Ghost1"]);
    animateGhostHorizontal(ghosts["Ghost2"]);
    animateObjects(this);
    refreshPoints(this);
    //
    playerMovements(cursors,player);
  }
}
function goNextLevel(){
  this.scene.stop();
  this.scene.start('LEVEL_TWO');
}
