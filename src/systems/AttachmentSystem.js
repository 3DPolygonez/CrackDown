export class AttachmentSystem
{
    constructor(debugSystem){
        this.debugSystem = debugSystem;
    }
    attach(sourceGroup, sourceAttachmentPoint, targetGroup, targetAttachmentPoint){
        targetGroup.position.x = sourceAttachmentPoint.x + targetAttachmentPoint.x;
        targetGroup.position.y = sourceAttachmentPoint.y + targetAttachmentPoint.y;
        targetGroup.position.z = sourceAttachmentPoint.z + targetAttachmentPoint.z;
        sourceGroup.add(targetGroup);
    }
}