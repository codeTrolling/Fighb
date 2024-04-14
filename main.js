import { ctx, canvas, fillCanvas } from "./canvas.js";
import Player from "./classes/Player.js";


let fpsCap = 60;
// keep every instance of a player here so it gets properly rendered in Tick function
let players = [];

players.push(new Player({
    x: 50,
    y: 50,
    health: 100,
    moveSpeed: 10
}));

// called every frame
function Tick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillCanvas();

    players.forEach((player)=>{
        player.render();
    })
}
let gameloop = setInterval(Tick, (1/fpsCap) * 1000);
