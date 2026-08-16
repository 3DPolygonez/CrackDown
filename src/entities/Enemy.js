import * as THREE from 'three';
import { WaypointManager } from './managers/WaypointManager';
import { NodeSystem } from '../systems/NodeSystem';
import { StateManager } from './managers/StateManager';

export class Enemy {
  constructor(scene, debugSystem, name, waypoints, environmentSystem, mesh) {
    this.scene = scene;
    this.name = name;
    this.waypointManager = new WaypointManager(waypoints, this);
    this.environmentSystem = environmentSystem;
    this.baseMaxSpeed = 0;
    this.maxSpeed = 0;
    this.speed = this.maxSpeed;
    this.waypointProximity = 0.05;
    this.pauseDuration = 0;//this.maxSpeed == 2 ? 3 : (this.maxSpeed == 4 ? 2 : 1);
    this.pauseTime = this.pauseDuration;
    this.lookTimeoutId = null;

    //  the initial direction is used to determine which way the enemy is looking when it first spawns, and is also used to determine which way the enemy is moving when it is not at a waypoint
    this.direction = new THREE.Vector3(0, 0, 0);
    this.setMesh(mesh);
    this.setBaseSpeed(6);

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
          VISION_LOST: 'SEARCH',
          ENEMY_SPOTTED: 'CHASE'
        },
        onEnter: () => {}
      },
      {
        name: 'SEARCH',
        transitions: {
          STOP_AND_LOOK: 'LOOK',
          ENEMY_SPOTTED: 'CHASE'
        },
        onEnter: () => {}
      },
      {
        name: 'LOOK',
        transitions: {
          TIMEOUT: 'RETURN',
          ENEMY_SPOTTED: 'CHASE'
        },
        onEnter: () => {}
      },
      {
        name: 'RETURN',
        transitions: {
          RETURN_TO_PATROL: 'PATROL',
          ENEMY_SPOTTED: 'CHASE'
        },
        onEnter: () => {}
      }
    ];
    this.fsm = new StateManager(states, 'IDLE', (changeData) => this.handleStateChange(changeData));
    this.fsm.transition('START_PATROL');
    this.scene.add(this.mesh.group);
  }
  handleStateChange({ from, to, trigger, args }) {
    switch (to) {
      case 'CHASE':
        this.canSeeTarget(args.player);
        break;
      case 'SEARCH':
        break;
      case 'LOOK':
        this.look();
        break;
      case 'RETURN':
        this.returnToPatrol();
        break;
      case 'PATROL':
        this.patrol();
        break;
    }
  }
  getPosition(){
    return this.mesh.group.position;
  }
  get3DObject(){
    return this.mesh.group;
  }
  canSeeTarget(player){
    clearTimeout(this.lookTimeoutId);
    this.setSpeed(this.baseMaxSpeed);
    this.mesh.detectionState.material.color.set("red");
    this.pauseDuration = 0;

    const nodeSystem = new NodeSystem(this.environmentSystem);
    nodeSystem.setStartWaypoint(this.getPosition().x - 0.5, this.getPosition().z - 0.5);
    nodeSystem.setGoalWaypoint(player.getPosition().x, player.getPosition().z);
    nodeSystem.setNodeCosts();
    nodeSystem.autoSearch();
    this.waypointManager.setPriorityWaypoints(nodeSystem.getSimplifiedPathWaypoints()); 
  }
  patrol(){
    this.setSpeed(this.baseMaxSpeed);
    this.mesh.detectionState.material.color.set("green");
  }
  look(){
    this.setSpeed(2);
    this.mesh.detectionState.material.color.set("orange");
    this.lookTimeoutId = setTimeout(() => {
      this.fsm.transition("TIMEOUT");
    }, 5000);
  }
  returnToPatrol(){
    this.setSpeed(this.baseMaxSpeed);

    const nodeSystem = new NodeSystem(this.environmentSystem);
    nodeSystem.setStartWaypoint(this.getPosition().x - 0.5, this.getPosition().z - 0.5);
    nodeSystem.setGoalWaypoint(this.waypointManager.getLastBaseWaypointX(), this.waypointManager.getLastBaseWaypointZ());
    nodeSystem.setNodeCosts();
    nodeSystem.autoSearch();
    this.waypointManager.clearWaypoints();
    this.waypointManager.setPriorityWaypoints(nodeSystem.getSimplifiedPathWaypoints()); 
  }
  animationState(){
    return this.pauseTime < this.pauseDuration === true || this.fsm.current.name === "LOOK" ? "Idle" : (this.turning() ? "Turning" : "Moving");
  }
  targetY(){
    return Math.atan2(this.direction.x, this.direction.z);
  }
  turning(){
    return Math.abs(this.mesh.group.rotation.y - this.targetY()) > 0.1;
  }
  setMesh(mesh){
    let deltaSum = 0;
    let headDeltaSum = 0;
    if (this.mesh){
      deltaSum = this.mesh.deltaSum;
      headDeltaSum = this.mesh.headDeltaSum;
      this.scene.remove(this.mesh.group);
    }
    this.mesh = mesh;
    this.mesh.deltaSum = deltaSum;
    this.mesh.headDeltaSum = headDeltaSum;
    //  position the npc at the first waypoint
    this.mesh.group.position.set(
      this.waypointManager.getCurrentWaypointX(), 
      0, 
      this.waypointManager.getCurrentWaypointZ());
    this.scene.add(this.mesh.group);
  }
  setBaseSpeed(speed){
    this.baseMaxSpeed = speed;
    this.maxSpeed = this.baseMaxSpeed;
    this.mesh.maxSpeed = this.baseMaxSpeed;
  }
  setSpeed(speed){
    this.maxSpeed = speed;
    this.mesh.maxSpeed = this.maxSpeed;
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