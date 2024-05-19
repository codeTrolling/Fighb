import { fpsCap } from "../main.js";
import { FindHitbox } from "../workingWithEntities/FindEntities.js";

class Attack{
    // everything is an array
    constructor(attackString=[""], damageValues=[0], damageValuesOnBlock=[0], counterHitDamageValues=[0], enemyFramesOnHit=[0], enemyFramesOnBlock=[0], frames=[0], bufferFrames=[0], hyperarmor=false, hitboxPositions=[[0,0]],
        hitboxWidths=[0], hitboxHeights=[0], hitboxToUse=undefined, knockbackDirX=[0], knockbackDirY=[0]
    ){
        this.attackString = attackString;
        this.damageValues = damageValues;
        this.damageValuesOnBlock = damageValuesOnBlock;
        this.counterHitDamageValues = counterHitDamageValues;
        this.enemyFramesOnHit = enemyFramesOnHit;
        this.enemyFramesOnBlock = enemyFramesOnBlock;
        this.frames = frames;
        // frames before the end of the attack which an attack can be buffered at
        this.bufferFrames = bufferFrames;
        // hyperarmor means that the player will not get knockbacked and the attack will not be interrupted when the player gets hit. Damage is still taken.
        this.hyperarmor = hyperarmor;
        // an alias for attackString.length
        this.attackCount;
        this.hitboxToUse = hitboxToUse;
        this.hitboxPositions = hitboxPositions;
        this.hitboxHeights = hitboxHeights;
        this.hitboxWidths = hitboxWidths;
        this.knockbackDirX = knockbackDirX;
        this.knockbackDirY = knockbackDirY;
    }


    setAttackString(attackString){
        this.attackString = attackString;
        this.attackCount = attackString.length;
        if(!this.damageValuesOnBlock){
            this.damageValuesOnBlock = [];
            for(let i = 0; i < this.attackCount; i++){
                this.damageValuesOnBlock.push(0);
            }
        }
    } 

    setDamageValues(damageValues){
        if(!damageValues || !Array.isArray(damageValues)) { throw "Invalid arguments." };
        if(damageValues.length == this.attackCount){
            this.damageValues = damageValues;
        }
        else{
            throw `Damage values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${damageValues.length} damage values.`
        }
    }

    setDamageValuesOnBlock(damageValues){
        if(!damageValues || !Array.isArray(damageValues)) { throw "Invalid arguments." };
        if(damageValues.length == this.attackCount){
            this.damageValuesOnBlock = damageValues;
        }
        else{
            throw `Damage values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${damageValues.length} damage values.`
        }
    }

    setCounterHitDamageValues(damageValues){
        if(!damageValues || !Array.isArray(damageValues)) { throw "Invalid arguments." };
        if(damageValues.length == this.attackCount){
            this.counterHitDamageValues = damageValues;
        }
        else{
            throw `Damage values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${damageValues.length} damage values.`
        }
    }

    setFrames(frames){
        if(!frames || !Array.isArray(frames)) { throw "Invalid arguments." };
        if(frames.length == this.attackCount){
            this.frames = frames;
        }
        else{
            throw `Frames values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${frames.length} damage values.`
        }
    }


    setBufferFrames(frames){
        if(!frames || !Array.isArray(frames)) { throw "Invalid arguments." };
        if(frames.length == this.attackCount){
            this.bufferFrames = frames;
        }
        else{
            throw `Frames values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${frames.length} damage values.`
        }
    }


    setEnemyFramesOnHit(frames){
        if(!frames || !Array.isArray(frames)) { throw "Invalid arguments." };
        if(frames.length == this.attackCount){
            this.enemyFramesOnHit = frames;
        }
        else{
            throw `Frames values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${frames.length} damage values.`
        }
    }


    setEnemyFramesOnBlock(frames){
        if(!frames || !Array.isArray(frames)) { throw "Invalid arguments." };
        if(frames.length == this.attackCount){
            this.enemyFramesOnHit = frames;
        }
        else{
            throw `Frames values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${frames.length} damage values.`
        }
    }


    setHyperarmor(hyperarmor){
        if(typeof(hyperarmor) != "boolean") { throw "Invalid arguments." }
        this.hyperarmor = hyperarmor;
    }


    // this should be an object of type Hitbox
    setHitboxToUse(hitbox){
        this.hitboxToUse = hitbox;
    }

    // use hitbox with this name{
    setHitboxToUseName(name){
        let hitbox = FindHitbox(name);
        if(hitbox != -1){
            this.hitboxToUse = hitbox;
        }
    }
    


    setHitboxPositions(pos){
        if(!pos || !Array.isArray(pos)) { throw "Invalid arguments." };
        if(pos.length == this.attackCount){
            this.hitboxPositions = pos;
        }
        else{
            throw `Hitbox positions values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${pos.length} damage values.`
        }
    }


    setHitboxWidths(width){
        if(!width || !Array.isArray(width)) { throw "Invalid arguments." };
        if(width.length == this.attackCount){
            this.hitboxWidths = width;
        }
        else{
            throw `Hitbox width values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${width.length} damage values.`
        }
    }


    setHitboxHeights(height){
        if(!height || !Array.isArray(height)) { throw "Invalid arguments." };
        if(height.length == this.attackCount){
            this.hitboxHeights = height;
        }
        else{
            throw `Hitbox height values given were more or less than the attack count. The attack is ${this.attackCount} long but you have given ${height.length} damage values.`
        }
    }


    // Sets the attack string at a given index. This will change the buttons needed to perform the specified attack.
    setAttackStringAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set attack string to undefined" };
        this.attackString[index] = value;
    }


    // Sets the frames value at a given index
    setFrameAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set frame to undefined" };
        this.frames[index] = value;
    }


    // Sets the bufferFrames value at a given index
    setBufferFrameAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set frame to undefined" };
        this.bufferFrames[index] = value;
    }


    // Sets the damage value at a given index
    setDamageValueAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set damage to undefined" };
        this.damageValues[index] = value;
    }


    // Sets the damage on block value at a given index
    setDamageValueOnBlockAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set damage to undefined" };
        this.damageValuesOnBlock[index] = value;
    }


    // Sets the counter hit damage value at a given index
    setCounterHitDamageValueAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set damage to undefined" };
        this.counterHitDamageValues[index] = value;
    }


    // Sets the frames on hit value at a given index
    setEnemyFrameOnHitAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set frame to undefined" };
        this.enemyFramesOnHit[index] = value;
    }


    // Sets the frames on block value at a given index
    setEnemyFrameOnBlockAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set frame to undefined" };
        this.enemyFramesOnBlock[index] = value;
    }


    // Sets hitbox position value at a given index
    setHitboxPositionAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set position to undefined" };
        this.hitboxPositions[index] = value;
    }


    // Sets hitbox width value at a given index
    setHitboxWidthAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set width to undefined" };
        this.hitboxWidths[index] = value;
    }


    // Sets hitbox height value at a given index
    setHitboxHeightAtIndex(index, value){
        if(!index || index < 0 || index > this.attackCount - 1) { throw "Index is out of range." };
        if(!value) { throw "Cannot set height to undefined" };
        this.hitboxHeights[index] = value;
    }
    
}

export { Attack };