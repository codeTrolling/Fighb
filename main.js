import { ctx, canvas, fillCanvas } from "./canvas.js";
import Player from "./classes/Player.js";
import { SquareHitbox } from "./classes/Hitboxes.js";
import { UpdatePlayerHealth, playersAreInitialized } from "./UI/GameUI/HPBarsAndTimer/Script.js";


// fighting games should ideally be 60 fps so do not change this unless you know what you are doing. Changing this might also break something if it depends on fps cap.
const fpsCap = 60;
const timeForOneFrame = (1/fpsCap) * 1000;


// keep every entity here
let entities = [];
// keep every instance of a player here so it gets properly rendered in Tick function
let players = [];
// keep all hitboxes here. Looking for collision will loop over this array
let hitboxes = [];

players.push(new Player({
    x: 50,
    y: 50,
    health: 100,
    moveSpeed: 300
}));

hitboxes.push(new SquareHitbox({}));

hitboxes[0].setupAttachmentByObject(players[0]);
hitboxes[0].width = hitboxes[0].attachment.width;
hitboxes[0].height = hitboxes[0].attachment.height;

//test
hitboxes.push(new SquareHitbox({x: 400, y: 0, width: 100, height:100}));
hitboxes[1].x = 400;
hitboxes[1].y = canvas.height - hitboxes[1].height - 100;

playersAreInitialized();

var lastTime = Date.now();
var deltaTime = 0;
// called every frame
function Tick(){
    deltaTime = (Date.now() - lastTime) / 1000;
    lastTime = Date.now();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fillCanvas();

    players.forEach((player)=>{
        player.update();
        hitboxes[1].render();
    })
    UpdatePlayerHealth(players[0])
}
let gameLoop = setInterval(Tick, timeForOneFrame);

export { fpsCap, players, hitboxes, entities, deltaTime, timeForOneFrame };