import { ctx } from '../canvas.js'

// more exceptions should be thrown. Check attachment type (should be of type player). Typescript's looking kind of good right now.

class Hitbox{
    constructor({x=0, y=0, attachment = undefined}){
        this.x = attachment ? attachment.x + x : x;
        this.y = attachment ? attachment.y + y : y;
        this.attachment = attachment;
        this.isVisible = true;
        this.isActive = true;
        this.interval;
        this.relativeX = 0;
        this.relativeY = 0;
    }

    setupAttachment(attachment){
        if(this.attachment == attachment) {return;}
        this.attachment = attachment;
        this.x = attachment.x;
        this.y = attachment.y;
        attachment.attachedElements.push(this);
    }

    addToPosition(x, y){
        if(x == undefined || y == undefined || typeof(x) != "number" || typeof(y) != "number") {throw "Invalid arguments."}
        this.x += x;
        this.y += y;
    }

    addToRelativePosition(x, y){
        if(x == undefined || y == undefined || typeof(x) != "number" || typeof(y) != "number") {throw "Invalid arguments."}
        this.relativeX += x;
        this.relativeY += y;
    }

    // sets absolute position of the hitbox regardless of parent element
    setPosition(x, y){
        if(x == undefined || y == undefined || typeof(x) != "number" || typeof(y) != "number") {throw "Invalid arguments."}
        this.x = x;
        this.y = y;
    }
    
    // relative position means relative to the parent this element is attached to. Parent is usually an object of class Player
    setRelativePosition(x, y){
        if(!this.attachment) {throw "This element is not attached to a parent. See setupAttachment()."}
        if(x == undefined || y == undefined || typeof(x) != "number" || typeof(y) != "number") {throw "Invalid arguments."}
        console.log("x: " + this.x + " y: " + this.y + " typex: " + typeof(x) + " typey: " + typeof(y) + "attachments: " + this.attachment.x + " " + this.attachment.y);
        this.x = this.attachment.x + x;
        this.y = this.attachment.y + y;
        this.relativeX = x;
        this.relativeY = y;
    }

    // sets if this hitbox is active or not
    setIsActive(isActive){
        this.isActive = isActive;
        if(isActive){
            // for tomorrow: setInterval where it checks for collision every frame
        }
        else if(this.interval){
            clearInterval(this.interval);
        }
    }

    // TODO: Add a method to detect collision.

}

class SquareHitbox extends Hitbox{
    constructor({x, y, width, height, attachment}) {
        super(x, y, attachment);
        this.width = width;
        this.height = height;
    }

    // not tested! test next time!!!
    render(){
        if(this.isVisible){
            ctx.strokeStyle = "green";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

}

export { SquareHitbox };
