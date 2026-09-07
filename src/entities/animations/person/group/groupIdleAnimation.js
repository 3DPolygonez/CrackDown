import { BaseAnimation } from '../../BaseAnimation.js';

export class GroupIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.group.position.y = 0;
    }
}