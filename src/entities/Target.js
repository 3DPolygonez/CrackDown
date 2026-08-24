import { AttachmentPoint } from "../mesh/AttachmentPoint";

export class Target{
    constructor(x, y, z){
        this.position = new AttachmentPoint(x, y, z);
    }
    getPosition(){
        return this.position.getPoint();
    }
}