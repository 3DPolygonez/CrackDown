import { BaseAnimation } from '../../BaseAnimation.js';

export class HeadIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.headGroup.rotation.y = angleY;
        this.mesh.headGroup.rotation.z = 0;
    }
}