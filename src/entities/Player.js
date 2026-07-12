import * as THREE from 'three';
import { Bullet } from './Bullet';
import { Blast } from './Blast';

export class Player {
  constructor(color, controls, speed, input, scene, bullets, blasts) {
    this.controls = controls;
    this.input = input;
    this.scene = scene;
    this.bullets = bullets;
    this.blasts = blasts;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color });
    this.group = new THREE.Group();
    this.direction = new THREE.Vector3(1, 0, 0);
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = 0;
    this.speed = speed;
    this.shootCooldown = 0;
    this.group.add(this.mesh);

    this.meshGun = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.50), material);
    this.meshGun.castShadow = true;
    this.meshGun.receiveShadow = true;
    this.meshGun.position.z = 0.5;
    this.meshGun.position.y = 0.25;
    this.group.add(this.meshGun);

    this.meshLeftTrack = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.8), material);
    this.meshLeftTrack.castShadow = true;
    this.meshLeftTrack.receiveShadow = true;
    this.meshLeftTrack.position.x = 0.6;
    this.meshLeftTrack.position.y = 0.1;
    this.meshLeftTrack.position.z = 0;
    this.group.add(this.meshLeftTrack);

    this.meshRightTrack = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.8), material);
    this.meshRightTrack.castShadow = true;
    this.meshRightTrack.receiveShadow = true;
    this.meshRightTrack.position.x = -0.6;
    this.meshRightTrack.position.y = 0.1;
    this.meshRightTrack.position.z = 0;
    this.group.add(this.meshRightTrack);
  }

  update(delta, cameraRotationPosition) {
    const move = new THREE.Vector3();
    const moveIncrement = 1;
    switch (cameraRotationPosition){
        case 0: // camera bottom pointing to top
            if (this.input.isDown(this.controls.left)) {//left
              this.direction.x = -moveIncrement;
              move.x -= moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//right
              this.direction.x = moveIncrement;
              move.x += moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//up
              this.direction.z = -moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//down
              this.direction.z = moveIncrement;
              move.z += moveIncrement;
            }
            break;
        case 1: // camera bottom left pointing to top right
            if (this.input.isDown(this.controls.left)) {//up and left
              this.direction.x = -moveIncrement;
              this.direction.z = -moveIncrement;
              move.x -= moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//down and right
              this.direction.x = moveIncrement;
              this.direction.z = moveIncrement;
              move.x += moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//up and right
              this.direction.x = moveIncrement;
              this.direction.z = -moveIncrement;
              move.x += moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//down and left
              this.direction.x = -moveIncrement;
              this.direction.z = moveIncrement;
              move.x -= moveIncrement;
              move.z += moveIncrement;
            }
            break;
        case 2: // camera left pointing to right
            if (this.input.isDown(this.controls.left)) {//up
              this.direction.z = -moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//down
              this.direction.z = moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//right
              this.direction.x = moveIncrement;
              move.x += moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//left
              this.direction.x = -moveIncrement;
              move.x -= moveIncrement;
            }
            break;
        case 3: // camera top left pointing to bottom right
            if (this.input.isDown(this.controls.left)) {//up and right
              this.direction.x = moveIncrement;
              this.direction.z = -moveIncrement;
              move.x += moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//down and left
              this.direction.x = -moveIncrement;
              this.direction.z = moveIncrement;
              move.x -= moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//down and right
              this.direction.x = moveIncrement;
              this.direction.z = moveIncrement;
              move.x += moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//up and left
              this.direction.x = -moveIncrement;
              this.direction.z = -moveIncrement;
              move.x -= moveIncrement;
              move.z -= moveIncrement;
            }
            break;
            break;
        case 4: // camera top pointing to bottom
            if (this.input.isDown(this.controls.left)) {//right
              this.direction.x = moveIncrement;
              move.x += moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//left
              this.direction.x = -moveIncrement;
              move.x -= moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//down
              this.direction.z = moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//up
              this.direction.z = -moveIncrement;
              move.z -= moveIncrement;
            }
            break;
        case 5: // camera top right pointing to bottom left
            if (this.input.isDown(this.controls.left)) {//down and right
              this.direction.x = moveIncrement;
              this.direction.z = moveIncrement;
              move.x += moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//up and left
              this.direction.x = -moveIncrement;
              this.direction.z = -moveIncrement;
              move.x -= moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//down and left
              this.direction.x = -moveIncrement;
              this.direction.z = moveIncrement;
              move.x -= moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//up and right
              this.direction.x = moveIncrement;
              this.direction.z = -moveIncrement;
              move.x += moveIncrement;
              move.z -= moveIncrement;
            }
            break;
        case 6: // camera right pointing to left
            if (this.input.isDown(this.controls.left)) {//down
              this.direction.z = moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//up
              this.direction.z = -moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//left
              this.direction.x = -moveIncrement;
              move.x -= moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//right
              this.direction.x = moveIncrement;
              move.x += moveIncrement;
            }
            break;
        case 7: // camera bottom right pointing to top left
            if (this.input.isDown(this.controls.left)) {//down and left
              this.direction.x = -moveIncrement;
              this.direction.z = moveIncrement;
              move.x -= moveIncrement;
              move.z += moveIncrement;
            }
            if (this.input.isDown(this.controls.right)) {//up and right
              this.direction.x = moveIncrement;
              this.direction.z = -moveIncrement;
              move.x += moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.up)) {//up and left
              this.direction.x = -moveIncrement;
              this.direction.z = -moveIncrement;
              move.x -= moveIncrement;
              move.z -= moveIncrement;
            }
            if (this.input.isDown(this.controls.down)) {//down and right
              this.direction.x = moveIncrement;
              this.direction.z = moveIncrement;
              move.x += moveIncrement;
              move.z += moveIncrement;
            }
            break;
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
      this.input.isDown(this.controls.fire) &&
      this.shootCooldown <= 0
    ) {
      this.shoot(
        this.scene, 
        this.bullets,
        this.blasts);
      this.shootCooldown = 0.25;
    }
  }

  shoot() {
    const bullet = new Bullet(
      this.group.position.clone(),
      this.direction,
      this.scene,
      this.bullets,
      this.blasts 
    );
  }
}