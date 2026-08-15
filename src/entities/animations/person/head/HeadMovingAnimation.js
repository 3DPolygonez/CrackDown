import { BaseAnimation } from '../../BaseAnimation.js';

export class HeadMovingAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.headGroup.rotation.y = 0;
        this.mesh.headGroup.rotation.z = angleZ / 3; 
    }
}