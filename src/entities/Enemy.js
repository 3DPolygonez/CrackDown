import * as THREE from 'three';
import { Person } from '../mesh/Person';

export class Enemy {
  constructor(players, waypoints) {
    this.players = players;

    this.waypoints = waypoints;
    this.previousWaypointIndex = 0;
    this.currentWaypointIndex = 0;
  
    this.pauseTime = this.pauseDuration;

    this.maxSpeed = [2, 4, 8][Math.floor(Math.random() * 3)];
    this.speed = this.maxSpeed;
    this.waypointProximity = this.maxSpeed / 4;
    this.pauseDuration = this.maxSpeed == 2 ? 3 : (this.maxSpeed == 4 ? 2 : 1);

    this.direction = new THREE.Vector3(1, 0, 0);

    this.mesh = new Person(this.maxSpeed);
  }

  update(delta) {
    // waypoint navigation
    if (Math.abs(this.mesh.group.position.x - this.waypoints[this.currentWaypointIndex][0]) <= this.waypointProximity
      && Math.abs(this.mesh.group.position.z - this.waypoints[this.currentWaypointIndex][1]) <= this.waypointProximity) {
      this.previousWaypointIndex = this.currentWaypointIndex;
      this.currentWaypointIndex++;
      this.pauseTime = 0;
    }
    if (this.currentWaypointIndex >= this.waypoints.length) {
      this.currentWaypointIndex = 0;
    };

    // pause at waypoints
    if (this.pauseTime < this.pauseDuration) {
      this.pauseTime += delta;
      if (this.speed > 0) {
        this.speed -= delta * this.maxSpeed * 4;
      }
      if (this.speed < 0) {
        this.speed = 0;
      }
      // move towards the previous waypoint
      this.direction = new THREE.Vector3()
        .subVectors(
          new THREE.Vector3(
            this.waypoints[this.previousWaypointIndex][0], 
            this.mesh.group.position.y, 
            this.waypoints[this.previousWaypointIndex][1]),
          this.mesh.group.position
        )
        .normalize();
    }
    else {
      // Accelerate to max speed
      if (this.speed < this.maxSpeed) {
        this.speed += delta * this.maxSpeed;
      }
      // move towards the next waypoint
      this.direction = new THREE.Vector3()
        .subVectors(
          new THREE.Vector3(
            this.waypoints[this.currentWaypointIndex][0], 
            this.mesh.group.position.y, 
            this.waypoints[this.currentWaypointIndex][1]),
          this.mesh.group.position
        )
        .normalize();
    }

    // update the mesh (arms and legs swinging)
    this.mesh.update(
      delta, 
      this.speed === 0);

    // Rotate the enemy to face the direction of movement
    const targetY = Math.atan2(this.direction.x, this.direction.z);
    if (Math.abs(this.mesh.group.rotation.y - targetY) < 0.1) {
      this.mesh.group.position.add(
        this.direction.multiplyScalar(this.speed * (this.mesh.group.scale.x / 1.25) * delta));
    }
    else {
      // Smoothly rotate towards the target direction
      const directionDifference = targetY - this.mesh.group.rotation.y;
      
      if (targetY > this.mesh.group.rotation.y) {
        this.mesh.group.rotation.y += this.maxSpeed / 100;
      }
      else {
        this.mesh.group.rotation.y -= this.maxSpeed / 100;
      }
      const rotationDifference = Math.abs(targetY - this.mesh.group.rotation.y);
      if (rotationDifference < this.maxSpeed / 50) {
        this.mesh.group.rotation.y = targetY;
      }
    }
    return;










    const target = this.getNearestPlayer();
    if (!target) return;
  }

  getNearestPlayer() {
    let nearest = null;
    let nearestDistance = Infinity;

    for (const player of this.players) {
      const distance =
        this.group.position.distanceTo(
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