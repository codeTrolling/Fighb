import { players, timeForOneFrame } from "../main.js";

let keybinds = {
    playerOne: {
        moveLeft: "a",
        moveRight: "d",
        jump: "w",
        // used to let player jump while holding down the jump button. without this the player will stop jumping if they press another key (like d)
        isJumping: false,
        crouch: "s",
        // currently does nothing as crouching function is non-existent in player class
        isCrouching: false
        // will add attacks later
    }

}

// how much time the player has for inputs to be chained together,
// needs proper testing to see how it feels. have not tested it yet (attacks are not ready)
const timeToChainInputs = timeForOneFrame * 2;

// used for combos
// inputs are: f-forward, b-backward, d-down, u-up
let playerOneMovementInputs = [];
let playerOneMovementTimout;
// inputs are: '1', '2', '3', '4' (as chars not numbers)
let playerOneAttackInputs = [];
let playerOneAttackTimout;
// the inputs in these comments do not mean these are the keybinds. these are what the game understands



// controls for player one
// keydown fires when the key is continuously being pressed down
document.addEventListener("keydown", (e) =>{
    if(e.key === keybinds.playerOne.moveLeft){
        players[0].velocity.x = -1 * players[0].moveSpeed;
        // need to come at some point when rotation is introduced and change argument based on rotation
        handleMovementInputChain('b');
    }
    else if(e.key === keybinds.playerOne.moveRight){
        players[0].velocity.x = 1 * players[0].moveSpeed;
        handleMovementInputChain('f');
    }
})

// keyup fires when the key stops being pressed
document.addEventListener("keyup", (e) =>{

    // checks velocity so that player doesn't stop moving in case 2 buttons are pressed at the same time. This allows for a more fluid and tight feel
    if(e.key === keybinds.playerOne.moveLeft && players[0].velocity.x < 0){
        // should use a setter instead of this in order to not mess with knockbacks and things
        players[0].velocity.x = 0;
    }
    else if(e.key === keybinds.playerOne.moveRight && players[0].velocity.x > 0){
        players[0].velocity.x = 0;
    }
    else if(e.key === keybinds.playerOne.jump){
        keybinds.playerOne.isJumping = false;
    }
    else if(e.key === keybinds.playerOne.crouch){
        keybinds.playerOne.isCrouching = false;
    }
})

// keypress fires when the key is pressed down
document.addEventListener("keypress", (e) =>{
    if(e.key === keybinds.playerOne.jump){
        keybinds.playerOne.isJumping = true;
        handleMovementInputChain('u');
    }
    if(e.key === keybinds.playerOne.crouch){
        keybinds.playerOne.isCrouching = true;
        handleMovementInputChain('d');
    }
})

// this is essentially a while(true) loop. this is used because setInterval runs asynchronously so that the program doesn't block here.
setInterval(()=>{
    if(keybinds.playerOne.isJumping){
        players[0].jump();
    }
}, 0);



function handleMovementInputChain(action){
    if(typeof(action) != "symbol"){ throw "Invalid argument. Functions takes a char"; }
    playerOneMovementInputs.push(action);
    if(playerOneMovementInputs.length() > 5){ playerOneMovementInputs.splice(0, 1)};
    clearTimeout(playerOneMovementTimout);
    playerOneMovementTimout = setTimeout(() => {
        playerOneMovementInputs = [];
    }, timeToChainInputs);
}
