import * as THREE from 'three';
import { NodeSystem } from '../systems/NodeSystem';

export class VisionSystem{
    constructor(debugSystem, environmentSystem, enemySystem, players){
        this.raycaster = new THREE.Raycaster();
        this.debugSystem = debugSystem;
        this.environmentSystem = environmentSystem;
        this.enemySystem = enemySystem;
        this.players = players;
        this.obstacles = this.environmentSystem.getPositions();
    }
    update(delta) {
        for (const enemy of this.enemySystem.enemies) {
            const player = this.players[0];
            //  we should only be setting Enemy Spotted
            //  the other states should be handled by the enemy itself
            //  based on its own internal state and timers
            if (this.canSee(enemy, player)){
                enemy.fsm.transition('ENEMY_SPOTTED', { player: player });``
            }
            else if (enemy.isBusy()){
                enemy.fsm.transition('VISION_LOST');
            }
            else{
                enemy.fsm.transition('TIMEOUT');
            }
        }
    }
    canSee(observer, target){
        //  setup vectors
        const observerPosition = observer.getPosition(); // posA
        const targetPosition = target.getPosition();     // posB   
    
        const direction = new THREE.Vector3();
        direction.subVectors(targetPosition, observerPosition);

        const distance = direction.length();
        direction.normalize();

        const lookDirection = new THREE.Vector3();
        observer.mesh.headGroup.getWorldDirection(lookDirection);
        
        //  set the max view distance and vision angle
        const maxDistance = 10;
        const maxAngleCos = Math.cos(THREE.MathUtils.degToRad(45));

        //  check if within distance and cone angle
        const dotProduct = lookDirection.dot(direction);
        let isVisible = (distance <= maxDistance) && (dotProduct >= maxAngleCos);

        if (isVisible){
            //  raycast
            this.raycaster.set(observerPosition, direction);

            //  get an array of intersections with potential obstacles. sorted by cloest first
            const intersections = this.raycaster.intersectObjects(this.obstacles, true);

            if (intersections.length > 0){
                //  get the closest intersection point
                const closestHit = intersections[0];

                //  if the closest obstacle is closer than our target, the line of site is interrupted
                if (closestHit.distance < distance){
                    isVisible = false;
                }
            }
        }
        return isVisible;
    }
}