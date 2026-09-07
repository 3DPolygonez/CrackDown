export class AttachmentPoint{
    #x;
    #y;
    #z;
    #onUserGroupRotateX;
    constructor(x = 0, y = 0, z = 0, onUserGroupRotateX = 0){
        this.#x = x;
        this.#y = y;
        this.#z = z;
        this.#onUserGroupRotateX = onUserGroupRotateX;
    }
    getPoint(){
        return {
            x: this.#x,
            y: this.#y,
            z: this.#z,
            onUserGroupRotateX: this.#onUserGroupRotateX
        };
    }
}