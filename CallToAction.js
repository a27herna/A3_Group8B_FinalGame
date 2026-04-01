let CallToActionObj;

function initCalltoActionObj() {
  let objHeight = 100;
  let objWidth = objHeight;

  CallToActionObj = new Group();
  CallToActionObj.width = objWidth;
  CallToActionObj.height = objHeight;
  CallToActionObj.physics = "NONE";
  CallToActionObj.layer = 3;

  CallToActionObj.text = "TEST";
  CallToActionObj.textSize = 24;
  CallToActionObj.textColor = "white";

  CallToActionObj.parentObj = null;
  CallToActionObj.opacity = 0;

  //   CallToActionObj.debug = true;
  CallToActionObj.overlaps(mainPlayer.mainBody);
  // CallToActionObj.getParentObj = (element) => {

  // };
}

function updateCallToActionObj() {
  //   console.log("start");
  CallToActionObj.forEach((element) => {
    // console.log(element);
    CallToActionObjFade(element);
  });
}

function CallToActionObjFade(CTAObj) {
  const fadeInSeconds = 1;
  const fadeOutSeconds = 0.75;

  //   console.log(CTAObj.opacity);
  if (CTAObj.parentObj != null) {
    if (CTAObj.parentObj.overlapping(mainPlayer.mainBody)) {
      CTAObj.opacity = min(
        CTAObj.opacity + 1 / (world.updateRate * fadeInSeconds),
        1,
      );
    } else {
      CTAObj.opacity = max(
        CTAObj.opacity - 1 / (world.updateRate * fadeOutSeconds),
        0,
      );
    }
  }
}
