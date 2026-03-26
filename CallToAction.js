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
    CallToActionObj.textSize = 12;
    CallToActionObj.parentObj = null;
    CallToActionObj.opacity = 0;

    CallToActionObj.debug = true;

    // CallToActionObj.getParentObj = (element) => {
        
    // };


}

function updateCallToActionObj() {
    console.log("start");
    CallToActionObj.forEach(element => {
        console.log(element);
        CallToActionObjFade(element);
    });
}

function CallToActionObjFade(CTAObj) {
    // console.log(CTAObj.parentObj != null);
    if (CTAObj.parentObj != null) {
        if (CTAObj.parentObj.colliding(mainPlayer.mainBody)) {
            if (CTAObj.opacity > 1) {
                CTAObj.opacity = 1;
            } else {
                // !!!triggered frames per second!!!
                CTAObj.opacity += 0.1
            }
        }
    }
}