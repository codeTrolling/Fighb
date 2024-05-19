import { SquareHitbox } from "../classes/Hitboxes.js";
import Player from "../classes/Player.js";
import { playerCount } from "../classes/Player.js";
import { hitboxesCount } from "../classes/Hitboxes.js";
import { entities, hitboxes, players } from "../main.js";

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

export {CreatePlayer, CreateSquareHitbox};