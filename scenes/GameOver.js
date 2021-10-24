class GameOver extends Phaser.Scene{
  constructor(){
    super("GameOver");
  }

  create(){
    var style = { font: "48px pixelFont", fill: "#ffffff", align: "center" };
    this.add.text(250, 220, "GAME OVER", style);
    this.add.text(335, 275, "SCORE : " + points, { font: "20px pixelFont", fill: "#ffffff", align: "center" });
    this.add.text(250, 335, "PRESS [R] TO TRY AGIAN", { font: "20px pixelFont", fill: "#ffffff", align: "center" });
    this.add.text(200, 360, "PRESS [ESC] TO GO TO MAIN MENU", { font: "20px pixelFont", fill: "#ffffff", align: "center" });
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
