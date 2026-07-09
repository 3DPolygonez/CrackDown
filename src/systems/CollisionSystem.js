import * as THREE from 'three';

export class CollisionSystem {
    constructor(scene, bulletSystem, blastSystem, enemySystem) {
        this.scene = scene;
        this.blastSystem = blastSystem;
        this.bulletSystem = bulletSystem;
        this.enemySystem = enemySystem;
    }
    update(delta) {
        for (const enemy of this.enemySystem.enemies) {
            const enemyBox = new THREE.Box3().setFromObject(enemy.mesh.group);
            for (const bullet of this.bulletSystem.bullets) {
                const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);
                if (bulletBox.intersectsBox(enemyBox)) {
                    bullet.die();
                    this.enemySystem.die(
                        enemy);
                }
            }
            const expandByScalar = 0.5; // is this needed?
            enemyBox.expandByScalar(expandByScalar);
            for (const otherEnemy of this.enemySystem.enemies){
                if (enemy.name != otherEnemy.name) {
                    const otherEnemyBox = new THREE.Box3().setFromObject(otherEnemy.mesh.group);
                    otherEnemyBox.expandByScalar(expandByScalar);
                    if (enemyBox.intersectsBox(otherEnemyBox)){
                        // create a box of the intersection
                        const intersectionBox = enemyBox.clone();
                        intersectionBox.intersect(otherEnemyBox);
                        // extract the size of the intersection
                        const size = new THREE.Vector3();
                        intersectionBox.getSize(size);
                        // bounce the units away from each other
                        const bounce = false; // flag to indicate if we want collission detection on
                        if (bounce === true) {
                            //  maaaaaybe only one (random selected) of the enemies 
                            //  should be pointed to its previous waypoint?
                            enemy.bounce(delta, size.x, size.y, size.z);
                            otherEnemy.bounce(delta, size.x, size.y, size.z);
                        }
                    }
                }
            }
        }         
    }
}