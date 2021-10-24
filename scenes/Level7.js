class LEVEL_SEVEN extends Phaser.Scene{
    constructor(){
      super("LEVEL_SEVEN");
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
  
      walls.create(180,100,"wall2").refreshBody();
      walls.create(180,250,"wall2").refreshBody();
      walls.create(180,530,"wall2").refreshBody();

      walls.create(380,150,"wall2").refreshBody();
      walls.create(380,100,"wall2").refreshBody();
      walls.create(380,400,"wall2").refreshBody();
      walls.create(380,500,"wall2").refreshBody();
  
      walls.create(580,100,"wall2").refreshBody();
      walls.create(580,200,"wall2").refreshBody();
      walls.create(580,400,"wall2").refreshBody();
      walls.create(580,680,"wall2").refreshBody();
  
  
      platforms.create(0,160,"wall_platform2").refreshBody();
  
      platforms.create(799,150,"wall_platform2").refreshBody().flipX = true;
      platforms.create(840,400,"wall_platform2").refreshBody().flipX = true;
      platforms.create(625,220,"wall_platform2").refreshBody().flipX = false;


      platforms.create(0,550,"wall_platform2").refreshBody().flipX = false;
      platforms.create(0,270,"wall_platform2").refreshBody().flipX = false;

  
  
      blossom = blossoms.create(785, 30, 'blossom'); //blossom
  
  
      //Spawn coins
      coins.create(13, 120, 'coin');
  
      //Spawn extra life
      //newlifes.create(448,30,"life_animation");
  
      //Set level spawnpoint
      spawnpoint.x = 30;
      spawnpoint.y = 450;
  

      nextLevel = "EIGHT";
      //Spawn player
      player = this.physics.add.sprite(0, 0, 'player');
  
      //Set player spawn point
      player.x = spawnpoint.x;
      player.y = spawnpoint.y;
  
      //spwan Ghosts
    
      ghosts["larry"] = this.physics.add.sprite(100, 150, 'ghost1');
      ghosts["larry"].setName('larry');
      ghosts["garry"] = this.physics.add.sprite(280, 400, 'ghost1');
      ghosts["garry"].setName('garry');
      ghosts["jane"] = this.physics.add.sprite(480, 200, 'ghost1');
      ghosts["jane"].setName('jane');
      ghosts["amadeus"] = this.physics.add.sprite(716, 100, 'ghost1');
      ghosts["amadeus"].setName('amadeus');

      ghosts["amadeus"].rotation = 45;
      ghosts["jane"].rotation = 45;
      ghosts["garry"].rotation = 45;
      ghosts["larry"].rotation = 45;
      mobs.add(ghosts["larry"]);
      mobs.add(ghosts["garry"]);
      mobs.add(ghosts["jane"]);
      mobs.add(ghosts["amadeus"]);


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
      animateGhostVetical(ghosts["larry"]);
      animateGhostVetical(ghosts["garry"]);
      animateGhostVetical(ghosts["jane"]);
      animateGhostVetical(ghosts["amadeus"]);

      refreshPoints(this);
      animateObjects(this);
  
      //
      playerMovements(cursors,player);
  
  
  
    }
  }