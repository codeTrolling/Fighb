import { entities, players, hitboxes, animations } from "../main.js";

// searches for an entity by name. returns -1 if an entity is not found
function FindEntity(name){
    entities.forEach((entity) => {
        if(entity.name == name){
            return entity;
        }
    })
    return -1;
}


// searches for a player by name. returns -1 if a player is not found
function FindPlayer(name){
    players.forEach(p => {
        if(p.name == name){
            return p;
        }
    })
    return -1
}


// searches for a hitbox by its name. return -1 if a hitbox is not found
function FindHitbox(name){
    hitboxes.forEach(h => {
        if(h.name == name){
            return p;
        }
    })
    return -1;
}


// searches for an animation by name. return -1 if an animation is not found
function FindAnimation(name){
    animations.forEach(a => {
        if(a.name == name){
            return a;
        }
    })
    return -1;
}


export {FindEntity, FindPlayer, FindHitbox, FindAnimation};