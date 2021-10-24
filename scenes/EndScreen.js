class END_SCREEN extends Phaser.Scene{
    constructor(){
      super("END_SCREEN");
    }
    create(){

      const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

      sfx['music2'].stop();
      sfx['end_song'].play();
      sfx['end_song'].setLoop(true);
      var style = { font: "40px pixelFont", fill: "#f79616", align: "center" };
      texts[0]= this.add.text(screenCenterX, 280, "YOU SAVED THE NIWALLOWEEN!", style).setOrigin(0.5);;
      texts[1]=this.add.text(screenCenterX, 330, "THANK YOU FOR PLAYING!", { font: "32px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
      texts[2]=this.add.text(screenCenterX, 395, "FINAL SCORE : " + points, { font: "20px pixelFont", fill: "#e81e6f", align: "center" }).setOrigin(0.5);
      texts[3]=this.add.text(screenCenterX, 735, "SPECIAL THANKS TO", { font: "28px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
      texts[4]= this.add.text(screenCenterX, 800, "CRAFTPIX.NET FOR SOME GAME ASSETS", { font: "20px pixelFont", fill: "#2e9cf0", align: "center" }).setOrigin(0.5);
      texts[5]= this.add.text(screenCenterX, 825, "FREESOUND.ORG FOR SOUND EFFECTS", { font: "20px pixelFont", fill: "#2e9cf0", align: "center" }).setOrigin(0.5);
      texts[6]= this.add.text(screenCenterX, 845, "PIX CHANNEL ON YOUTUBE FOR BACKGROUND MUSIC", { font: "20px pixelFont", fill: "#dd2121", align: "center" }).setOrigin(0.5);
      texts[7]= this.add.text(screenCenterX, 865, "PHASER.IO FOR THE GAME FRAMEWORK", { font: "20px pixelFont", fill: "#2e9cf0", align: "center" }).setOrigin(0.5);
      texts[8]= this.add.text(screenCenterX, 885, "(even if the documentation is kinda crap)", { font: "20px pixelFont", fill: "#2e9cf0", align: "center" }).setOrigin(0.5);

      texts[9]= this.add.text(screenCenterX, 975, "CRAPPY GAME MADE BY", { font: "20px pixelFont", fill: "#ffffff", align: "center" }).setOrigin(0.5);
      texts[10]= this.add.text(screenCenterX, 1000, "HERC-KUN", { font: "20px pixelFont", fill: "#f02e6b", align: "center" }).setOrigin(0.5);;
      texts[11]= this.add.text(screenCenterX, 1150, "SONG PLAYING NOW : youtu.be/-IQ7qdFxcJc", { font: "20px pixelFont", fill: "#dd2121", align: "center" }).setOrigin(0.5);;

      var textNr = Object.keys(texts).length - 1;
      for(i=4;i<=textNr;i++){
        texts[i].setInteractive();
      }
      texts[4].on('pointerdown', () => { openLink("https://CRAFTPIX.NET") });
      texts[5].on('pointerdown', () => { openLink("https://FREESOUND.ORG") });
      texts[6].on('pointerdown', () => { openLink("https://www.youtube.com/channel/UCr3D54lk90oa-ZN9-a1mv1Q")});
      texts[7].on('pointerdown', () => { openLink("https://PHASER.IO") });
      texts[10].on('pointerdown', () => { openLink("https://twitter.com/herckun") });
      texts[11].on('pointerdown', () => { openLink("https://youtu.be/-IQ7qdFxcJc") });


      
    }
    update(){
      var textNr = Object.keys(texts).length - 1;
      for(i=0;i<=textNr;i++){
        texts[i].y-=1;
      }
      if(texts[textNr].y <= -100){
        for(i=0;i<=textNr;i++){
          texts[i].y+=1700;
        }
      }
    }

}

function openLink(url){
  var s = window.open(url, '_blank');
  if (s && s.focus){s.focus();}
  else if (!s){window.location.href = url;}
}