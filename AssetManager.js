let platformTileImg;
let grassTileImg;
let dirtTileImg;
let waterTileImg;
let treeBaseTileImg;
let treeMidTileImg;
let treeFullTileImg;

let titleScreenImg;
let background1Img;
let background2Img;
let background3Img;
let postOfficeImg;
let recipient1Img;
let playerWalkAni;
let playerIdleAni;
let playerJumpImpulseAni;
let kiwiSpriteSheet;

function initAssetFiles() {
  // let playerImg1 = loadImage("assets/kiwi_frame_1.webp");
  // let playerImg2 = loadImage("assets/kiwi_frame_2.webp");
  // let playerImg3 = loadImage("assets/kiwi_frame_3.webp");
  // let playerImg4 = loadImage("assets/kiwi_frame_4.webp");
  // let playerImg5 = loadImage("assets/kiwi_frame_5.webp");
  // let playerImg6 = loadImage("assets/kiwi_frame_6.webp");

  titleScreenImg = loadImage("assets/images/title_screen.png");

  platformTileImg = loadImage("assets/images/platform_tile.png");
  treeBaseTileImg = loadImage("assets/images/tree_base.png");
  treeMidTileImg = loadImage("assets/images/tree_mid.png");
  treeFullTileImg = loadImage("assets/images/tree_full.png");
  grassTileImg = loadImage("assets/images/grass_tile.png");
  dirtTileImg = loadImage("assets/images/dirt_tile.png");
  waterTileImg = loadImage("assets/images/water_tile.webp");

  background1Img = loadImage("assets/images/background_main.webp");
  background2Img = loadImage("assets/images/background_overlay.webp");
  postOfficeImg = loadImage("assets/images/mail_pickup.webp");
  recipient1Img = loadImage("assets/images/bat_house.webp");
  kiwiSpriteSheet = loadImage("assets/images/kiwi_spritesheet.png");
}
