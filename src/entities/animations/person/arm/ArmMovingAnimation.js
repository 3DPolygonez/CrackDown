import { BaseAnimation } from '../../BaseAnimation.js';

export class ArmMovingAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
    }
    animate(angleX, angleY, angleZ) {
        //  normal swinging movement
        this.mesh.rightArmGroup.rotation.x = angleX;
        this.mesh.leftArmGroup.rotation.x = -angleX;
        //  angle arms slightly out
        this.mesh.rightArmGroup.rotation.z = -Math.PI / 16;
        this.mesh.leftArmGroup.rotation.z = Math.PI / 16;
    }
}