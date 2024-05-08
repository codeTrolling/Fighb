import { fpsCap } from "../main";

class Attack{
    // everything is an array
    constructor(attackString, damageValues, damageValuesOnBlock, counterHitDamageValues, enemyFramesOnHit, enemyFramesOnBlock, frames, hyperarmor){
        this.attackString = attackString;
        this.damageValues = damageValues;
        this.damageValuesOnBlock = damageValuesOnBlock;
        this.counterHitDamageValues = counterHitDamageValues;
        this.enemyFramesOnHit = enemyFramesOnHit;
        this.enemyFramesOnBlock = enemyFramesOnBlock;
        this.frames = frames;
        this.hyperarmor = hyperarmor;
        // an alias for attackString.length
        this.attackCount;
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

    // TODO make index setters for everything
}

export { Attack };