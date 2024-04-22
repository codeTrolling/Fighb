import { ctx } from '../canvas.js'
import { hitboxes } from '../main.js';

// more exceptions should be thrown. Check attachment type (should be of type player). Typescript's looking kind of good right now.

class Hitbox{
    constructor({x=0, y=0, attachment = undefined}){
        // do NOT change x and y manually. use methods like set position instead. x and y should be protected
        this.x = attachment ? attachment.x + x : x;
        this.y = attachment ? attachment.y + y : y;
        this.attachment = attachment;
        this.isVisible = true;
        this.isActive = true;
        // solid collision means that it cannot go into other solid collision hitboxes. false would mean this hitbox can overlap with other hitboxes
        this.solidCollision = true;
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

    // this only really works for square hitboxes as it is. Might remake at some point
    checkForCollision(){
        if(this.isActive){
            hitboxes.forEach((hitbox)=>{
                // checks for collision
                if(hitbox.isActive && hitbox != this){
                    if(this.x + this.width >= hitbox.x && this.x <= hitbox.x + hitbox.width && this.y + this.height >= hitbox.y && this.y <= hitbox.y + hitbox.height){
                        if(this.solidCollision && hitbox.solidCollision){

                            // check where the collision occured (top, bottom, right or left)
                            let thisHalfWidth = this.width / 2;
                            let thisHalfHeight = this.height / 2;
                            let collisionHalfWidth = hitbox.width / 2;
                            let collisionHalfHeight = hitbox.height/2;
                            let thisCenterX = this.x + thisHalfWidth;
                            let thisCenterY = this.y + thisHalfHeight;
                            let collisionCenterX = hitbox.x + collisionHalfWidth;
                            let collisionCenterY = hitbox.y + collisionHalfHeight;

                            // Calculate the distance between centers
                            let diffX = thisCenterX - collisionCenterX;
                            let diffY = thisCenterY - collisionCenterY;

                            // Calculate the minimum distance needed for a collision to occur
                            let minDistX = thisHalfWidth + collisionHalfWidth;
                            let minDistY = thisHalfHeight + collisionHalfHeight;

                            // Calculate the depth of collision for both the X and Y axis
                            let depthX = diffX > 0 ? minDistX - diffX : -minDistX - diffX;
                            let depthY = diffY > 0 ? minDistY - diffY : -minDistY - diffY; 
                                              
                            // don't mind the duplicationg code
                            if(this.attachment != undefined){
                                if(depthX != 0 && depthY != 0){
                                    if(Math.abs(depthX) < Math.abs(depthY)){
                                        // Collision along the X axis
                                        if(depthX > 0){
                                            // Left side collision
                                            this.attachment.x = hitbox.x + hitbox.width;
                                            console.log("left collision");
                                        }
                                        else{
                                            // Right side collision
                                            this.attachment.x = hitbox.x - this.attachment.width;
                                            console.log("righjt collision");
                                        }
                                    }
                                    else{
                                        // Collision along the Y axis
                                        if(depthY > 0){
                                            // Top side collision
                                            this.attachment.y = hitbox.y + hitbox.height;
                                            console.log("top collision");
                                        }
                                        else{
                                            // Bottom side collision
                                            this.attachment.y = hitbox.y - this.attachment.height;
                                        }
                                    }   
                                }
                            }
                        }

                        this.collisionDetected(hitbox);
                    }
                }
            })
        }
    }


    // gets called when a collision is detected. Argument passed is the hitbox this collided with
    collisionDetected(other){
        //console.log("collided other: " + other.x + " this: " + this.x + " actia;;y other: " + other == this);
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

        this.checkForCollision();

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
    constructor({x=0, y=0, width=0, height=0, attachment=undefined}) {
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
