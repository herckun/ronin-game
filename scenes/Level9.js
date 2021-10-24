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
      ghosts["11"] = this.physics.add.sprite(300, 150, 'ghost1');
      ghosts["11"].setName('11');
      ghosts["22"] = this.physics.add.sprite(580, 400, 'ghost1');
      ghosts["22"].setName('22');
      ghosts["33"] = this.physics.add.sprite(580, 80, 'ghost1');
      ghosts["33"].setName('33');
      ghosts["44"] = this.physics.add.sprite(716, 400, 'ghost1');
      ghosts["44"].setName('44');
      ghosts["55"] = this.physics.add.sprite(256, 550, 'ghost1');
      ghosts["55"].setName('55');
      ghosts["66"] = this.physics.add.sprite(516, 600, 'ghost1');
      ghosts["66"].setName('66');      
      ghosts["22"].rotation = 45;
      ghosts["11"].rotation = 45;
      ghosts["55"].rotation = 45;
      ghosts["66"].rotation = 45;

      mobs.add(ghosts["11"]);
      mobs.add(ghosts["22"]);
      mobs.add(ghosts["33"]);
      mobs.add(ghosts["44"]);
      mobs.add(ghosts["55"]);
      mobs.add(ghosts["66"]);

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
      animateGhostVetical(ghosts["11"]);
      animateGhostVetical(ghosts["22"]);
      animateGhostHorizontal(ghosts["33"]);
      animateGhostHorizontal(ghosts["44"]);
      animateGhostVetical(ghosts["55"]);
      animateGhostVetical(ghosts["66"]);
      refreshPoints(this);
      animateObjects(this);
  
      //
      playerMovements(cursors,player);
  
  
  
    }
  }