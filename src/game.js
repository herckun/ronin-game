var config = {
width:800,
type: Phaser.AUTO,
height:600,
parent: 'game',
backgroundColor :0x141414,
scene: [Main_Menu,GameLoader,LEVEL_ZERO,LEVEL_ONE,LEVEL_TWO,LEVEL_THREE,LEVEL_FOUR,LEVEL_FIVE,LEVEL_SIX,LEVEL_SEVEN,LEVEL_EIGHT,LEVEL_NINE,END_SCREEN,GameOver],
physics: {
    default: 'arcade',
    arcade: {
        debug: false
    }
},

};
var platforms;
var walls;
var lava;
var texts = {};
var blossoms;
var thisgame;
var newlifes;
var borders;
var player;
var sfx = {};
var ghosts = {};
var numberOfGhosts= 0;
var help_sign;
var cursors;
var mobs;
var gameover = false;
var health = 3;
var statusBar;
var defaultJumps = 2;
var availJumps = 0;
var blossom;
var score;
var coins;
var i;
var points = 100;
var directions = {};
var spawnpoint = {
  "y":0,
  "x":0
};
var moving;
var moving_platforms = {};
var moving_coord = {};
var delta_coord = {};
var releasedJump = true;
var nextLevel = "ZERO";
var game = new Phaser.Game(config);
