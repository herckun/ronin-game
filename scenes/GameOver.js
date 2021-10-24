class GameOver extends Phaser.Scene{
  constructor(){
    super("GameOver");
  }

  create(){
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

    var style = { font: "48px pixelFont", fill: "#ffffff", align: "center" };
    this.add.text(screenCenterX, 200, "GAME OVER", style).setOrigin(0.5);
    this.add.text(screenCenterX, 295, "SCORE : " + points, { font: "20px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
    this.add.text(screenCenterX, 345, "PRESS [R] TO TRY AGIAN", { font: "20px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
    this.add.text(screenCenterX, 370, "PRESS [ESC] TO GO TO MAIN MENU", { font: "20px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
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
