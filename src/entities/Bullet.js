import * as THREE from 'three';

export class Bullet {
  constructor(position, direction) {
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.copy(position);
    this.mesh.position.y += 0.25;
    this.mesh.castShadow = true;
    this.distaceTraveled = 0;
    this.velocity = direction.clone().multiplyScalar(5);
    this.originalPosition = this.mesh.position.clone();
    this.distanceMax = 10;
  }

  distanceMaxed(){
    return Math.abs(this.distaceTraveled) > this.distanceMax;
  }

  die(){
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }

  update(delta) {
    this.mesh.position.add(
      this.velocity.clone().multiplyScalar(delta)
    );
    this.distaceTraveled = this.originalPosition.distanceTo(this.mesh.position);
  }
}