import { Enemy } from '../entities/Enemy';

export class EnemySpawner {
  constructor(scene, players) {
    this.scene = scene;
    this.players = players;

    this.enemies = [];

    this.spawnTimer = 0;
    this.spawnInterval = 2;
  }

  update(delta) {
    this.spawnTimer -= delta;

    if (this.spawnTimer <= 0) {
      this.spawnEnemy();

      this.spawnTimer = this.spawnInterval;
    }

    for (const enemy of this.enemies) {
      enemy.update(delta);
    }
  }

  spawnEnemy() {
    const enemy = new Enemy(this.players);

    const edge = Math.floor(Math.random() * 4);

    const range = 20;

    switch (edge) {
      case 0:
        enemy.mesh.position.set(
          -range,
          0.5,
          Math.random() * range * 2 - range
        );
        break;

      case 1:
        enemy.mesh.position.set(
          range,
          0.5,
          Math.random() * range * 2 - range
        );
        break;

      case 2:
        enemy.mesh.position.set(
          Math.random() * range * 2 - range,
          0.5,
          -range
        );
        break;

      case 3:
        enemy.mesh.position.set(
          Math.random() * range * 2 - range,
          0.5,
          range
        );
        break;
    }

    this.scene.add(enemy.mesh);

    this.enemies.push(enemy);
  }
}