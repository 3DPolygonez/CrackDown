import { Bullet } from '../entities/Bullet.js';

export class BulletSystem {
    constructor(scene, blastSystem) {
        this.scene = scene;
        this.bullets = [];
        this.blastSystem = blastSystem;
    }
    shoot(position, direction){
        const bullet = new Bullet(
            position,
            direction.normalize()
        );
        this.bullets.push(bullet);
        this.scene.add(bullet.mesh);
    }
    update(delta) {
        for (const bullet of this.bullets) {
            bullet.update(
                delta, 
                this.scene, 
                this.bullets, 
                this.blastSystem.blasts);
            if (bullet.dead) {
                this.scene.remove(bullet.mesh);
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
                bullet.mesh.geometry.dispose();
                bullet.mesh.material.dispose();
            }
        }
    }
}