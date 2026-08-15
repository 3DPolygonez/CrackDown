import { BaseAnimation } from '../../BaseAnimation.js';

export class ArmIdleAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        this.mesh.rightArmGroup.rotation.x = 0;
        this.mesh.rightArmGroup.rotation.z = 0;
        this.mesh.leftArmGroup.rotation.x = 0;
        this.mesh.leftArmGroup.rotation.z = 0;
    }
}