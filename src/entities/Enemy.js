import * as THREE from 'three';

export class Enemy {
  constructor(players) {
    this.players = players;

    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff3333,
    });

    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.castShadow = true;

    this.speed = 2;
  }

  update(delta) {
    const target = this.getNearestPlayer();

    if (!target) return;

    const direction = new THREE.Vector3()
      .subVectors(
        target.mesh.position,
        this.mesh.position
      )
      .normalize();

    this.mesh.position.add(
      direction.multiplyScalar(this.speed * delta)
    );
  }

  getNearestPlayer() {
    let nearest = null;
    let nearestDistance = Infinity;

    for (const player of this.players) {
      const distance =
        this.mesh.position.distanceTo(
          player.mesh.position
        );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = player;
      }
    }

    return nearest;
  }
}