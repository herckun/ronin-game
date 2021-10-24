class LEVEL_EIGHT extends Phaser.Scene{
    constructor(){
      super("LEVEL_EIGHT");
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
      walls.create(767,100,"wall2").refreshBody();
      walls.create(767,300,"wall2").refreshBody();

  
      //Spawn platforms
  

      platforms.create(0,160,"wall_platform2").refreshBody();
      platforms.create(135,433,"wall_platform2").refreshBody().flipX = false;
      platforms.create(-56,333,"wall_platform2").refreshBody().flipX = false;


      platforms.create(135,433,"wall_platform2").refreshBody().setCrop(0,0,58,100).flipX = true;

      platforms.create(617,280,"wall_platform2").refreshBody().flipX = false;
      platforms.create(617,280,"wall_platform2").refreshBody().setCrop(0,0,58,100).flipX = true;


      platforms.create(799,510,"wall_platform2").refreshBody().flipX = true;
  
  
  
      blossom = blossoms.create(24, 30, 'blossom'); //blossom
  
  
      //Spawn coins
      coins.create(765, 410, 'coin');
  
      //Spawn extra life
      //newlifes.create(448,30,"life_animation");
      nextLevel = "NINE";

      //Set level spawnpoint
      spawnpoint.x = 100;
      spawnpoint.y = 360;
  
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
      refreshHealth(this);
    }
    update(){
      if(gameover == true){
        return;
      }
      refreshPoints(this);
      animateObjects(this);
  
      //
      playerMovements(cursors,player);
  
  
  
    }
  }