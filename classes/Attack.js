import { fpsCap } from "../main";

class Attack{
    // everything is an array
    constructor(attackString, damageValues, counterHitDamageValues, enemyFramesOnHit, enemyFramesOnBlock, thisFramesOnHit, thisFramesOnBlock, hyperarmor){
        this.attackString = attackString;
        this.damageValues = damageValues;
        this.counterHitDamageValues = counterHitDamageValues;
        this.enemyFramesOnHit = enemyFramesOnHit;
        this.enemyFramesOnBlock = enemyFramesOnBlock;
        this.thisFramesOnHit = thisFramesOnHit;
        this.thisFramesOnBlock = thisFramesOnBlock;
        this.hyperarmor = hyperarmor;
        // an alias for attackString.length
        this.attackCount;
    }


    setAttackString(attackString){
        this.attackString = attackString;
        this.attackCount = attackString.length;
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

    // TODO make setters for everything
}

export { Attack };