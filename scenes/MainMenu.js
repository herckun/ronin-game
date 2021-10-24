class Main_Menu extends Phaser.Scene{
  constructor(){
    super("Main_Menu");
  }
  preload(){
    this.load.image('bg', 'assets/menu screen.png');
    this.load.image('play_btn', 'assets/play_btn.png');
    this.load.audio('menu_song', 'assets/audio/main_menu.mp3');


  }
  create(){
    if(sfx['gameover_sfx'] != null){
    sfx['gameover_sfx'].stop();
    }
    this.add.image(400, 300, 'bg');
    var playbtn = this.add.image(400, 400, 'play_btn').setInteractive();
    playbtn.on('pointerdown', () => { startGame(this) });
    sfx['menu_song'] = this.sound.add('menu_song',{volume: 0.4});
    sfx['menu_song'].play();
    sfx['menu_song'].setLoop(true);



  }
  update(){

  }
}
function startGame(thisgame){
  thisgame.scene.start('gameloader');

}
