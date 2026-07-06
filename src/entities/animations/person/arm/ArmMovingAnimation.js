import { BaseAnimation } from '../../BaseAnimation.js';

export class ArmMovingAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.rightArm.rotation.x = angleX;
        this.mesh.leftArm.rotation.x = -angleX;
    }
}