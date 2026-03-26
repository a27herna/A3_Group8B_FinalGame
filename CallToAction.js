let CallToActionObj;

function initCalltoActionObj() {
    let objHeight = 100;
    let objWidth = objHeight;

    CallToActionObj = new Group();
    CallToActionObj.width = objWidth;
    CallToActionObj.height = objHeight;
    CallToActionObj.physics = "NONE";
    CallToActionObj.layer = 3;
    
    CallToActionObj.text = "";
    CallToActionObj.textSize = 12;
    // CallToActionObj.parentObj = null;

    CallToActionObj.debug = true;
}