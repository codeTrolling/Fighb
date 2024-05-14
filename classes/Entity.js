class Entity{
    constructor(count, name = ""){
        this.name = name != "" ? name : toString(typeof(this)) + toString(count);
    }
}

export default Entity