import { Enemy } from '../entities/Enemy';
import { Blast } from '../entities/Blast';

export class EnemySpawner {
  constructor(scene, players, blasts) {
    this.scene = scene;
    this.players = players;
    this.blasts = blasts;

    this.enemies = [];

    this.spawnTimer = 0;
    this.spawnInterval = 2;
  }

  update(delta) {
    this.spawnTimer -= delta;

    if (this.spawnTimer <= 0 && this.enemies.length < 1) {
      this.spawnEnemy();

      this.spawnTimer = this.spawnInterval;
    }

    for (const enemy of this.enemies) {
      enemy.update(delta);
    }
  }

  die(enemy) {
    const blast = new Blast(
      enemy.group.position.clone(),
      0.25,
      this.scene,
      this.blasts);
    this.scene.remove(enemy.group);
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
    enemy.group.geometry.dispose();
    enemy.group.material.dispose();
  }

  spawnEnemy() {
    const enemy = new Enemy(this.players, [[2, 2], [2, 20], [10, 20], [10, 2]]);
    enemy.group.position.set(
      enemy.waypoints[enemy.currentWaypointIndex][0], 
      0, 
      enemy.waypoints[enemy.currentWaypointIndex][1]);
      
    this.scene.add(enemy.group);
    this.enemies.push(enemy);
    return;
  }
}