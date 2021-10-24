class LEVEL_FIVE extends Phaser.Scene{
    constructor(){
      super("LEVEL_FIVE");
    }
  
    create(){
    
        sfx['music'].stop();
        sfx['music2'].play();
        sfx['music2'].setLoop(true);




      this.add.image(800, 300, 'sky2');
      this.cameras.main.setBounds(0, 0, 800, 600);
      this.cameras.main.fadeIn(500);
      createGroups(this);
      //load the void and borders
      lava.create(200, 620, 'void').refreshBody();
      lava.create(600, 620, 'void').refreshBody();
      borders.create(57, 300, 'border').refreshBody();
      borders.create(800, 300, 'border').refreshBody();

      //Spawn wall
    
      walls.create(10,100,"wall2").refreshBody();
      walls.create(10,300,"wall2").refreshBody();
      walls.create(10,500,"wall2").refreshBody();

  
  
  
  
      platforms.create(799,90,"wall_platform2").refreshBody().flipX = true;
      platforms.create(55,570,"wall_platform2").refreshBody().flipX = false;
  
  
  
      blossom = blossoms.create(785, 10, 'blossom'); //blossom
  
  
      //Spawn extra life
      //newlifes.create(448,30,"life_animation");
  
      //Set level spawnpoint
      spawnpoint.x = 80;
      spawnpoint.y = 510;

      //Set next level
      nextLevel = "SIX";
  
      //Spawn player
      player = this.physics.add.sprite(0, 0, 'player');
  
      //Set player spawn point
      player.x = spawnpoint.x;
      player.y = spawnpoint.y;
  

      //Spawn moving platoform

      moving_platforms['plat1']=moving.create(260,200, 'short_platform2');
      moving_platforms['plat1'].setName('plat1');
      moving_platforms['plat2']=moving.create(260,400, 'short_platform2');
      moving_platforms['plat2'].setName('plat2');
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
  
  
      
      this.physics.add.collider(player, moving);
      this.physics.add.collider(coins, moving);
      this.physics.add.collider(blossoms, moving);
      moving.children.each(function(moving_platform) {
        moving_platform.setFrictionX(1);
  
      });
      this.physics.add.collider(player,lava,bad,null,this);
      this.physics.add.overlap(player, mobs, bad, null, this);
      this.physics.add.overlap(player, coins, claimCoin, null, this);
      this.physics.add.overlap(player, newlifes, bonusLife, null, this);
      this.physics.add.collider(player,blossoms,levelUp,null,this);
      this.physics.add.collider(mobs,walls,changeDirection,null,this);
      this.physics.add.collider(moving,walls,changeDirection,null,this);
      this.physics.add.collider(moving,platforms,changeDirection,null,this);
      this.physics.add.collider(moving,borders,changeDirection,null,this);
      refreshHealth(this);
    }
    update(){
      if(gameover == true){
        return;
      }
      animatePlatFormsHorizontal(moving_platforms['plat1'],50);
      animatePlatFormsHorizontal(moving_platforms['plat2'],300);
      refreshPoints(this);
      animateObjects(this);
  
      //
      playerMovements(cursors,player);
  
  
  
    }
  }