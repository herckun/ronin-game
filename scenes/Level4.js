class LEVEL_FOUR extends Phaser.Scene{
  constructor(){
    super("LEVEL_FOUR");
  }

  create(){

    this.add.image(800, 300, 'sky');
    this.cameras.main.setBounds(0, 0, 800, 600);
    this.cameras.main.fadeIn(500);
    createGroups(this);
    //load the void
    lava.create(200, 620, 'void').refreshBody();
    lava.create(600, 620, 'void').refreshBody();

    //Spawn wall




    //Spawn platforms

    walls.create(280,100,"wall").refreshBody();
    walls.create(280,300,"wall").refreshBody();
    walls.create(500,100,"wall").refreshBody();
    walls.create(500,300,"wall").refreshBody();



    platforms.create(1,160,"wall_platform").refreshBody();
    platforms.create(235,373,"wall_platform").refreshBody().flipX = true;

    platforms.create(799,150,"wall_platform").refreshBody().flipX = true;
    platforms.create(545,353,"wall_platform").refreshBody().flipX = false;


    platforms.create(455,100,"wall_platform").refreshBody().flipX = true;
    platforms.create(799,510,"wall_platform").refreshBody().flipX = true;



    blossom = blossoms.create(785, 30, 'blossom'); //blossom


    //Spawn coins
    coins.create(13, 120, 'coin');

    //Spawn extra life
    //newlifes.create(448,30,"life_animation");

    //Set level spawnpoint
    spawnpoint.x = 430;
    spawnpoint.y = 50;

    //Set next level
    nextLevel = "FIVE";  

    //Spawn player
    player = this.physics.add.sprite(0, 0, 'player');

    //Set player spawn point
    player.x = spawnpoint.x;
    player.y = spawnpoint.y;

    //spwan Ghosts
    /*
    ghosts["Ghost1"] = this.physics.add.sprite(500, 150, 'ghost1');
    ghosts["Ghost1"].setName('Ghost1');
    ghosts["Ghost2"] = this.physics.add.sprite(400, 500, 'ghost1');
    ghosts["Ghost2"].setName('Ghost2');
    mobs.add(ghosts["Ghost1"]);
    mobs.add(ghosts["Ghost2"]);
    ghosts["Ghost1"].setGravityY(0);

    */
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
  }
  update(){
    if(gameover == true){
      return;
    }
    refreshHealth(this);
    refreshPoints(this);
    animateObjects(this);

    //
    playerMovements(cursors,player);



  }
}
