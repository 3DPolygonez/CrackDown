import { BaseAnimation } from '../../BaseAnimation.js';

export class BackpackIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.backpack.rotation.z = 0;
    }
}