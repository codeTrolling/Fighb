import { players } from "../../../main.js";

let player1;
function playersAreInitialized(){
    player1 = {
        obj: players[0],
        maxHp: players[0].health,
        hpBar: document.getElementById("player1-hp"),
        takenHpBar: document.getElementById("player1-taken-hp")
    }
}

function UpdatePlayerHealth(playerObject){
    let player;
    if(playerObject == player1.obj){ player = player1; }
    //else if(playerObject == player2.obj){ player = player2; }
    if(!player){
        return;
    }

    player.hpBar.style.width = (player.obj.health / player.maxHp) * 100 + "%";
    player.takenHpBar.style.width = (player.obj.health / player.maxHp) * 100 + "%";
    console.log((player.obj.health / player.maxHp) * 100 + "%");

}

export { UpdatePlayerHealth, playersAreInitialized };
