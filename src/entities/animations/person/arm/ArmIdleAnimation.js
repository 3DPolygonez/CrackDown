import { BaseAnimation } from '../../BaseAnimation.js';

export class ArmIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.rightArm.rotation.x = 0;
        this.mesh.leftArm.rotation.x = 0;
    }
}