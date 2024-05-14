import { ctx } from '../canvas.js'
import { hitboxes, deltaTime } from '../main.js';
import Entity from './Entity.js';

// more exceptions should be thrown. Check attachment type (should be of type player). Typescript's looking kind of good right now.

class Hitbox extends Entity{
    static count = 0;
    constructor({x=0, y=0, attachment = undefined, name = ""}){
        count++;
        let tempName = name != "" ? name : "hitbox" + toString(count);
        super(tempName);
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
        this.collidingWith = [];
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
                if(hitbox.isActive && hitbox != this && (hitbox.attachment ? this.attachment != hitbox.attachment : true)){
                    let velocityX = this.attachment != undefined ? this.attachment.velocity.x * deltaTime : 0;
                    let velocityY = this.attachment != undefined ? this.attachment.velocity.y * deltaTime : 0;
                    if(this.x + this.width + velocityX >= hitbox.x &&
                         this.x + velocityX <= hitbox.x + hitbox.width &&
                          this.y + this.height + velocityY >= hitbox.y &&
                           this.y + velocityY <= hitbox.y + hitbox.height){
                        if(this.solidCollision && hitbox.solidCollision){

                            // check where the collision occured (top, bottom, right or left)
                            let thisHalfWidth = this.width / 2;
                            let thisHalfHeight = this.height / 2;
                            let collisionHalfWidth = hitbox.width / 2;
                            let collisionHalfHeight = hitbox.height/2;
                            let thisCenterX = this.x + velocityX + thisHalfWidth;
                            let thisCenterY = this.y + velocityY + thisHalfHeight;
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
                                            console.log("right collision", this.attachment.timeFalling);
                                        }
                                    }
                                    else{
                                        // Collision along the Y axis
                                        if(depthY > 0){
                                            // Top side collision
                                            this.attachment.y = hitbox.y + hitbox.height;
                                            if(this.attachment.velocity.y < 0){
                                                this.attachment.velocity.y = 0;
                                            }
                                            console.log("top collision");
                                        }
                                        else{
                                            // Bottom side collision
                                            this.attachment.y = hitbox.y - this.attachment.height;
                                            if(this.attachment.velocity.y > 0){
                                                this.attachment.isGrounded = true;
                                                this.attachment.velocity.y = 0;
                                                this.attachment.timeFalling = 0;
                                            }
                                            console.log("bot collision")
                                        }
                                    }   
                                }
                            }
                        }

                        if(this.collidingWith.indexOf(hitbox) == -1){
                            this.enterCollision(hitbox);
                            this.collidingWith.push(hitbox);
                        }
                        else{
                            this.inCollision(hitbox);
                        }

                    }

                    else if(this.collidingWith.indexOf(hitbox) != -1){ 
                        let hitboxIndex = this.collidingWith.indexOf(hitbox);
                        this.collidingWith.splice(hitboxIndex, 1);
                        this.endCollision(hitbox);
                    }
                }

            }) // foreach ends here
        }
    }


    // gets called when a collision is detected. Passed argument is the hitbox this collided with
    enterCollision(other){

    }

    // gets called when the object is continuously colliding with another object
    inCollision(other){

    }

    // gets called when going out of collision with an object. Passed argument is the hitbox this stopped colliding with.
    endCollision(other){
        if(this.attachment != undefined) { this.attachment.isGrounded = false;}
    }

    addToPosition(x, y){
        if(x == undefined || y == undefined || typeof(x) != "number" || typeof(y) != "number") {throw "Invalid arguments."}
        this.x += x;
        this.y += y;
        if(this.attachment != undefined){
            this.relativeX = this.x - this.attachment.x;
            this.relativeY = this.x - this.attachment.y;
        }
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
        if(this.attachment != undefined){
            this.relativeX = this.x - this.attachment.x;
            this.relativeY = this.x - this.attachment.y;
        }
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
            this.checkForCollision();
        }
    }

}

class SquareHitbox extends Hitbox{
    constructor({x=0, y=0, width=0, height=0, attachment=undefined}) {
        super(x, y, attachment);
        this.width = width;
        this.height = height;
    }

    render(){
        if(this.isVisible){
            ctx.strokeStyle = "green";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

}

export { SquareHitbox };
