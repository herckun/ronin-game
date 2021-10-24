function refreshHealth(scene){
  switch(health){
    case 1:
    statusBar.destroy();
    statusBar = scene.add.image(100, 45, '1of3_status');
    break;
    case 2:
    statusBar.destroy();
    statusBar = scene.add.image(100, 45, '2of3_status');
    break;
    case 3:
    statusBar.destroy();
    statusBar = scene.add.image(100, 45, 'status');
    break;
    case 0:
    statusBar = scene.add.image(100, 45, '0of3_status');

  }
}
function refreshPoints(scene){
  score.destroy();
  var style = { font: "15px pixelFont", fill: "#ffffff", align: "center" };
  score = scene.add.text(70, -40, "SCORE : " + points, style);
  score.setText("SCORE:" + points);
}
function playerMovements(cursors,player,thisGame){
  player.body.velocity.x = 0;
  if(player.body.touching.down){
    availJumps = defaultJumps;
  }
  else{
    availJumps = availJumps;
  }
  if(cursors.up.isDown){
    jump(cursors,player);
  }
  else{
    releasedJump = true;
  }
  if (cursors.left.isDown)
  {
      player.setVelocityX(-200);
      player.anims.play('left', true);

  }
  else if (cursors.right.isDown)
  {
      player.setVelocityX(200);
      player.anims.play('right', true);
  }
  else
  {
      player.setVelocityX(0);
      player.anims.play('turn');
  }
}
function jump(cursors,player){
  //jump function
  if(releasedJump == true){
  releasedJump = false;
  if(availJumps != 0){
      availJumps--;
      player.setVelocityY(-330);
      sfx['jump'].play();

    }
    }
  else{
      //
  }
  //end jump
}

function addPoints(scene,howmany){
  points += howmany;
  refreshHealth(scene);
  refreshPoints(scene);
}

function bad(){

    //kill player movement
    cursors.left.isDown = false; 
    cursors.right.isDown = false;  

  if(health > 0){
    player.y = spawnpoint.y;
    player.x = spawnpoint.x;
    health = health - 1;
    sfx['dmg_sfx'].play();
  }
  else{
    if(gameover == false){
    gameover = true;
    player.destroy();
    this.scene.start('GameOver');
    }

  }
  refreshHealth(this);
  refreshPoints(this);
}
function changeDirection(forwho){
  forwho.setVelocityX(0);
  var id = forwho.name;
  switch(directions[id]){
    case 'right':
    directions[id] = 'left';
    forwho.x-=20;

    break;
    case 'left':
    directions[id] = 'right';
    forwho.x+=20;
    break;
    case 'up':
      directions[id] = 'down';
      forwho.y+=60;
    break;
    case 'down':
      directions[id] = 'up';
      forwho.y-=60;
    break;
    default:
    directions[id] = 'right';

  }
}

function animatePlatFormsHorizontal(who,speed){
  speed =  speed ;
  var id = who.name;
  if(typeof directions[id] === 'undefined'){
    directions[id] = 'right';
  }
  if(directions[id] == 'right'){
    who.setVelocityX(speed);
  }
  else{
    who.setVelocityX(-speed);
  }
}
function animateGhostVetical(who){
  var id = who.name;

  if(typeof directions[id] === 'undefined'){
    directions[id] = 'up';
  }
  if(directions[id] == 'down'){
    who.anims.play('fly_to_right', true);
    who.setVelocityY(100);
  }
  else{
    who.anims.play('fly_to_left', true);
    who.setVelocityY(-100);

  }
  if(who.y>=600){
    changeDirection(who);
  }
  if(who.y<=10){
    changeDirection(who);
  }
}


function animateGhostHorizontal(who){
  var id = who.name;
  if(typeof directions[id] === 'undefined'){
    directions[id] = 'left';
  }
  if(directions[id] == 'right'){
    who.anims.play('fly_to_right', true);
    who.setVelocityX(100);
  }
  else{
    who.anims.play('fly_to_left', true);
    who.setVelocityX(-100);

  }
  if(who.x>=800){
    changeDirection(who);
    who.setVelocityX(-100);
  }
  if(who.x<=20){
    changeDirection(who);
    who.setVelocityX(100);
  }
}
function levelUp(){
    //kill player movement
    cursors.left.isDown = false; 
    cursors.right.isDown = false;  
  blossom.destroy();
  sfx['levelup'].play();
  addPoints(this,100);
  if(nextLevel == 'END'){
    this.scene.start("END_SCREEN");
    return;
  }
  this.scene.start("LEVEL_"+nextLevel);
}
function restartGame(){
  health = 3;
  points = 100;
  this.registry.destroy();
  this.events.off();﻿
  this.scene.stop();
  gameover = false;
  this.scene.start('gameloader');
}

function goToMenu(){
  health = 3;
  points = 100;
  this.registry.destroy();
  this.events.off();﻿
  this.scene.stop();
  gameover = false;
  this.scene.start('Main_Menu');
}

function createGroups(thisGame){
    borders = thisGame.physics.add.staticGroup();

    platforms = thisGame.physics.add.staticGroup();
    walls = thisGame.physics.add.staticGroup();
    moving = thisGame.physics.add.group({
        immovable: true,
        allowGravity: false
    });
    coins = thisGame.physics.add.group({gravityY: 600 });
    lava = thisGame.physics.add.staticGroup();
    mobs = thisGame.physics.add.group();
    blossoms = thisGame.physics.add.group({gravityY: 600 });
    newlifes = thisGame.physics.add.group({gravityY: 600 });
    help_sign = thisGame.physics.add.staticGroup();
}
function animateObjects(thisGame){
  coins.children.each(function(coin) {
    coin.play('rotate_coin',true);

  });
  blossoms.children.each(function(bchild) {
    bchild.play('blossom_anim',true);
  });
  newlifes.children.each(function(life) {
    life.play('life_animation',true);
  });
}
function claimCoin(player,coin){
  coin.destroy();
  sfx['collect'].play();
  addPoints(this,10);
}
function bonusLife(player,life){
  life.destroy();
  health++;
  sfx['bonus_life'].play();
}
