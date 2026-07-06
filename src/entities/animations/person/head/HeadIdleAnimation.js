import { BaseAnimation } from '../../BaseAnimation.js';

export class HeadIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.head.rotation.y = angleY;
        this.mesh.face.rotation.y = angleY;
    }
}