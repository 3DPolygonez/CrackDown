import * as THREE from 'three';
import { Bullet } from './Bullet';
import { Blast } from './Blast';

export class Player {
  constructor(color, controls, speed) {
    this.controls = controls;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color });

    this.group = new THREE.Group();
    this.direction = new THREE.Vector3(1, 0, 0);
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.position.y = 0;
    this.speed = speed;
    this.bullets = [];
    this.blasts = [];
    this.shootCooldown = 0;
    this.group.add(this.mesh);

    this.meshGun = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.50), material);
    this.meshGun.castShadow = true;
    this.meshGun.position.z = 0.5;
    this.meshGun.position.y = 0.25;
    this.group.add(this.meshGun);

    this.meshLeftTrack = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.8), material);
    this.meshLeftTrack.castShadow = true;
    this.meshLeftTrack.position.x = 0.6;
    this.meshLeftTrack.position.y = 0.1;
    this.meshLeftTrack.position.z = 0;
    this.group.add(this.meshLeftTrack);

    this.meshRightTrack = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.8), material);
    this.meshRightTrack.castShadow = true;
    this.meshRightTrack.position.x = -0.6;
    this.meshRightTrack.position.y = 0.1;
    this.meshRightTrack.position.z = 0;
    this.group.add(this.meshRightTrack);
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

    this.group.position.add(
      move.multiplyScalar(this.speed * delta)
    );

    this.group.rotation.y = Math.atan2(this.direction.x, this.direction.z);

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
      this.group.position.clone(),
      this.direction
    );

    this.bullets.push(bullet);

    scene.add(bullet.mesh);
  }
}