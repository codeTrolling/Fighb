import { SquareHitbox } from "../classes/Hitboxes.js";
import Player from "../classes/Player.js";
import { playerCount } from "../classes/Player.js";
import { hitboxesCount } from "../classes/Hitboxes.js";
import { entities, hitboxes, players, animations } from "../main.js";
import { animationsCount, Animation } from "../classes/Animation.js";

function CreatePlayer(){
    let player = new Player()
    entities.push(player);
    players.push(player);
    playerCount++;
    return player;
}

function CreateSquareHitbox(){
    let hitbox = new SquareHitbox();
    entities.push(hitbox);
    hitboxes.push(hitbox);
    hitboxesCount++;
    return hitbox;
}

function CreateAnimation(){
    let animation = new Animation();
    animations.push(animation);
    animationsCount++;
    return animation;
}

export {CreatePlayer, CreateSquareHitbox, CreateAnimation};