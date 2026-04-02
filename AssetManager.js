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
let package1Img;

function initImageAssetFiles() {
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

  package1Img = loadImage("assets/images/package1.png");
}

let musicStarted = false;
let generalMusic;
let amibianceSound1;
let oopsPackageSound1;
let levelCompleteSound;
function initSoundAssetFiles() {
  soundFormats("mp3", "wav");

  // - Ambiance -
  amibianceSound1 = loadSound("assets/sounds/general_ambiance1.wav");

  // - Game SFX -
  oopsPackageSound1 = loadSound("assets/sounds/oops_package_break1.wav");
  oopsPackageSound1.setVolume(0.075, 2);

  levelCompleteSound = loadSound("assets/sounds/level_complete1.wav");
  levelCompleteSound.setVolume(0.5);

  generalMusic = amibianceSound1;
}

function startMusicIfNeeded() {
  if (musicStarted || !generalMusic) return;

  const startLoop = () => {
    if (!generalMusic.isPlaying()) generalMusic.play();
    musicStarted = generalMusic.isPlaying();
  };

  // Some browsers require a user gesture before audio can start.
  const maybePromise = userStartAudio();
  if (maybePromise && typeof maybePromise.then === "function") {
    maybePromise.then(startLoop).catch(() => {});
  } else {
    startLoop();
  }
}
