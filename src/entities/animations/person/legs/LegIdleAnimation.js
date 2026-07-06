import { BaseAnimation } from '../../BaseAnimation.js';

export class LegIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.rightLeg.rotation.x = 0;
        this.mesh.leftLeg.rotation.x = 0;
    }
}