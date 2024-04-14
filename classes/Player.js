import { ctx, canvas } from "../canvas.js";
import { fpsCap } from "../main.js";

class Player{
    constructor({x=0, y=0, health=100, moveSpeed=5, width=50, height=100, gravity = 1}){
        this.x = x;
        this.y = y;
        this.velocity = {x: 0, y: 0};
        this.health = health;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
        this.gravity = gravity;
        this.isGrounded = false;
        this.timeFalling = 0;
    }

    // used to render the player. Should be called every frame;
    render(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height)
        console.log(this.y + " > " + canvas.height);
    }

    moveX(){
        // let playerPositionAfterMoving = this.x + this.velocity.x + this.width;
        // if(playerPositionAfterMoving < canvas.width && this.x + this.velocity.x > 0){
        //     this.x += this.velocity.x;
        // }
        this.x += this.velocity.x;
        if(this.x + this.width > canvas.width){
            this.x = canvas.width - this.width;
        }
        else if(this.x < 0){
            this.x = 0;
        }
    }

    // gravity. Make the character constantly fall towards the ground.
    gravityEffect(){
        if(!this.isGrounded){
            // this is a formula i found online. don't question it. TEMP VALUE: this.y before everything else. not used right now though
            // this.velocity.y = this.velocity.y * this.time + 0.5 * 9.81*(this.time*this.time);
            this.velocity.y = this.timeFalling;
            this.timeFalling += (1/fpsCap) * 30
            if(this.y + this.height > canvas.height){
                this.isGrounded = true;
                this.y = canvas.height - this.height;
                this.velocity.y = 0;
            }
        }
        else{
            this.timeFalling = 0;
        }
    }


    // called every frame
    update(){
        this.render();
        this.moveX();
        this.gravityEffect();
        this.y += this.velocity.y;
    }
}

export default Player;