import { Enemy } from '../entities/Enemy';
import { Blast } from '../entities/Blast';

export class EnemySystem {
  constructor(debugSystem, scene, maxEnemies, players, blasts, environmentSystem) {
    this.debugSystem = debugSystem;
    this.scene = scene;
    this.maxEnemies = maxEnemies;
    this.players = players;
    this.blasts = blasts;
    this.environmentSystem = environmentSystem;

    this.enemies = [];

    this.spawnInterval = 4;
    this.spawnTimer = this.spawnInterval;

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
  }

  spawnEnemy() {
    const spawnPositions = [];
    if (true) {
      if (this.enemies.length <= this.maxEnemies / 5 * 1){
        spawnPositions.push([-16.5, -16.5]);
        spawnPositions.push([-3.5, -16.5]);
        spawnPositions.push([-3.5, -3.5]);
        spawnPositions.push([-16.5, -3.5]);
      }
      else if (this.enemies.length <= this.maxEnemies / 5 * 2){
        spawnPositions.push([4.5, -15.5]);
        spawnPositions.push([15.5, -15.5]);
        spawnPositions.push([15.5, -4.5]);
        spawnPositions.push([4.5, -4.5]);
      }
      else if (this.enemies.length <= this.maxEnemies / 5 * 3){
        spawnPositions.push([4, 4]);
        spawnPositions.push([16, 4]);
        spawnPositions.push([16, 16]);
        spawnPositions.push([4, 16]);
      }
      else if (this.enemies.length <= this.maxEnemies / 5 * 4){
        spawnPositions.push([-16, 4]);
        spawnPositions.push([-4, 4]);
        spawnPositions.push([-4, 16]);
        spawnPositions.push([-16, 16]);
      }
      else{
        spawnPositions.push([-18.5, -18,5]);
        spawnPositions.push([18.5, -18,5]);
        spawnPositions.push([18.5, 18.5]);
        spawnPositions.push([-18.5, 18.5]);
      }
    }
    else {
      for (let i = 0; i < 10; i++) {
        spawnPositions.push([Math.floor(Math.random() * (20 - -20)) + -20, Math.floor(Math.random() * (20 - -20)) + -20]);
      }
    }
    const enemy = new Enemy(this.debugSystem, this.enemies.length, spawnPositions, this.environmentSystem);
    this.scene.add(enemy.mesh.group);

    this.enemies.push(enemy);
    return;
  }
}