function displayLevelSelect() {
  let gridLength = 5;
  let gridHeight = 3;
  let gridXOffset = 150;
  let gridYOffset = 125;

  let boxSize = 100;

  push();
  imageMode(CENTER);
  titleScreenImg.resize(width, 0);
  image(titleScreenImg, width / 2, height * 0.62);

  for (let r = 0; r < gridHeight; r++) {
    for (let c = 0; c < gridLength; c++) {
      let loopLevelIndex = c + r * gridLength;

      if (loopLevelIndex < levelData["levels"].length) {
        fill("white");
      } else {
        fill("darkgrey");
      }
      if (
        mouseX >=
          width / 2 + (c - floor(gridLength / 2)) * gridXOffset - boxSize / 2 &&
        mouseX <=
          width / 2 + (c - floor(gridLength / 2)) * gridXOffset + boxSize / 2 &&
        mouseY >=
          height * 0.6 +
            (r - floor(gridHeight / 2)) * gridYOffset -
            boxSize / 2 &&
        mouseY <=
          height * 0.6 + (r - floor(gridHeight / 2)) * gridYOffset + boxSize / 2
      ) {
        fill("grey");

        if (mouseIsPressed) {
          if (loopLevelIndex < levelData.levels.length) {
            currentLevelIndex = loopLevelIndex;
            initLevel(currentLevelIndex);
            // console.log(loopLevelIndex);
            sceneManager = "game";
          } else if (loopLevelIndex == 14) {
            initLevel();
            sceneManager = "game";
          }
        }
      }

      rectMode(CENTER);
      rect(
        width / 2 + (c - floor(gridLength / 2)) * gridXOffset,
        height * 0.6 + (r - floor(gridHeight / 2)) * gridYOffset,
        boxSize,
        boxSize,
        boxSize / 20,
      );

      fill("black");
      textAlign(CENTER);
      textSize(24);
      text(
        1 + loopLevelIndex,
        width / 2 + (c - floor(gridLength / 2)) * gridXOffset,
        height * 0.6 +
          (r - floor(gridHeight / 2)) * gridYOffset +
          textSize() / 4,
      );

      let starSize = 7;
      let starSpacing = 25;

      for (
        let i = 0;
        i < levelData.levels[loopLevelIndex]?.targetScores.length;
        i++
      ) {
        let placementX =
          width / 2 +
          (c - floor(gridLength / 2)) * gridXOffset +
          starSpacing * (i - 1);
        let placementY =
          height * 0.6 +
          (r - floor(gridHeight / 2)) * gridYOffset +
          boxSize / 4;
        stroke("black");
        strokeWeight(1);

        if (
          playerSaveDataTemp["BestTimes"][loopLevelIndex] <
          levelData.levels[loopLevelIndex]?.targetScores[i]
        ) {
          fill("gold");
        } else {
          fill("white");
        }
        // drawStar(placementX, placementY, starSize, starSize * 1.75);

        //   if (playerSaveDataTemp["BestTimes"][loopLevelIndex] < levelData[loopLevelIndex]?.targetScores[i]) {

        //   }
        drawStar(placementX, placementY, starSize, starSize * 1.75);
      }
    }
  }
  pop();
}

function mainDisplay() {
  camera.off();
  push();
  imageMode(CENTER);
  if (currentLevel.background == "default") {
    background1Img.resize(0, height);
    image(background1Img, width / 2, height / 2);
  } else if (currentLevel.background == "winter") {
    backgroundWinterImg.resize(width, height);
    image(backgroundWinterImg, width / 2, height / 2);
  }

  background2Img.resize(0, height);
  image(background2Img, width / 2, height / 2);
  pop();

  camera.on();

  allSprites.draw();
  camera.off();

  if (checkLevelComplete()) {
    levelComplete();
    mainPlayer.mainBody.changeAni("idle");
    mainPlayer.mainBody.friction = 1;
  } else {
    displayHUD();
  }
}

function displayHUD() {
  if (currPackage != null) {
    timeWithPackage = round(world.realTime - packageBornTime, 2);
  }

  push();
  textSize(24);
  fill("white");
  const packageBrokenSeverityLimitSmall = 2;
  const packageBrokenSeverityLimit = 6;

  fill("white");
  text("Time: " + timeWithPackage, 20, 10 + textSize());

  if (packageBrokenCount > 0) {
    fill(
      255,
      lerp(
        255,
        0,
        min(packageBrokenCount, packageBrokenSeverityLimit) /
          packageBrokenSeverityLimit,
      ),
      lerp(
        255,
        0,
        min(packageBrokenCount, packageBrokenSeverityLimitSmall) /
          packageBrokenSeverityLimitSmall,
      ),
    );
  }

  text('Packages "lost": ' + packageBrokenCount, 20, 10 + textSize() * 2);

  // let restartButtonMargin = 60;
  displayRestartButton(width - 60, height - 60);
  pop();
}

function displayRestartButton(x, y) {
  push();
  stroke("Black");
  strokeWeight(5);
  fill("Sienna");
  let restartButtonSize = 80;
  circle(x, y, restartButtonSize);

  angleMode(RADIANS);

  strokeWeight(5);
  strokeCap(SQUARE);
  arc(x, y, restartButtonSize * 0.5, restartButtonSize * 0.5, HALF_PI, TWO_PI);

  strokeCap(ROUND);
  fill("black");
  triangle(
    x,
    y + restartButtonSize / 2 / 2 - 10,
    x,
    y + restartButtonSize / 2 / 2 + 10,
    x + 15,
    y + restartButtonSize / 2 / 2,
  );

  // noStroke();
  strokeWeight(5);
  fill("white");
  textAlign(CENTER, CENTER);
  textSize(36);
  text("R", x, y + 2);
  pop();
}

function levelComplete() {
  // noLoop();
  if (!levelCompletedBool) {
    levelCompleteSound.play();
    levelCompletedBool = true;
  }
  allowPlayerInput = false;

  allSprites.draw();
  push();
  fill(0, 0, 0, 255 * (3 / 4));
  rect(0, 0, width, height);

  textSize(50);
  textAlign(CENTER);

  fill("white");
  noStroke();
  text("Delivery Complete!", width / 2, height / 3);
  drawLevelScore();

  displayRestartButton(width / 2, height - 60);

  textAlign(CENTER, CENTER);
  strokeJoin(ROUND);
  textSize(24);

  stroke("Black");
  strokeWeight(5);
  fill("Sienna");
  displaySimpleButton(width / 3, height - 60, 200, 80, () => {
    sceneManager = "levelSelect";
  });
  stroke("Black");
  strokeWeight(8);
  fill("white");
  text("Return to Menu", width / 3, height - 60);

  if (currentLevelIndex + 1 < levelData.levels.length) {
    stroke("Black");
    strokeWeight(5);
    fill("Sienna");
    displaySimpleButton((width / 3) * 2, height - 60, 200, 80, () => {
      currentLevelIndex++;
      initLevel(currentLevelIndex);
    });
    stroke("Black");
    strokeWeight(8);
    fill("white");
    text("Next Level", (width / 3) * 2, height - 60);
  }
  pop();
}

function displaySimpleButton(x, y, w, h, callback) {
  push();
  rectMode(CENTER);
  rect(x, y, w, h, 10);

  if (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  ) {
    fill(170, 170, 170, 170);
    rect(x, y, w, h, 10);
    if (mouseIsPressed) {
      callback();
    }
  }

  rect;
  pop();
}

function drawLevelScore() {
  let packagePentalty = 15;

  let currentTime = timeWithPackage + packagePentalty * packageBrokenCount;
  let targetScores = levelData.levels[currentLevelIndex]?.targetScores ?? [
    75, 60, 45,
  ];
  let currentScore = 0;

  let starSpacing = 120;
  let starSize = 30;

  for (let i = 0; i < targetScores.length; i++) {
    let placementX = width / 2 + starSpacing * (i - 1);
    let placementY = height * 0.45;

    stroke("black");
    strokeWeight(2);
    if (currentTime < targetScores[i]) {
      currentScore++;
      fill("gold");
    } else {
      fill("white");
    }
    drawStar(placementX, height * 0.45, starSize, starSize * 1.75);

    textSize(24);
    noStroke();
    fill("black");
    text(targetScores[i] + "s", placementX, placementY + textSize() / 4);
  }

  let completionTimeMin = int(currentTime / 60);

  let completionTimeSec = int(currentTime % 60);
  if (completionTimeSec < 10) {
    completionTimeSec = "0" + completionTimeSec;
  } else if (completionTimeSec < 1) {
    completionTimeSec = "00";
  }

  let completionTimeMil = int((-int(currentTime) + currentTime) * 100);
  if (completionTimeMil < 10) {
    completionTimeMil = "0" + completionTimeMil;
  } else if (completionTimeMil < 1) {
    completionTimeMil = "00";
  }

  let bestScore =
    playerSaveDataTemp["BestTimes"][currentLevelIndex] ?? 999999999;

  if (currentTime < bestScore) {
    playerSaveDataTemp["BestTimes"][currentLevelIndex] = currentTime;
    saveToPlayerSaveData();
    bestScore = currentTime;
  }

  let bestTimeMin = int(bestScore / 60);

  let bestTimeSec = int(bestScore);
  if (bestTimeSec < 10) {
    bestTimeSec = "0" + bestTimeSec;
  } else if (bestTimeSec < 1) {
    bestTimeSec = "00";
  }

  let bestTimeMil = int((-int(bestScore) + bestScore) * 100);
  if (bestTimeMil < 10) {
    bestTimeMil = "0" + bestTimeMil;
  } else if (bestTimeMil < 1) {
    bestTimeMil = "00";
  }

  fill("white");
  noStroke();
  textSize(36);

  text(
    " - Completion Time - \n" +
      completionTimeMin +
      ":" +
      completionTimeSec +
      ":" +
      completionTimeMil,
    width / 2,
    height * 0.6,
  );

  text(
    " - Record Time - \n" + bestTimeMin + ":" + bestTimeSec + ":" + bestTimeMil,
    width / 2,
    height * 0.75,
  );
}

function drawStar(x, y, radius1, radius2, npoints = 5) {
  push();
  angleMode(DEGREES);
  translate(x, y);
  rotate(-36 / 2);
  angleMode(RADIANS);
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = cos(a) * radius2;
    let sy = sin(a) * radius2;
    vertex(sx, sy);
    sx = cos(a + halfAngle) * radius1;
    sy = sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  pop();
}
// [1]

function levelCompleteButtons() {}
