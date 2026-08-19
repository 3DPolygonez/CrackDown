import { Enemy } from '../entities/Enemy';
import { Blast } from '../entities/Blast';
import { Soldier } from '../mesh/npc/Soldier';
import { Engineer } from '../mesh/npc/Engineer';
import { Scientist } from '../mesh/npc/Scientist';
import { Box } from '../mesh/object/Box';
import { Smg } from '../mesh/object/Smg';
import { ClipBoard } from '../mesh/object/ClipBoard';

export class EnemySystem {
  constructor(debugSystem, scene, maxEnemies, players, blasts, environmentSystem, attachmentSystem, designMode) {
    this.debugSystem = debugSystem;
    this.scene = scene;
    this.maxEnemies = maxEnemies;
    this.players = players;
    this.blasts = blasts;
    this.environmentSystem = environmentSystem;
    this.attachmentSystem = attachmentSystem;
    this.designMode = designMode;

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
    if (!this.designMode) {
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
      spawnPositions.push([0, 0]);
    }
    const enemy = new Enemy(
      this.scene,
      this.debugSystem, 
      this.enemies.length, 
      spawnPositions, 
      this.environmentSystem,
      this.designMode ? 
        new Engineer(this.debugSystem, this.maxSpeed)
        :
        [
          new Engineer(this.debugSystem, this.maxSpeed), 
          new Soldier(this.debugSystem, this.maxSpeed), 
          new Scientist(this.debugSystem, this.maxSpeed)
        ][Math.floor(Math.random() * 3)]);

    let rndObject = Math.floor(Math.random() * 4)
    if (rndObject == 1){
      const item = new Box(this.debugSystem);
      this.attachmentSystem.attach(enemy.mesh.rightArmGroup, enemy.getAttachmentPoint(), item.get3DObject(), item.getAttachmentPoint());
    }
    else if (rndObject == 2){
      const item = new Smg(this.debugSystem);
      this.attachmentSystem.attach(enemy.mesh.rightArmGroup, enemy.getAttachmentPoint(), item.get3DObject(), item.getAttachmentPoint());
    }
    else if (rndObject == 3){
      const item = new ClipBoard(this.debugSystem);
      this.attachmentSystem.attach(enemy.mesh.rightArmGroup, enemy.getAttachmentPoint(), item.get3DObject(), item.getAttachmentPoint());
    }

    this.enemies.push(enemy);
    return;
  }
}