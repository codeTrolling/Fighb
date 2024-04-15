import { players } from "../main.js";

let keybinds = {
    playerOne: {
        moveLeft: "a",
        moveRight: "d",
        jump: "w",
        // used to let player jump while holding down the jump button. without this the player will stop jumping if they press another key (like d)
        isJumping: false
        // will add attacks later
    }

}

// controls for player one
// keydown fires when the key is continuously being pressed down
document.addEventListener("keydown", (e) =>{
    if(e.key === keybinds.playerOne.moveLeft){
        players[0].velocity.x = -1 * players[0].moveSpeed;
    }
    else if(e.key === keybinds.playerOne.moveRight){
        players[0].velocity.x = 1 * players[0].moveSpeed;
    }
})

// keyup fires when the key stops being pressed
document.addEventListener("keyup", (e) =>{

    // checks velocity so that player doesn't stop moving in case 2 buttons are pressed at the same time. This allows for a more fluid and tight feel
    if(e.key === keybinds.playerOne.moveLeft && players[0].velocity.x < 0){
        players[0].velocity.x = 0;
    }
    else if(e.key === keybinds.playerOne.moveRight && players[0].velocity.x > 0){
        players[0].velocity.x = 0;
    }
    else if(e.key === keybinds.playerOne.jump){
        keybinds.playerOne.isJumping = false;
    }
})

// keypress fires when the key is pressed down
document.addEventListener("keypress", (e) =>{
    if(e.key === keybinds.playerOne.jump){
        keybinds.playerOne.isJumping = true;
    }
})

// this is essentially a while(true) loop. this is used because setInterval runs asynchronously so that the program doesn't block here.
setInterval(()=>{
    if(keybinds.playerOne.isJumping){
        players[0].jump();
    }
}, 0);
