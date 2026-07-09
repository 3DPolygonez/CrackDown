import { BaseAnimation } from '../../BaseAnimation.js';

export class ChestIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.chest.rotation.z = 0;
    }
}