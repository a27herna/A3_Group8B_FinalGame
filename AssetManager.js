let platformTileImg;
let grassTileImg;
let dirtTileImg;
let waterTileImg;
let iceyTileImg;
let treeBaseTileImg;
let treeMidTileImg;
let treeFullTileImg;

let titleScreenImg;
let background1Img;
let background2Img;
let backgroundWinterImg;
let postOfficeImg;
let recipient1Img;
let recipient2Img;
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
  iceyTileImg = loadImage("assets/images/icey_ground_tile.png");

  background1Img = loadImage("assets/images/background_main.webp");
  backgroundWinterImg = loadImage("assets/images/background_winter.png");
  background2Img = loadImage("assets/images/background_overlay.webp");

  postOfficeImg = loadImage("assets/images/mail_pickup.webp");

  recipient1Img = loadImage("assets/images/bat_house.webp");
  recipient2Img = loadImage("assets/images/cave_house.png");

  kiwiSpriteSheet = loadImage("assets/images/kiwi_spritesheet.png");

  package1Img = loadImage("assets/images/package1.png");

  instruction1Img = loadImage("assets/images/instructions1.png");
  instruction2Img = loadImage("assets/images/instructions2.png");
  instruction3Img = loadImage("assets/images/instructions3.png");
  instruction4Img = loadImage("assets/images/instructions4.png");

  buttonRect1Img = loadImage("assets/images/button_rect.png");
  buttonRect2Img = loadImage("assets/images/button_rect_pressed.png");
  buttonSquare1Img = loadImage("assets/images/button_square.png");
  buttonSquare2Img = loadImage("assets/images/button_square_pressed.png");
  buttonSquare3Img = loadImage("assets/images/button_square_disabled.png");
  buttonRestart1Img = loadImage("assets/images/restart.png");
  buttonRestart2Img = loadImage("assets/images/restart_pressed.png");

  star1Img = loadImage("assets/images/star.png");
  star2Img = loadImage("assets/images/star_earned.png");

  levelSelectImg = loadImage("assets/images/level_select.png");
  levelCompleteImg = loadImage("assets/images/level_complete.png");
}

let SlackeyFont;
function initFontFiles() {
  SlackeyFont = loadFont("assets/fonts/Slackey-Regular.ttf");
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
  //   amibianceSound1.setVolume(0.85);

  // - Game SFX -
  oopsPackageSound1 = loadSound("assets/sounds/Cardboard_Box_SFX_2.wav");
  oopsPackageSound1.setVolume(0.25, 2);

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
