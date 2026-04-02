let RecipientObj;

function initRecipientObj() {
  let objHeight = 200;
  let objWidth = objHeight / 1.5;

  RecipientObj = new Group();
  RecipientObj.width = objWidth;
  RecipientObj.height = objHeight;
  RecipientObj.physics = "NONE";
  RecipientObj.layer = 0;
  RecipientObj.color = "red";
  // RecipientObj.debug = true;

  recipient1Img.resize(0, objHeight * 1.5);
  RecipientObj.image = recipient1Img;

  RecipientObj.image.offset.y = -recipient1Img.height / 6 + 5;
  // RecipientObj.image.scale = 0.5;

  RecipientObj.targetPackage = "basic";
  RecipientObj.satisfied = false;

  RecipientObj.overlapping(mainPlayer.mainBody, acceptPackage);

  RecipientObj.CTAObj = (i) => {
    const CTAWidth = 50;
    const CTAHeight = 50;
    let tempObj = new CallToActionObj.Sprite();

    tempObj.text = "E";
    tempObj.w = CTAWidth;
    tempObj.h = CTAHeight;
    tempObj.color = "Grey";

    tempObj.parentObj = RecipientObj[i];
    // !!! Remember POS origin is at the bottom-most grid !!!
    tempObj.pos.x = tempObj.parentObj.pos.x;
    tempObj.pos.y = tempObj.parentObj.pos.y - tempObj.parentObj.h - tempObj.hh;

    return tempObj;
  };
}

function acceptPackage() {
  // console.log("inside");
  //   console.log(this.overlapping(currPackage));
  if (kb.presses("e")) {
    if (currPackage != null) {
      // console.log("YAY");
      this.sleeping = false;
      mainPlayer.mainBody.sleeping = false;
      currPackage.sleeping = false;
      if (
        this.overlapping(currPackage) &&
        currPackage.packageType == this.targetPackage
      ) {
        // console.log("YIPPEEE!!!!");
        this.satisfied = true;
        this.color = "green";

        currPackage.delete();
        currPackage = null;
      }
    }
  }
}
