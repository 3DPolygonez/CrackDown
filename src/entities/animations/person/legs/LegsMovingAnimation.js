import { BaseAnimation } from '../../BaseAnimation.js';

export class LegMovingAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.rightLeg.rotation.x = -angleX;
        this.mesh.leftLeg.rotation.x = angleX;
    }
}