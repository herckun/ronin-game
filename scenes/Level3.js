class LEVEL_THREE extends Phaser.Scene{
  constructor(){
    super("LEVEL_THREE");
  }

  create(){
    this.add.image(800, 300, 'sky');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.fadeIn(500);
    createGroups(this);
    //load the void
    lava.create(200, 600, 'void').refreshBody();
    lava.create(600, 600, 'void').refreshBody();

    //Spawn wall




    //Spawn platforms
    walls.create(10,100,"wall").refreshBody();
    walls.create(10,300,"wall").refreshBody();
    walls.create(10,500,"wall").refreshBody();
    walls.create(220,100,"wall").refreshBody();
    walls.create(220,300,"wall").refreshBody();

    walls.create(780,100,"wall").refreshBody();
    walls.create(780,300,"wall").refreshBody();
    walls.create(780,500,"wall").refreshBody();
    walls.create(580,100,"wall").refreshBody();
    walls.create(580,300,"wall").refreshBody();



    platforms.create(55,150,"wall_platform").refreshBody();
    platforms.create(55,570,"wall_platform").refreshBody();
    platforms.create(735,80,"wall_platform").refreshBody().flipX = true;
    platforms.create(535,373,"wall_platform").refreshBody().flipX = true;
    platforms.create(265,273,"wall_platform").refreshBody().flipX = false;
    platforms.create(535,80,"wall_platform").refreshBody().flipX = true;
    platforms.create(470,80,"short_platform").refreshBody().setCrop(0,0,150,100).flipX = true;

    platforms.create(735,410,"wall_platform").refreshBody().flipX = true;
    platforms.create(625,200,"wall_platform").refreshBody().flipX = false;

    moving_platforms['plat1']=moving.create(260,570, 'short_platform');
    moving_platforms['plat1'].setName('plat1');

    blossom = blossoms.create(720, 30, 'blossom'); //blossom


    //Spawn coins
    coins.create(70,500,"coin");
    coins.create(370,40,"coin");
    coins.create(410,40,"coin");
    coins.create(515,40,"coin");
    coins.create(480,40,"coin");

    newlifes.create(448,30,"life_animation");

    //Set level spawnpoint
    spawnpoint.x = 80;
    spawnpoint.y = 50;

    //Set next level
    nextLevel = "FOUR";    

    //Spawn player
    player = this.physics.add.sprite(0, 0, 'player');

    //Set player spawn point
    player.x = spawnpoint.x;
    player.y = spawnpoint.y;

    //spwan Ghosts
    ghosts["Ghost1"] = this.physics.add.sprite(500, 150, 'ghost1');
    ghosts["Ghost1"].setName('Ghost1');
    ghosts["Ghost2"] = this.physics.add.sprite(400, 500, 'ghost1');
    ghosts["Ghost2"].setName('Ghost2');

    mobs.add(ghosts["Ghost1"]);
    mobs.add(ghosts["Ghost2"]);

    moving.add(moving_platforms["plat1"]);


    ghosts["Ghost1"].setGravityY(0);
    player.setGravityY(500);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    cursors = this.input.keyboard.createCursorKeys();
    playerMovements(cursors,player);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(blossoms, platforms);
    this.physics.add.collider(newlifes, platforms);
    this.physics.add.collider(player, walls);
    this.physics.add.collider(player, moving);


    /*
    this.physics.add.collider(player, moving);
    this.physics.add.collider(coins, moving);
    this.physics.add.collider(blossoms, moving);
    moving.children.each(function(moving_platform) {
      moving_platform.setFrictionX(1);

    });
    */
    this.physics.add.collider(player,lava,bad,null,this);
    this.physics.add.overlap(player, mobs, bad, null, this);
    this.physics.add.overlap(player, coins, claimCoin, null, this);
    this.physics.add.overlap(player, newlifes, bonusLife, null, this);
    this.physics.add.collider(player,blossoms,levelUp,null,this);
    this.physics.add.collider(mobs,walls,changeDirection,null,this);
    this.physics.add.collider(moving,walls,changeDirection,null,this);
    this.physics.add.collider(moving,platforms,changeDirection,null,this);
    moving.children.each(function(moving_platform) {
      moving_platform.setFrictionX(1);

    });
    refreshHealth(this);
  }
  update(){
    if(gameover == true){
      return;
    }
    animatePlatFormsHorizontal(moving_platforms['plat1'],200);
    animateGhostHorizontal(ghosts["Ghost1"]);
    animateGhostHorizontal(ghosts["Ghost2"]);
    refreshPoints(this);
    animateObjects(this);

    //
    playerMovements(cursors,player);



  }
}