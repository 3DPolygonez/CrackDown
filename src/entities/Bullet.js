import * as THREE from 'three';
import { Blast } from './Blast';

export class Bullet {
  constructor(position, direction, scene, bullets, blasts) {
    this.scene = scene;
    this.bullets = bullets;
    this.blasts = blasts;
    
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(position);
    this.mesh.position.y += 0.25;
    this.mesh.position.x += direction.x;
    this.mesh.position.z += direction.z;
    this.mesh.castShadow = true;
    this.distaceTraveled = 0;
    this.velocity = direction.clone().multiplyScalar(10);
    this.originalPosition = this.mesh.position.clone();
    this.distanceMax = 10;

    this.bullets.push(this);
    this.scene.add(this.mesh);
  }

  distanceMaxed(){
    return Math.abs(this.distaceTraveled) > this.distanceMax;
  }

  die() {
    const blast = new Blast(
      this.mesh.position.clone(),
      0.1,
      this.scene,
      this.blasts);
    this.scene.remove(this.mesh);
    this.bullets.splice(this.bullets.indexOf(this), 1);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  update(delta) {
    this.mesh.position.add(
      this.velocity.clone().multiplyScalar(delta)
    );
    this.distaceTraveled = this.originalPosition.distanceTo(this.mesh.position);
    if (this.distanceMaxed()) {
      this.die();
    }
  }
}