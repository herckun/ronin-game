class GameOver extends Phaser.Scene{
  constructor(){
    super("GameOver");
  }

  create(){
    var style = { font: "48px pixelFont", fill: "#ffffff", align: "center" };
    this.add.text(250, 220, "GAME OVER", style).setOrigin(0.5);
    this.add.text(335, 285, "SCORE : " + points, { font: "20px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
    this.add.text(250, 345, "PRESS [R] TO TRY AGIAN", { font: "20px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
    this.add.text(200, 370, "PRESS [ESC] TO GO TO MAIN MENU", { font: "20px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
    sfx['music'].stop();
    sfx['music2'].stop();
    sfx['gameover_sfx'].play();
    this.input.keyboard.on('keydown_R',restartGame, this);
    this.input.keyboard.on('keydown_ESC',goToMenu, this);
    //kill player movement
    cursors.left.isDown = false; 
    cursors.right.isDown = false;


  }
  update(){

  }
}
