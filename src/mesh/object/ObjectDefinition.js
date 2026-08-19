import { AttachmentPoint } from '../AttachmentPoint';

export class ObjectDefinition{
    constructor(properties = {}){
        this.scale = properties.scale || 0.025;
        this.rotateX = properties.rotateX || 0;
        this.rotateY = properties.rotateY || 0;
        this.rotateZ = properties.rotateZ || 0;
        this.meshes = properties.meshes || [];
        this.attachmentPoint = properties.attachmentPoint || new AttachmentPoint();
    }
}