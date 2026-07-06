import * as THREE from 'three';

export class CollisionSystem {
    constructor(scene, bulletSystem, blastSystem, enemySystem) {
        this.scene = scene;
        this.blastSystem = blastSystem;
        this.bulletSystem = bulletSystem;
        this.enemySystem = enemySystem;
    }
    update(delta) {
        for (const bullet of this.bulletSystem.bullets) {
            const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);
            for (const enemy of this.enemySystem.enemies) {
                const enemyBox = new THREE.Box3().setFromObject(enemy.mesh.group);
                if (bulletBox.intersectsBox(enemyBox)) {
                    bullet.die();
                    this.enemySystem.die(
                        enemy);
                }
            }
        }
    }
}