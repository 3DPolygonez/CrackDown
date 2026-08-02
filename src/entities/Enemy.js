import * as THREE from 'three';
import { Soldier } from '../mesh/Soldier';
import { Engineer } from '../mesh/Engineer';
import { WaypointManager } from './managers/WaypointManager';
import { NodeSystem } from '../systems/NodeSystem';
import { StateManager } from './managers/StateManager';

export class Enemy {
  constructor(debugSystem, name, waypoints, environmentSystem) {
    this.name = name;
    this.waypointManager = new WaypointManager(waypoints);
    this.environmentSystem = environmentSystem;
    this.pauseTime = this.pauseDuration;
    this.maxSpeed = 4;//[2, 4, 6][Math.floor(Math.random() * 3)];
    this.speed = this.maxSpeed;
    this.waypointProximity = 0.05;
    this.pauseDuration = this.maxSpeed == 2 ? 3 : (this.maxSpeed == 4 ? 2 : 1);

    //  the initial direction is used to determine which way the enemy is looking when it first spawns, and is also used to determine which way the enemy is moving when it is not at a waypoint
    this.direction = new THREE.Vector3(0, 0, 0);

    //  during development, we can use the name to determine which mesh to use for the enemy
    if (name % 2){
      this.mesh = new Engineer(debugSystem, this.maxSpeed);
    }
    else{
      this.mesh = new Soldier(debugSystem, this.maxSpeed);
    }
    //  position the npc at the first waypoint
    this.mesh.group.position.set(
      this.waypointManager.getCurrentWaypointX(), 
      0, 
      this.waypointManager.getCurrentWaypointZ());

    //  FSM for the enemy's state (patrolling, chasing, searching, etc.)
    const states = [
      {
        name: 'IDLE',
        transitions: {
          START_PATROL: 'PATROL'
        },
        onEnter: () => {}
      },
      {
        name: 'PATROL',
        transitions: {
          ENEMY_SPOTTED: 'CHASE'
        },
        onEnter: () => {}
      },
      {
        name: 'CHASE',
        transitions: {
          VISION_LOST: 'SEARCH'
        },
        onEnter: () => {}
      },
      {
        name: 'SEARCH',
        transitions: {
          TIMEOUT: 'PATROL',
          ENEMY_SPOTTED: 'CHASE'
        },
        onEnter: () => {}
      }
    ];
    this.fsm = new StateManager(states, 'IDLE', (changeData) => this.handleStateChange(changeData));
    this.fsm.transition('START_PATROL');
  }
  handleStateChange({ from, to, trigger, args }) {
    console.log(`Enemy ${this.name} transitioned from ${from} to ${to} due to ${trigger} with args:`, args);
    switch (to) {
      case 'CHASE':
        this.canSeeTarget(args.player);
        break;
      case 'SEARCH':
        this.maybeSeeTarget();
        break;
      case 'PATROL':
        this.cannotSeeTarget();
        break;
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
  isBusy(){
    return this.waypointManager.isBusy();
  }
  canSeeTarget(player){
    this.maxSpeed = 6;
    this.mesh.maxSpeed = this.maxSpeed;
    this.mesh.detectionState.material.color.set("red");
    this.pauseDuration = 0;
    //  this needs to be moved to the enemy class, but for now it's here
    const nodeSystem = new NodeSystem(this.environmentSystem);
    nodeSystem.setStartWaypoint(this.getPosition().x - 0.5, this.getPosition().z - 0.5);
    nodeSystem.setGoalWaypoint(player.group.position.x, player.group.position.z);
    nodeSystem.setNodeCosts();
    nodeSystem.autoSearch();
    this.waypointManager.setPriorityWaypoints(nodeSystem.getSimplifiedPathWaypoints()); 
  }
  cannotSeeTarget(){
    this.maxSpeed = 4;
    this.mesh.maxSpeed = this.maxSpeed;
    this.mesh.detectionState.material.color.set("green");
  }
  maybeSeeTarget(){
    this.mesh.detectionState.material.color.set("orange");
  }
  animationState(){
    return this.pauseTime < this.pauseDuration === true ? "Idle" : (this.turning() ? "Turning" : "Moving");
  }
  targetY(){
    return Math.atan2(this.direction.x, this.direction.z);
  }
  turning(){
    return Math.abs(this.mesh.group.rotation.y - this.targetY()) > 0.1;
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
    if (true){
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
    }

    // Calculate how much we have to turn the character towards the waypoint
    const targetY = this.targetY();
    const turning = this.turning();
    
    // update the mesh (arms and legs swinging)
    this.mesh.update(
      delta, 
      this.animationState());

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