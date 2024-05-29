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
        isCrouching: false,

        attackOne: "u",
        attackTwo: "i",
        attackThree: "j",
        attackFour: "k",
        // store recently pressed button. used to prevent attack spamming by holding down the button
        pressedAttackButtons: []
    },


    playerTwo:{
        moveLeft: "ArrowLeft",
        moveRight: "ArrowRight",
        jump: "ArrowUp",
        // used to let player jump while holding down the jump button. without this the player will stop jumping if they press another key (like d)
        isJumping: false,
        crouch: "ArrowDown",
        // currently does nothing as crouching function is non-existent in player class
        isCrouching: false,

        attackOne: "4",
        attackTwo: "5",
        attackThree: "1",
        attackFour: "2",
        // store recently pressed button. used to prevent attack spamming by holding down the button
        pressedAttackButtons: []
    }
}

// how much time the player has for inputs to be chained together,
// needs proper testing to see how it feels. have not tested it yet (attacks are not ready)
const timeToChainInputs = timeForOneFrame * 9;

// used for combos
// inputs are: f-forward, b-backward, d-down, u-up
let playerOneMovementInputs = [];
let playerOneMovementTimeout;
// inputs are: '1', '2', '3', '4' (as chars not numbers)
let playerOneAttackInputs = [];
let playerOneAttackTimeout;
// the inputs in these comments do not mean these are the keybinds. these are what the game understands

let playerTwoMovementInputs = [];
let playerTwoMovementTimeout;
let playerTwoAttackInputs = [];
let playerTwoAttackTimeout;


// controls for player one
// keydown fires when the key is continuously being pressed down
document.addEventListener("keydown", (e) =>{
    if(e.key === keybinds.playerOne.moveLeft){
        //players[0].velocity.x = -1 * players[0].moveSpeed;
        players[0].movementInput(-1)
        // need to come at some point when rotation is introduced and change argument based on rotation
        playerOneMovementTimeout = handleMovementInputChain('b', playerOneMovementInputs, playerOneMovementTimeout);
    }
    else if(e.key === keybinds.playerOne.moveRight){
        //players[0].velocity.x = 1 * players[0].moveSpeed;
        players[0].movementInput(1)
        playerOneMovementTimeout = handleMovementInputChain('f', playerOneMovementInputs, playerOneMovementTimeout);
    }
    else if(e.key === keybinds.playerTwo.moveLeft){
        //players[1].velocity.x = -1 * players[0].moveSpeed;
        players[1].movementInput(-1)
        playerTwoMovementTimeout = handleMovementInputChain('f', playerTwoMovementInputs, playerTwoMovementTimeout);
    }else if(e.key === keybinds.playerOne.moveRight){
        //players[1].velocity.x = 1 * players[0].moveSpeed;
        players[1].movementInput(1)
        playerTwoMovementTimeout = handleMovementInputChain('b', playerTwoMovementInputs, playerTwoMovementTimeout);
    }

    console.log(playerTwoMovementInputs)
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
    else if(e.key === keybinds.playerTwo.moveLeft && players[1].velocity.x < 0){
        players[1].velocity.x = 0;
    }
    else if(e.key === keybinds.playerTwo.moveRight && players[1].velocity.x > 0){
        players[1].velocity.x = 0;
    }
    else if(e.key === keybinds.playerTwo.jump){
        keybinds.playerTwo.isJumping = false;
    }
    else if(e.key === keybinds.playerTwo.crouch){
        keybinds.playerTwo.isCrouching = false;
    }



    // attacks
    // remove pressed buttons from the array. look at keybinds.playerOne.pressedAttackButtons
    else if(e.key === keybinds.playerOne.attackOne){
        let index = keybinds.playerOne.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerOne.pressedAttackButtons.splice(index, 1);
        }
    }
    else if(e.key === keybinds.playerOne.attackTwo){
        let index = keybinds.playerOne.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerOne.pressedAttackButtons.splice(index, 1);
        }
    }
    else if(e.key === keybinds.playerOne.attackThree){
        let index = keybinds.playerOne.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerOne.pressedAttackButtons.splice(index, 1);
        }
    }
    else if(e.key === keybinds.playerOne.attackFour){
        let index = keybinds.playerOne.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerOne.pressedAttackButtons.splice(index, 1);
        }
    }

    // second player
    else if(e.key === keybinds.playerTwo.attackOne){
        let index = keybinds.playerTwo.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerTwo.pressedAttackButtons.splice(index, 1);
        }
    }
    else if(e.key === keybinds.playerTwo.attackTwo){
        let index = keybinds.playerTwo.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerTwo.pressedAttackButtons.splice(index, 1);
        }
    }
    else if(e.key === keybinds.playerTwo.attackThree){
        let index = keybinds.playerTwo.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerTwo.pressedAttackButtons.splice(index, 1);
        }
    }
    else if(e.key === keybinds.playerTwo.attackFour){
        let index = keybinds.playerTwo.pressedAttackButtons.findIndex(e.key);
        if(index != -1){
            keybinds.playerTwo.pressedAttackButtons.splice(index, 1);
        }
    }
})



// keypress fires when the key is pressed down
document.addEventListener("keypress", (e) =>{
    if(e.key === keybinds.playerOne.jump){
        keybinds.playerOne.isJumping = true;
        playerOneMovementTimeout = handleMovementInputChain('u', playerOneMovementInputs, playerOneMovementTimeout);
    }
    else if(e.key === keybinds.playerOne.crouch){
        keybinds.playerOne.isCrouching = true;
        playerOneMovementTimeout = handleMovementInputChain('d', playerOneMovementInputs, playerOneMovementTimeout);
    }
    else if(e.key === keybinds.playerTwo.jump){
        keybinds.playerOne.isJumping = true;
        playerTwoMovementTimeout = handleMovementInputChain('u', playerTwoMovementInputs, playerTwoMovementTimeout);
    }
    else if(e.key === keybinds.playerTwo.crouch){
        keybinds.playerOne.isCrouching = true;
        playerTwoMovementTimeout = handleMovementInputChain('d', playerTwoMovementInputs, playerTwoMovementTimeout);
    }


    switch(e.key){
        case keybinds.playerOne.attackOne: 
            if(!keybinds.playerOne.pressedAttackButtons.includes(e.key)){
                playerOneAttackTimeout = handleAttackInputChain();
                keybinds.playerOne.pressedAttackButtons.push(e.key);
            }
            break;
        case keybinds.playerOne.attackTwo:
            if(!keybinds.playerOne.pressedAttackButtons.includes(e.key)){
                playerOneAttackTimeout = handleAttackInputChain();
                keybinds.playerOne.pressedAttackButtons.push(e.key);
            }
            break;
        case keybinds.playerOne.attackThree:
            if(!keybinds.playerOne.pressedAttackButtons.includes(e.key)){
                playerOneAttackTimeout = handleAttackInputChain();
                keybinds.playerOne.pressedAttackButtons.push(e.key);
            }
            break;
        case keybinds.playerOne.attackFour:
            if(!keybinds.playerOne.pressedAttackButtons.includes(e.key)){
                playerOneAttackTimeout = handleAttackInputChain();
                keybinds.playerOne.pressedAttackButtons.push(e.key);
            }
            break;

        // second player
         case keybinds.playerTwo.attackOne: 
            if(!keybinds.playerTwo.pressedAttackButtons.includes(e.key)){
                playerTwoAttackTimeout = handleAttackInputChain();
                keybinds.playerTwo.pressedAttackButtons.push(e.key);
            }
            break;
        case keybinds.playerTwo.attackTwo:
            if(!keybinds.playerTwo.pressedAttackButtons.includes(e.key)){
                playerTwoAttackTimeout = handleAttackInputChain();
                keybinds.playerTwo.pressedAttackButtons.push(e.key);
            }
            break;
        case keybinds.playerTwo.attackThree:
            if(!keybinds.playerTwo.pressedAttackButtons.includes(e.key)){
                playerTwoAttackTimeout = handleAttackInputChain();
                keybinds.playerTwo.pressedAttackButtons.push(e.key);
            }
            break;
        case keybinds.playerTwo.attackFour:
            if(!keybinds.playerTwo.pressedAttackButtons.includes(e.key)){
                playerTwoAttackTimeout = handleAttackInputChain();
                keybinds.playerTwo.pressedAttackButtons.push(e.key);
            }
            break;
        default: break;
    }
})

// this is essentially a while(true) loop. this is used because setInterval runs asynchronously so that the program doesn't block here.
setInterval(()=>{
    if(keybinds.playerOne.isJumping){
        players[0].jump();
    }
}, 0);



function handleMovementInputChain(action, playerMovementInputs, playerMovementTimeout){
    if(typeof(action) != "string"){ throw "Invalid argument. Functions takes a char"; }
    playerMovementInputs.push(action);
    if(playerMovementInputs.length > 5){ playerMovementInputs.splice(0, 1)};
    clearTimeout(playerMovementTimeout);
    // instead of setting this timeout and clearing it with every function just set a timeout for removing the pressed btn
    // like setTimeout(() => playerMovementInputs.splice(playerMovementInputs.push(action) - 1), timeToChainInputs) or sth like this
    playerMovementTimeout = setTimeout(() => {
        playerMovementInputs.splice(0, 5);
    }, timeToChainInputs);
    return playerMovementTimeout
}


function handleAttackInputChain(){

}
