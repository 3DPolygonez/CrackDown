import { BaseAnimation } from '../../BaseAnimation.js';

export class GroupMovingAnimation extends BaseAnimation {
    constructor(mesh) {
        super(mesh);
        this.walkCycle = 0;
    }
    animate(angleX, angleY, angleZ, swingSpeed, speed, delta) {
        if (swingSpeed == 0){
            this.walkCycle = 0;
            this.mesh.group.position.y = 0;
        }
        else{
            const bounceHeight = 0.02 * speed;
            const bounce = Math.abs(Math.sin(this.walkCycle));
            this.mesh.group.position.y = bounce * bounceHeight - bounceHeight / 2.5;
            this.walkCycle += swingSpeed * delta;
        }
    }
}