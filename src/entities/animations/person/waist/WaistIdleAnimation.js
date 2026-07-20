import { BaseAnimation } from '../../BaseAnimation.js';

export class WaistIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.waist.rotation.z = 0;
    }
}