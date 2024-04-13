import { ctx, canvas } from "./canvas.js";
import Player from "./classes/Player.js";

// const canvas = document.getElementById("canvas");
// export const ctx = canvas.getContext("2d");


// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

let players = [];

const p1 = new Player({
    x: 50,
    y: 50,
    health: 100,
    moveSpeed: 10
})

players.push(p1);
p1.render();