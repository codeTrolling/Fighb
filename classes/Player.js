import { ctx, canvas } from "../canvas.js";
import { fpsCap, deltaTime, timeForOneFrame } from "../main.js";
import { SquareHitbox } from "./Hitboxes.js";
import { Attack } from "./Attack.js";
import Entity from "./Entity.js";


let playerCount = 0;
class Player extends Entity{
    constructor({x=0, y=0, health=100, moveSpeed=300, width=50, height=100, gravity = 1, name = ""}){
        let tempName = name != "" ? name : "player" + toString(playerCount);
        super(tempName);
        this.x = x;
        this.y = y;
        this.velocity = {x: 0, y: 0};
        this.health = health;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
        // how strongly gravity affects this
        this.gravityMultiplyer = gravity;
        this.isGrounded = false;
        this.timeFalling = 0;
        this.jumpForce = 700;
        // usually stores Hitbox objects
        this.attachedElements = [];
        this.isJumping = false;
        this.isCrouching = false;
        // -1 means the player is looking right and 1 - left
        this.rotation = -1;
        // stores Attack objects
        this.allAttacks = [];
        // changes dynamically based on which attacks can be used. Basically if you have an attack "a b c" but the player's first action is 'b' that means the "a b c" attack will not be available
        this.availableAttacks = [];
        this.timeOfLastAttack = 0;
        this.canBufferAttack = false;
        this.bufferedAttack = "";
        this.bufferTimout;
        this.isAttacking = false;
        this.isBlocking = true;
        // which part of the attack should happen or in other words how much the attack has progressed.
        this.attackIndex = 0;
        this.timeoutForAttackIndexReset;
        // stored in order to interrupt the attack going off if the player gets hit before the attack happens
        this.activateHitboxForAttackTimeout;
        this.stopAttackTimeout;
        // the attack that's being executed right now
        this.currentExecutingAttack;

        this.knockbackTimeout;
        this.canMove = true;
    }

    // used to render the player. Should be called every frame;
    render(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    movementInput(ms){
        if(!this.canMove || this.isAttacking){
            return;
        }
        this.velocity.x = ms * this.moveSpeed;
    }

    moveX(){
        // let playerPositionAfterMoving = this.x + this.velocity.x + this.width;
        // if(playerPositionAfterMoving < canvas.width && this.x + this.velocity.x > 0){
        //     this.x += this.velocity.x;
        // }
        this.x += this.velocity.x * deltaTime;
        if(this.x + this.width > canvas.width){
            this.x = canvas.width - this.width;
        }
        else if(this.x < 0){
            this.x = 0;
        }
    }


    gravityEffect(){
        if(!this.isGrounded){
            // this is a formula i found online. don't question it. TEMP VALUE: this.y before everything else. not used right now though
            // this.velocity.y = this.velocity.y * this.time + 0.5 * 9.81*(this.time*this.time);
            this.timeFalling += 100;
            //this.timeFalling += (1/fpsCap) 
            this.velocity.y += this.timeFalling * deltaTime * this.gravityMultiplyer;
            if(this.y + this.height + this.velocity.y * deltaTime >= canvas.height){
                this.isGrounded = true;
                this.y = canvas.height - this.height;
                this.velocity.y = 0;
                this.timeFalling = 0;
                this.isJumping = false;
            }
        }
    }

    jump(){
        if(this.isGrounded && !this.isJumping){
            this.velocity.y += -1 * this.jumpForce;
            this.isGrounded = false;
            this.isJumping = true;
        }
    }



    // Make sure that there is no undefined Attack class properties. This function does not check for these things in order to avoid making useless instructions every time an attack is done
    // this function will try to attack and handle buffering.
    // reminder: try to refactor. this is not optimazed!
    attackOrBuffer(atkChain, movementChain){
        if(this.bufferedAttack != "" || !this.canMove){return;}
        for(let i = 0; i < this.allAttacks.length; i++){
                
            let mvmntChain = [...movementChain];
            for(let j = 0; j < movementChain.length; j++){
                let movementString = mvmntChain.join("");
                mvmntChain.splice(0, 1);
                let atkString = movementString + atkChain;
                if(atkString == this.allAttacks[i].attackString[this.attackIndex]){

                    const noBufferAttackCd = Date.now() - timeForOneFrame * this.allAttacks[i].frames[this.attackIndex];
                    const bufferAttackCd = Date.now() - timeForOneFrame * (this.allAttacks[i].frames[this.attackIndex] - this.allAttacks[i].bufferFrames[this.attackIndex]);
                    // no buffering
                    if(noBufferAttackCd > this.timeOfLastAttack){
                        // just use the attack here
                        this.isAttacking = true;
                        this.timeOfLastAttack = Date.now();
                        let currentAtk = this.allAttacks[i];
                        this.currentExecutingAttack = currentAtk;
                        // play animation at some point

                        currentAtk.hitboxToUse.setRelativePosition(currentAtk.hitboxPositions[attackIndex][0], currentAtk.hitboxPositions[attackIndex][1]);
                        currentAtk.hitboxToUse.width = currentAtk.hitboxWidths[this.attackIndex];
                        currentAtk.hitboxToUse.height = currentAtk.hitboxHeights[this.attackIndex];
                        this.activateHitboxForAttackTimeout = setTimeout(() => {currentAtk.hitboxToUse.isActive = true}, currentAtk.windupFrames[this.attackIndex] * timeForOneFrame);
                        this.stopAttackTimeout = setTimeout(this.stopAttack, currentAtk.frames[this.attackIndex] * timeForOneFrame);


                        this.attackIndex++;
                    }
                    // buffering occurs
                    else if(bufferAttackCd > this.timeOfLastAttack){
                        // setTimeout which calls this function again after enough time has passed
                        const timeUntilCanAttack = this.timeOfLastAttack - noBufferAttackCd;
                        bufferTimout = setTimeout(() => {this.bufferedAttack = atkChain; this.waitForAttackBuffer(atkChain, movementChain)}, timeUntilCanAttack)
                    }
                    // the comment below is outdated 
                    // the idea here is to setTimeout to reset attackIndex after the attack's frames + a global variable which contains the time given to continue a combo have passed.
                    // Check if such a timeout already exists though
                    // timeoutForAttackIndexReset = setTimeout(()=>{})
                    // this comment is outdated ^
                    // this needs proper testing to make sure it works correctly. might reset index earlier due to buffer. if so use the resetAttackIndexAfterTime(timeoutTime) function
                    if(timeoutForAttackIndexReset){
                        clearTimeout(timeoutForAttackIndexReset);
                    }
                    timeoutForAttackIndexReset = setTimeout(() => {
                        this.attackIndex = 0;
                    }, this.allAttacks[i].frames[this.attackIndex - 1] * timeForOneFrame)

                    return;
                }
            }
        }
    }



    waitForAttackBuffer(atkChain, movementChain){
        this.bufferedAttack = "";
        this.attackOrBuffer(atkChain, movementChain);
    }


    resetAttackIndexAfterTime(timeoutTime){
        if(timeoutForAttackIndexReset){
            clearTimeout(timeoutForAttackIndexReset);
        }
        timeoutForAttackIndexReset = setTimeout(() => {
            this.attackIndex = 0;
        }, timeoutTime)
    }


    stopAttack(){
        this.currentExecutingAttack.hitboxToUse.isActive = false;
        this.isAttacking = false;
        this.currentExecutingAttack = null; // will this break due to shallow copies? check later!
    }


    getHit(attackType, damageToTake, damageToTakeOnBlock, knockbackDir, framesOnHit, framesOnBlock, framesOnCounterHit){
        if(this.isAttacking){
            if(!this.currentExecutingAttack.hyperarmor){
                clearTimeout(this.bufferTimout);
                this.bufferedAttack = "";
                clearTimeout(this.stopAttackTimeout);
                this.stopAttack();
                this.getKnockedBack(knockbackDir.x, knockbackDir.y, framesOnCounterHit);
                // damageToTake + 1 because counterHit adds 1 damage to the attack.
                this.reduceHp(damageToTake + 1);
            }
            else{
                this.reduceHp(damageToTake);
            }
        }
        else if(this.isBlocking){
            if((this.isCrouching && attackType == 'm') || !this.isCrouching && attackType == 'l'){
                this.getKnockedBack(knockbackDir.x, knockbackDir.y, framesOnHit);
                this.reduceHp(damageToTake);
            }
            else{
                this.canMove = false;
                knockbackTimeout = setTimeout(() => {this.canMove = true}, framesOnBlock * timeForOneFrame)
                this.reduceHp(damageToTakeOnBlock);
            }
        }
        else{
            this.getKnockedBack(knockbackDir.x, knockbackDir.y, framesOnHit);
            this.reduceHp(damageToTake);
        }
    }

    reduceHp(damage){
        if(this.health - damage <= 0){
            // die() or sth

            // = 0 so that the UI doesn't look weird 
            this.health = 0
            return;
        }
        this.health -= damage;
    }


    getKnockedBack(x, y, frames){
        // play some animation

        this.canMove = false;
        if(knockbackTimeout){
            clearTimeout(knockbackTimeout);
        }
        knockbackTimeout = setTimeout(() => {this.canMove = true}, frames * timeForOneFrame);
        this.velocity.x = x * this.rotation;
        this.velocity.y = y;
    }


    // called every frame
    update(){
        this.moveX();
        this.gravityEffect();
        this.y += this.velocity.y * deltaTime;
        this.attachedElements.forEach((element) => {
            // this shouldn't be called every update. currently just testing
            element.setRelativePosition(element.relativeX, element.relativeY);
            element.render();
        })
        this.render();
    }
}

export {playerCount};
export default Player;