class LEVEL_TWO extends Phaser.Scene{
  constructor(){
    super("LEVEL_TWO");
  }

  create(){
    this.add.image(800, 300, 'sky');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.fadeIn(500);
    createGroups(this);
    //load the void
    lava.create(200, 600, 'void').refreshBody();
    lava.create(600, 600, 'void').refreshBody();

    borders.create(0, 300, 'border').refreshBody();
    borders.create(800, 300, 'border').refreshBody();


    //Spawn platforms
    moving_platforms['plat1']=moving.create(250,550, 'short_platform');
    moving_platforms['plat1'].setName('plat1');
    moving_platforms['plat2']=moving.create(300, 400, 'short_platform');
    moving_platforms['plat2'].setName('plat2');
    moving_platforms['plat3']=moving.create(200, 250, 'short_platform');
    moving_platforms['plat3'].setName('plat3');
    moving_platforms['plat4']=moving.create(400, 100, 'short_platform');
    moving_platforms['plat4'].setName('plat4');

    blossom = blossoms.create(400, 50, 'blossom'); //blossom


    //Spawn coins
    coins.create(250,200,"coin");
    //Set level spawnpoint
    spawnpoint.x = moving_platforms['plat1'].x;
    spawnpoint.y = 500;

    //Set next level
    nextLevel = "THREE";


    //Spawn player
    player = this.physics.add.sprite(0, 0, 'player');


    //Set player spawn point
    player.x = spawnpoint.x;
    player.y = spawnpoint.y;

    //spwan Ghosts
    ghosts["Ghost1"] = this.physics.add.sprite(500, 150, 'ghost1');
    ghosts["Ghost1"].setName('Ghost1');
    ghosts["Ghost2"] = this.physics.add.sprite(780, 400, 'ghost1');
    ghosts["Ghost2"].setName('Ghost2');

    mobs.add(ghosts["Ghost1"]);
    mobs.add(ghosts["Ghost2"]);

    ghosts["Ghost1"].setGravityY(0);
    player.setGravityY(500);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    playerMovements(cursors,player);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, moving);
    this.physics.add.collider(coins, moving);
    this.physics.add.collider(blossoms, moving);
    moving.children.each(function(moving_platform) {
      moving_platform.setFrictionX(1);
    });
    this.physics.add.collider(player,lava,bad,null,this);
    this.physics.add.overlap(player, mobs, bad, null, this);
    this.physics.add.overlap(player, coins, claimCoin, null, this);
    this.physics.add.collider(player,blossoms,levelUp,null,this);
    this.physics.add.collider(moving,borders,changeDirection,null,this);
    refreshHealth(this);

  }
  update(){
    if(gameover == true){
      return;
    }
    spawnpoint.x = moving_platforms['plat1'].x;
    animateGhostHorizontal(ghosts["Ghost1"]);
    animateGhostHorizontal(ghosts["Ghost2"]);
    animatePlatFormsHorizontal(moving_platforms['plat1'],100);
    animatePlatFormsHorizontal(moving_platforms['plat2'],200);
    animatePlatFormsHorizontal(moving_platforms['plat3'],400);
    animatePlatFormsHorizontal(moving_platforms['plat4'],400);
    thisgame = this;

    animateObjects(this);
    refreshPoints(this);

    //
    playerMovements(cursors,player);



  }
}
