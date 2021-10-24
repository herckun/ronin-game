class LEVEL_SIX extends Phaser.Scene{
    constructor(){
      super("LEVEL_SIX");
    }
  
    create(){
    
        sfx['music'].stop();
        sfx['music2'].play();
        sfx['music2'].setLoop(true);




      this.add.image(800, 300, 'sky2');
      this.cameras.main.setBounds(0, 0, 800, 600);
      this.cameras.main.fadeIn(500);
      createGroups(this);
      //load the void
      lava.create(200, 620, 'void').refreshBody();
      lava.create(600, 620, 'void').refreshBody();
  
      //Spawn wall
  
  
  
  
      //Spawn platforms
  
      walls.create(280,100,"wall2").refreshBody();
      walls.create(280,350,"wall2").refreshBody();
      walls.create(280,400,"wall2").refreshBody();

      walls.create(500,100,"wall2").refreshBody();
      walls.create(500,350,"wall2").refreshBody();
      walls.create(500,400,"wall2").refreshBody();

  
  
  
  
      platforms.create(799,90,"wall_platform2").refreshBody().flipX = true;
      platforms.create(455,100,"wall_platform2").refreshBody().flipX = true; //player spawn
      platforms.create(545,173,"wall_platform2").refreshBody().flipX = false;
      platforms.create(238,473,"wall_platform2").refreshBody().flipX = true;
      platforms.create(238,365,"wall_platform2").refreshBody().flipX = true;

  
      blossom = blossoms.create(785, 10, 'blossom'); //blossom  
  
      //Spawn coins
      coins.create(210, 410, 'coin');
  
      //Spawn extra life
      //newlifes.create(448,30,"life_animation");
  
      //Set level spawnpoint
      spawnpoint.x = 430;
      spawnpoint.y = 50;
  
      //Spawn player
      player = this.physics.add.sprite(0, 0, 'player');


      //Set next level
      nextLevel = "SEVEN";
  
      //Set player spawn point
      player.x = spawnpoint.x;
      player.y = spawnpoint.y;
  
      //spwan Ghosts
      
      ghosts["Ghost1"] = this.physics.add.sprite(500, 220, 'ghost1');
      ghosts["Ghost1"].setName('Ghost1');

      ghosts["Ghost3"] = this.physics.add.sprite(100, 220, 'ghost1');
      ghosts["Ghost3"].setName('Ghost3');


      ghosts["Ghost2"] = this.physics.add.sprite(60, 415, 'ghost1');
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
      refreshHealth(this);
    }
    update(){
      if(gameover == true){
        return;
      }
      animateGhostHorizontal(ghosts["Ghost1"]);
      animateGhostHorizontal(ghosts["Ghost2"]);
      animateGhostHorizontal(ghosts["Ghost3"]);
      refreshPoints(this);
      animateObjects(this);
  
      //
      playerMovements(cursors,player);
  
  
  
    }
  }