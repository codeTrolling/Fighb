let animationsCount = 0;
class Animation{
    constructor(src, totalFrames, scale, name){
        this.src = src;
        this.totalFrames = totalFrames;
        this.scale = scale;
        this.name = name ? name : "animation" + animationsCount;
    }
}

export { Animation, animationsCount }