import * as THREE from 'three';
import { Soldier } from '../mesh/Soldier';
import { Engineer } from '../mesh/Engineer';
import { WaypointManager } from './managers/WaypointManager';

export class Enemy {
  constructor(debugSystem, name, players, waypoints) {
    this.name = name;
    this.players = players;
    this.waypointManager = new WaypointManager(waypoints);

    this.pauseTime = this.pauseDuration;

    this.maxSpeed = 6;//[2, 4, 6][Math.floor(Math.random() * 3)];
    this.speed = this.maxSpeed;
    this.waypointProximity = 0.05;
    this.pauseDuration = this.maxSpeed == 2 ? 3 : (this.maxSpeed == 4 ? 2 : 1);

    this.direction = new THREE.Vector3(1, 0, 0);

    if (name % 2){
      this.mesh = new Engineer(debugSystem, this.maxSpeed);
    }
    else{
      this.mesh = new Soldier(debugSystem, this.maxSpeed);
    }
    
  }
  bounce(delta, x, y, z) {
    this.direction.x += (this.direction.x < 0 ? x : -x) * this.speed;
    this.direction.z += (this.direction.z < 0 ? z : -z) * this.speed;
    this.mesh.group.position.add(
        this.direction.multiplyScalar(this.speed * (1.25) * delta));
    this.waypointManager.setPreviousWaypoint();
  }
  getPosition(){
    return this.mesh.group.position;
  }
  update(delta) {
    // waypoint navigation
    if ((Math.abs(this.mesh.group.position.x - this.waypointManager.getCurrentWaypointX()) <= this.waypointProximity
      && Math.abs(this.mesh.group.position.z - this.waypointManager.getCurrentWaypointZ()) <= this.waypointProximity)
      || this.forceChangeWaypoint === true) {
      this.mesh.group.position.x = this.waypointManager.getCurrentWaypointX();
      this.mesh.group.position.z = this.waypointManager.getCurrentWaypointZ();
      this.waypointManager.setNextWaypoint();
      this.pauseTime = 0;
    }

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
            this.waypointManager.getPreviousWaypointX(), 
            this.mesh.group.position.y, 
            this.waypointManager.getPreviousWaypointZ()),
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
            this.waypointManager.getCurrentWaypointX(),
            this.mesh.group.position.y,
            this.waypointManager.getCurrentWaypointZ()),
          this.mesh.group.position
        )
        .normalize();
    }

    // Calculate how much we have to turn the character towards the waypoint
    const targetY = Math.atan2(this.direction.x, this.direction.z);
    const turning = Math.abs(this.mesh.group.rotation.y - targetY) > 0.1;

    // update the mesh (arms and legs swinging)
    this.mesh.update(
      delta, 
      this.pauseTime < this.pauseDuration === true ? "Idle" : (turning ? "Turning" : "Moving"));

    // Rotate the enemy to face the direction of movement
    if (!turning) {
      this.mesh.group.position.add(
        this.direction.multiplyScalar(this.speed * (0.5) * 1.25 * delta));
    }
    else {
      // Smoothly rotate towards the target direction
      this.speed = 0;
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
  }
}