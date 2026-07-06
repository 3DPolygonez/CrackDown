export class BulletSystem {
    constructor(scene, blastSystem) {
        this.scene = scene;
        this.bullets = [];
        this.blastSystem = blastSystem;
    }
    update(delta) {
        for (const bullet of this.bullets) {
            bullet.update(
                delta, 
                this.scene, 
                this.bullets, 
                this.blastSystem.blasts);
        }
    }
}