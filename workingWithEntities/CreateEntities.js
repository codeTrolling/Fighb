import { SquareHitbox } from "../classes/Hitboxes";
import Player from "../classes/Player";
import { entities, hitboxes, players } from "../main";

function CreatePlayer(){
    let player = new Player()
    entities.push(player);
    players.push(player);
    return player;
}

function CreateSquareHitbox(){
    let hitbox = new SquareHitbox();
    entities.push(hitbox);
    hitboxes.push(hitbox);
    return hitbox;
}

export {CreatePlayer, CreateSquareHitbox};