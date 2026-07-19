import { Enemy } from '../entities/Enemy';
import { Blast } from '../entities/Blast';

export class EnemySystem {
  constructor(scene, players, blasts) {
    this.scene = scene;
    this.players = players;
    this.blasts = blasts;

    this.enemies = [];

    this.spawnTimer = 0;
    this.spawnInterval = 4;

    this.spawnEnemy();
  }

  update(delta) {
    this.spawnTimer -= delta;

    if (this.spawnTimer <= 0 && this.enemies.length < 16) {
      this.spawnEnemy();
      this.spawnTimer = this.spawnInterval;
    }

    for (const enemy of this.enemies) {
      enemy.update(delta);
    }
  }

  die(enemy) {
    const blast = new Blast(
      enemy.mesh.group.position.clone(),
      0.25,
      this.scene,
      this.blasts);
    this.scene.remove(enemy.mesh.group);
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
    enemy.mesh.group.children.forEach(mesh => {
      mesh.geometry.dispose();
      mesh.material.dispose();     
    });
  }

  spawnEnemy() {
    const spawnPositions = [];
    if (true) {
      spawnPositions.push([-17, -17]);
      spawnPositions.push([-3, -17]);
      spawnPositions.push([-3, -6]);
      spawnPositions.push([3, -6]);
      spawnPositions.push([3, -17]);
      spawnPositions.push([17, -17]);
      spawnPositions.push([17, 17]);
      spawnPositions.push([-17, 17]);
    }
    else {
      for (let i = 0; i < 10; i++) {
        spawnPositions.push([Math.floor(Math.random() * (20 - -20)) + -20, Math.floor(Math.random() * (20 - -20)) + -20]);
      }
    }
    const enemy = new Enemy(this.enemies.length, this.players, spawnPositions);
    enemy.mesh.group.position.set(
      enemy.waypointManager.waypoints[enemy.waypointManager.currentWaypointIndex][0], 
      0, 
      enemy.waypointManager.waypoints[enemy.waypointManager.currentWaypointIndex][1]);
    

    this.scene.add(enemy.mesh.group);
    this.enemies.push(enemy);
    return;
  }
}