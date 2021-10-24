class GameLoader extends Phaser.Scene
{
  constructor(){
    super("gameloader");
  }
  preload(){
    //load level 1-5 background, platforms and walls
    this.load.image('sky', 'assets/bg1.png');
    this.load.image('platform', 'assets/normal_platform.png');
    this.load.image('wall', 'assets/wall.png');
    this.load.image('wall_platform', 'assets/onthewallshortplatform.png');
    this.load.image('short_platform', 'assets/short_platform.png');

    //load level 6-10 background, platforms and walls
    this.load.image('sky2', 'assets/bg2.png');
    this.load.image('wall2', 'assets/wall2.png');
    this.load.image('wall_platform2', 'assets/onthewallshortplatform2.png');
    this.load.image('short_platform2', 'assets/short_platform2.png');    


    //load gameover screen, the void and borders
    this.load.image('void', 'assets/invisible_lava.png');
    this.load.image('border', 'assets/border.png');

    //load status bar
    this.load.image('2of3_status', 'assets/2of3_status.png');
    this.load.image('1of3_status', 'assets/1of3_status.png');
    this.load.image('0of3_status', 'assets/0of3_status.png');
    this.load.image('status', 'assets/full_status.png');

    //load animated sprites
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 39.5, frameHeight: 37 });
    this.load.spritesheet('ghost1_right', 'assets/ghost1_right.png', { frameWidth:50, frameHeight: 42 });
    this.load.spritesheet('ghost1_left', 'assets/ghost1_left.png', { frameWidth:50, frameHeight: 42 });
    this.load.spritesheet('coin', 'assets/coin.png', { frameWidth:42, frameHeight: 32 });
    this.load.spritesheet('blossom', 'assets/blossom.png', { frameWidth: 47, frameHeight: 48 });
    this.load.spritesheet('life_animation', 'assets/life_animation.png', { frameWidth: 47, frameHeight: 45 });


    //load sfx and music
    this.load.audio('background', 'assets/audio/background_music1.mp3');
    this.load.audio('background2', 'assets/audio/background_music2.mp3');
    this.load.audio('end_song', 'assets/audio/end_song.mp3');
    this.load.audio('jump_sfx', 'assets/audio/jump_sfx.wav');
    this.load.audio('dmg_sfx', 'assets/audio/damage_sfx.wav');
    this.load.audio('gameover_sfx', 'assets/audio/gameover_sfx.wav');
    this.load.audio('levelup_sfx', 'assets/audio/levelup_sfx.mp3');
    this.load.audio('collect_sfx', 'assets/audio/collect_sfx.wav');
    this.load.audio('bonus_life_sfx', 'assets/audio/bonus_life_sfx.wav');
  }
  create(){
    //animations
    this.anims.create({
      key: 'blossom_anim',
      frames: this.anims.generateFrameNumbers('blossom', { start: 0, end: 6 }),
      frameRate: 4,
      repeat: -1
    });
    this.anims.create({
      key: 'life_animation',
      frames: this.anims.generateFrameNumbers('life_animation', { start: 0, end: 6 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player', frame: 4 } ],
        frameRate: 20
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
      key: 'fly_to_right',
      frames: this.anims.generateFrameNumbers('ghost1_right', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'fly_to_left',
      frames: this.anims.generateFrameNumbers('ghost1_left', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'rotate_coin',
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 4 }),
      frameRate: 8,
      repeat: -1
    });
    //Sound effects
    sfx['music'] = this.sound.add('background',{volume: 0.5});
    sfx['music2'] = this.sound.add('background2',{volume: 0.4});
    sfx['jump'] = this.sound.add('jump_sfx',{volume: 0.4});
    sfx['dmg_sfx'] = this.sound.add('dmg_sfx',{volume: 0.4});
    sfx['gameover_sfx'] = this.sound.add('gameover_sfx',{volume: 0.4});
    sfx['levelup'] = this.sound.add('levelup_sfx',{volume: 0.4});
    sfx['collect'] = this.sound.add('collect_sfx',{volume: 0.4});
    sfx['bonus_life'] = this.sound.add('bonus_life_sfx',{volume: 0.4});
    sfx['end_song'] = this.sound.add('end_song',{volume: 1});

    //load StatusBar
    statusBar = this.add.image(100, 45, 'status');
    var style = { font: "13px Arial", fill: "#a33361", align: "center" };
    score = this.add.text(80, 10.45, "Points: " + points, style);







    sfx['menu_song'].stop();
    sfx['music'].play();
    sfx['music'].setLoop(true);
    this.scene.start('LEVEL_ZERO');
  }
}
