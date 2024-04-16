class Hitbox{
    constructor({x=0, y=0, width=10, height=10, attachment}){
        this.x = attachment ? attachment.x + x : x;
        this.y = attachment ? attachment.y + y : y;
        // if you want to make a circle do not use these. circles use a single radius instead. I'm currently not thinking about adding circle hitboxes so you should manually create them if you need them.
        this.width = width;
        this.height = height;
        this.attachment = attachment;
        this.isVisible = true;
    }

    setupAttachment(attachment){
        if(this.attachment == attachment) {return;}
        this.attachment = attachment;
        this.x = attachment.x;
        this.y = attachment.y;
    }

    addRelativePosition(x, y){
        if(!this.attachment) {throw "This element is not attached to a parent. See setupAttachment()."}
    }

}
