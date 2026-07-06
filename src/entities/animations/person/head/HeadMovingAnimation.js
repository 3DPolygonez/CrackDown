import { BaseAnimation } from '../../BaseAnimation.js';

export class HeadMovingAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.head.rotation.y = angleY;
        this.mesh.face.rotation.y = angleY;
        this.mesh.head.rotation.z = angleZ;  
        this.mesh.face.rotation.z = angleZ; 
    }
}