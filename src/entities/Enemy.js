import * as THREE from 'three';

export class Enemy {
  constructor(players, waypoints) {
    this.players = players;
    this.waypoints = waypoints;
    this.currentWaypointIndex = 0;
    this.pauseTime = 0;
    this.pauseDuration = 1;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff3333 });
    this.group = new THREE.Group();
    this.direction = new THREE.Vector3(1, 0, 0);
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = 0;
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

    this.speed = 2;
  }

  update(delta) {
    if (Math.abs(this.group.position.x - this.waypoints[this.currentWaypointIndex][0]) <= 0.5
      && Math.abs(this.group.position.z - this.waypoints[this.currentWaypointIndex][1]) <= 0.5) {
      this.currentWaypointIndex++;
      this.pauseTime = 0;
    }
    if (this.currentWaypointIndex >= this.waypoints.length) {
      this.currentWaypointIndex = 0;
    };
    if (this.pauseTime < this.pauseDuration) {
      this.pauseTime += delta;
      return;
    }
    const direction = new THREE.Vector3()
      .subVectors(
        new THREE.Vector3(
          this.waypoints[this.currentWaypointIndex][0], 
          this.group.position.y, 
          this.waypoints[this.currentWaypointIndex][1]),
        this.group.position
      )
      .normalize();
    this.group.rotation.y = Math.atan2(direction.x, direction.z);
    this.group.position.add(
      direction.multiplyScalar(this.speed * delta)
    );
    return;










    const target = this.getNearestPlayer();
    if (!target) return;
  }

  getNearestPlayer() {
    let nearest = null;
    let nearestDistance = Infinity;

    for (const player of this.players) {
      const distance =
        this.mesh.position.distanceTo(
          player.group.position
        );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = player;
      }
    }

    return nearest;
  }
}