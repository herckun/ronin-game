class LEVEL_NINE extends Phaser.Scene{
    constructor(){
      super("LEVEL_NINE");
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
  
      platforms.create(770, 500, 'short_platform2').refreshBody(); //bottom coin platform
      platforms.create(100, 268, 'short_platform2').refreshBody(); //spawn platform
      platforms.create(770, 148, 'short_platform2').refreshBody(); //top coin platform
      platforms.create(20, 450, 'short_platform2').refreshBody(); // the blossom platform
  
  
  
      blossom = blossoms.create(770, 90, 'blossom'); //blossom
  
  
      //Spawn coins
      coins.create(22, 400, 'coin'); //top coin
      coins.create(770, 450, 'coin'); //bottom coin  
  
      //Set level spawnpoint
      spawnpoint.x = 100;
      spawnpoint.y = 200;
  
      //Spawn player
      player = this.physics.add.sprite(0, 0, 'player');

      nextLevel = 'END';
  
      //Set player spawn point
      player.x = spawnpoint.x;
      player.y = spawnpoint.y;
  
      //spwan Ghosts
      ghosts["Ghost1"] = this.physics.add.sprite(300, 150, 'ghost1');
      ghosts["Ghost1"].setName('Ghost1');
      ghosts["Ghost2"] = this.physics.add.sprite(580, 400, 'ghost1');
      ghosts["Ghost2"].setName('Ghost2');
      ghosts["Ghost3"] = this.physics.add.sprite(580, 80, 'ghost1');
      ghosts["Ghost3"].setName('Ghost3');
      ghosts["Ghost4"] = this.physics.add.sprite(716, 400, 'ghost1');
      ghosts["Ghost4"].setName('Ghost4');
      ghosts["Ghost5"] = this.physics.add.sprite(256, 550, 'ghost1');
      ghosts["Ghost5"].setName('Ghost5');
      ghosts["Ghost6"] = this.physics.add.sprite(516, 600, 'ghost1');
      ghosts["Ghost6"].setName('Ghost6');      
      ghosts["Ghost2"].rotation = 45;
      ghosts["Ghost1"].rotation = 45;
      ghosts["Ghost5"].rotation = 45;
      ghosts["Ghost6"].rotation = 45;
      mobs.add(ghosts["Ghost1"]);
      mobs.add(ghosts["Ghost2"]);
      mobs.add(ghosts["Ghost3"]);
      mobs.add(ghosts["Ghost4"]);
      mobs.add(ghosts["Ghost5"]);
      mobs.add(ghosts["Ghost6"]);

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
      animateGhostVetical(ghosts["Ghost1"]);
      animateGhostVetical(ghosts["Ghost2"]);
      animateGhostHorizontal(ghosts["Ghost3"]);
      animateGhostHorizontal(ghosts["Ghost4"]);
      animateGhostVetical(ghosts["Ghost5"]);
      animateGhostVetical(ghosts["Ghost6"]);
      refreshPoints(this);
      animateObjects(this);
  
      //
      playerMovements(cursors,player);
  
  
  
    }
  }