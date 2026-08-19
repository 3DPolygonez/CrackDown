export class AttachmentPoint{
    #x;
    #y;
    #z;
    constructor(x = 0, y = 0, z = 0){
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }
    getPoint(){
        return {
            x: this.#x,
            y: this.#y,
            z: this.#z
        };
    }
}