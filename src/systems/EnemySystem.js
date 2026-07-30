import { Enemy } from '../entities/Enemy';
import { Blast } from '../entities/Blast';

export class EnemySystem {
  constructor(debugSystem, scene, maxEnemies, players, blasts) {
    this.debugSystem = debugSystem;
    this.scene = scene;
    this.maxEnemies = maxEnemies;
    this.players = players;
    this.blasts = blasts;

    this.enemies = [];

    this.spawnTimer = 0;
    this.spawnInterval = 2;

    this.spawnEnemy();
  }

  update(delta) {
    this.spawnTimer -= delta;

    if (this.spawnTimer <= 0 && this.enemies.length < this.maxEnemies) {
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
      if (this.enemies.length < this.maxEnemies / 4 * 1){
        spawnPositions.push([-16, -16]);
        spawnPositions.push([-4, -16]);
        spawnPositions.push([-4, -4]);
        spawnPositions.push([-16, -4]);
      }
      else if (this.enemies.length < this.maxEnemies / 4 * 2){
        spawnPositions.push([4, -16]);
        spawnPositions.push([16, -16]);
        spawnPositions.push([16, -4]);
        spawnPositions.push([4, -4]);
      }
      else if (this.enemies.length < this.maxEnemies / 4 * 3){
        spawnPositions.push([4, 4]);
        spawnPositions.push([16, 4]);
        spawnPositions.push([16, 16]);
        spawnPositions.push([4, 16]);
      }
      else{
        spawnPositions.push([-16, 4]);
        spawnPositions.push([-4, 4]);
        spawnPositions.push([-4, 16]);
        spawnPositions.push([-16, 16]);
      }
    }
    else {
      for (let i = 0; i < 10; i++) {
        spawnPositions.push([Math.floor(Math.random() * (20 - -20)) + -20, Math.floor(Math.random() * (20 - -20)) + -20]);
      }
    }
    const enemy = new Enemy(this.debugSystem, this.enemies.length, this.players, spawnPositions);
    enemy.mesh.group.position.set(
      enemy.waypointManager.getCurrentWaypointX(), 
      0, 
      enemy.waypointManager.getCurrentWaypointZ());
    

    this.scene.add(enemy.mesh.group);
    this.enemies.push(enemy);
    return;
  }
}