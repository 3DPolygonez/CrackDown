import { BaseAnimation } from '../../BaseAnimation.js';

export class WaistMovingAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.waist.rotation.z = -angleZ;
    }
}