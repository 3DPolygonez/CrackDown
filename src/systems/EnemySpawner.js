import { Enemy } from '../entities/Enemy';
import { Blast } from '../entities/Blast';

export class EnemySpawner {
  constructor(scene, players, blasts) {
    this.scene = scene;
    this.players = players;
    this.blasts = blasts;

    this.enemies = [];

    this.spawnTimer = 0;
    this.spawnInterval = 0.01;
  }

  update(delta) {
    this.spawnTimer -= delta;

    if (this.spawnTimer <= 0 && this.enemies.length < 100) {
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
    enemy.mesh.group.geometry.dispose();
    enemy.mesh.group.material.dispose();
  }

  spawnEnemy() {
    const spawnPositions = [];
    for (let i = 0; i < 10; i++) {
      spawnPositions.push([Math.floor(Math.random() * (20 - -20)) + -20, Math.floor(Math.random() * (20 - -20)) + -20]);
    }
    const enemy = new Enemy(this.players, spawnPositions);
    enemy.mesh.group.position.set(
      enemy.waypoints[enemy.currentWaypointIndex][0], 
      0, 
      enemy.waypoints[enemy.currentWaypointIndex][1]);
      
    this.scene.add(enemy.mesh.group);
    this.enemies.push(enemy);
    return;
  }
}