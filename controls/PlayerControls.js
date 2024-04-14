import { players } from "../main.js";

// keybinds for player one
let keybinds = {
    moveLeft: "a",
    moveRight: "d",
    jump: "space",
    // will add attacks later
}

// controls for player one
document.addEventListener("keydown", (e) =>{
    if(e.key === keybinds.moveLeft){
        players[0].velocity.x = -1 * players[0].moveSpeed;
    }
    else if(e.key === keybinds.moveRight){
        players[0].velocity.x = 1 * players[0].moveSpeed;
    }
})

document.addEventListener("keyup", (e) =>{

    // checks velocity so that player doesn't stop moving in case 2 buttons are pressed at the same time. This allows for a more fluid and tight feel
    if(e.key === keybinds.moveLeft && players[0].velocity.x < 0){
        players[0].velocity.x = 0;
    }
    else if(e.key === keybinds.moveRight && players[0].velocity.x > 0){
        players[0].velocity.x = 0;
    }
})