import * as THREE from 'three';
import { Bullet } from './Bullet';
import { Blast } from './Blast';

export class Player {
  constructor(color, controls, speed) {
    this.controls = controls;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color });

    this.direction = new THREE.Vector3(1, 0, 0);
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;

    this.speed = speed;

    this.bullets = [];
    this.blasts = [];

    this.shootCooldown = 0;
  }

  update(delta, input, scene) {
    const move = new THREE.Vector3();
    const moveIncrement = 1;

    for (const blast of this.blasts) {
      blast.dispose();
      scene.remove(blast.mesh);
      this.blasts.splice(this.blasts.indexOf(blast), 1);
    }

    for (const bullet of this.bullets) {
      bullet.update(delta);
      if (bullet.distanceMaxed()) {
        bullet.die();
        scene.remove(bullet.mesh);
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        const blast = new Blast(
          bullet.mesh.position.clone());
        this.blasts.push(blast);
        scene.add(blast.mesh);
      }
    }

    if (input.isDown(this.controls.left)) {
      this.direction.x = -moveIncrement;
      move.x -= moveIncrement;
    }
    if (input.isDown(this.controls.right)) {
      this.direction.x = moveIncrement;
      move.x += moveIncrement;
    }
    if (input.isDown(this.controls.up)) {
      this.direction.z = -moveIncrement;
      move.z -= moveIncrement;
    }
    if (input.isDown(this.controls.down)) {
      this.direction.z = moveIncrement;
      move.z += moveIncrement;
    }
    if (move.x == 0 && move.z != 0) {
      this.direction.x = 0;
    }
    if (move.z == 0 && move.x != 0) {
      this.direction.z = 0;
    }

    move.normalize();

    this.mesh.position.add(
      move.multiplyScalar(this.speed * delta)
    );

    this.mesh.rotation.y = Math.atan2(this.direction.z, this.direction.x);

    this.shootCooldown -= delta;

    if (
      input.isDown(this.controls.fire) &&
      this.shootCooldown <= 0
    ) {
      this.shoot(scene);
      this.shootCooldown = 0.25;
    }

    for (const bullet of this.bullets) {
      bullet.update(delta);
      if (bullet.distanceMaxed()) {
        bullet.die();
        scene.remove(bullet.mesh);
        this.bullets.splice(this.bullets.indexOf(bullet), 1);
        const blast = new Blast(
          bullet.mesh.position.clone(),
          1);
        this.blasts.push(blast);
        scene.add(blast.mesh);
      }
    }
  }

  shoot(scene) {
    const bullet = new Bullet(
      this.mesh.position.clone(),
      this.direction
    );

    this.bullets.push(bullet);

    scene.add(bullet.mesh);
  }
}