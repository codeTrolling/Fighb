import { ctx, canvas } from "../canvas.js";

class Player{
    constructor({x=0, y=0, health=100, moveSpeed=5, width=50, height=100}){
        this.x = x;
        this.y = y;
        this.velocity = {x: 0, y: 0};
        this.health = health;
        this.moveSpeed = moveSpeed;
        this.width = width;
        this.height = height;
    }

    // used to render the player. Should be called every frame;
    render(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height)
        console.log("rendered!");
    }
}

export default Player;