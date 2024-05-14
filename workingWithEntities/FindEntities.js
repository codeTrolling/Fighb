import { entities, players } from "../main";

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


export {FindEntity, FindPlayer};