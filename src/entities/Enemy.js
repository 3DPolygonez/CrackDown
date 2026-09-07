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
    this.pauseDuration = this.maxSpeed == 2 ? 3 : (this.maxSpeed == 4 ? 2 : 1);
    this.pauseTime = this.pauseDuration;
    this.lookTimeoutId = null;

    //  the initial direction is used to determine which way the enemy is looking when it first spawns, and is also used to determine which way the enemy is moving when it is not at a waypoint
    this.direction = new THREE.Vector3();
    this.setMesh(mesh);
    this.setBaseSpeed([2, 4, 6][Math.floor(Math.random() * 3)]);

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
    this.scene.add(this.get3DObject());
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
  getAttachmentPoint(){
    return this.mesh.attachmentPoint.getPoint();
  }
  canSeeTarget(player){
    clearTimeout(this.lookTimeoutId);
    this.setSpeed(6);
    this.mesh.detectionState.material.color.set("red");
    this.pauseDuration = 0;

    const nodeSystem = new NodeSystem(this.environmentSystem);
    nodeSystem.setStartWaypoint(this.getPosition().x - 0.5, this.getPosition().z - 0.5);
    nodeSystem.setGoalWaypoint(player.getPosition().x, player.getPosition().z);
    nodeSystem.setNodeCosts();
    nodeSystem.autoSearch();
    if (document.getElementById('console-container')){
      document.getElementById('console-container').innerText = "debug route\n" + nodeSystem.drawNodes();
    }
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
    if (document.getElementById('console-container')){
      document.getElementById('console-container').innerText = "";
    }
    this.waypointManager.clearWaypoints();
    this.waypointManager.setPriorityWaypoints(nodeSystem.getSimplifiedPathWaypoints()); 
  }
  animationState(){
    return this.pauseTime < this.pauseDuration === true || this.fsm.current.name === "LOOK" ? "Idle" : (this.turning() ? "Turning" : "Moving");
  }
  targetY(){
    return Math.atan2(
      this.waypointManager.getCurrentWaypointX() - this.mesh.group.position.x, 
      this.waypointManager.getCurrentWaypointZ() -  this.mesh.group.position.z);
  }
  turning(){
    return Math.abs(this.targetY() - this.mesh.group.rotation.y) > 0.1;
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

    // update the mesh (arms and legs swinging)
    this.mesh.update(
      delta, 
      this.animationState(),
      this.speed
    );

    // Calculate how much we have to turn the character towards the waypoint
    const turning = this.turning();
    const targetY = this.targetY();
    //  Rotate the enemy to face the direction of movement
    //  +0.00 down
    //  -1.57 left
    //  +3.14 up
    //  +1.57 right
    if (!turning) {
      this.mesh.group.position.add(
        this.direction.multiplyScalar(this.speed * (0.5) * delta));
    }
    else {
      // Smoothly rotate towards the target direction
      const increment = this.maxSpeed / 25;
      this.speed = 0;
      if (this.pauseTime >= this.pauseDuration){
        this.mesh.group.rotation.y += Math.atan2(
          Math.sin(targetY - this.mesh.group.rotation.y),
          Math.cos(targetY - this.mesh.group.rotation.y)) * increment;
        const rotationDifference = Math.abs(this.mesh.group.rotation.y - targetY);
        if (rotationDifference < increment) {
          this.mesh.group.rotation.y = targetY;
        }
        else if (Math.abs(rotationDifference - Math.round(Math.PI * 100) / 100 * 2) < increment){
          this.mesh.group.rotation.y = targetY;
        }
      }
    }
    return;
  }
}