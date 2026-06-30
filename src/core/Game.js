import * as THREE from 'three';
import { Input } from './Input';
import { Player } from '../entities/Player';
import { EnemySpawner } from '../systems/EnemySpawner';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';

/*
TO DO:
Give enemy a patrol path to follow, 
and have it chase the player if they are within a certain distance. 
If the player is too far away, the enemy should return to its patrol path.
*/

export class Game {
  constructor() {
    this.bullets = [];
    this.blasts = [];

    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -50,
      window.innerWidth / 50,
      window.innerHeight / 50,
      window.innerHeight / -50,
      0.1,
      1000
    );

    this.camera.position.set(0, 20, 20);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    this.renderer.shadowMap.enabled = true;
    
    document.body.appendChild(this.renderer.domElement);

    this.input = new Input();

    const light = new THREE.DirectionalLight(
      0xffffff,
      1);
    // position of light must be off the page so that the 
    // shadow camera frustrum covers the page
    light.position.set(20, 20, -20);
    light.castShadow = true;
    const d = 50;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    this.scene.add(light);

    const frontLight = new THREE.DirectionalLight(
      0xffffff,
      1);
    frontLight.position.set(100, 50, 25);
    this.scene.add(frontLight);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshPhongMaterial({
        color: 0x999999,
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    const gridHelper = new THREE.GridHelper(50, 50);
    this.scene.add(gridHelper);

    this.player1 = new Player(
      0x00aaff, 
      {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        fire: 'Space',
      },
      5,
      this.input,
      this.scene,
      this.bullets,
      this.blasts);

    this.player2 = new Player(
      0x00ff00, 
      {
        up: 'KeyW',
        down: 'KeyS',
        left: 'KeyA',
        right: 'KeyD',
        fire: 'Enter'
      },
      5,
      this.input,
      this.scene,
      this.bullets,
      this.blasts);
    this.player2.group.position.x = 2;

    this.enemySpawner = new EnemySpawner(
      this.scene,
      [this.player1, this.player2],
      this.blasts);

    this.scene.add(this.player1.group);
    this.scene.add(this.player2.group);

    this.clock = new THREE.Clock();
  }

  start() {
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    this.player1.update(delta);
    this.player2.update(delta);
    this.enemySpawner.update(delta);

    for (const blast of this.blasts) {
      blast.update(
        delta, 
        this.scene, 
        this.blasts);
    }

    for (const bullet of this.bullets) {
      bullet.update(
        delta, 
        this.scene, 
        this.bullets, 
        this.blasts);
      const bulletBox = new THREE.Box3().setFromObject(bullet.mesh);
      for (const enemy of this.enemySpawner.enemies) {
        const enemyBox = new THREE.Box3().setFromObject(enemy.mesh);
        if (bulletBox.intersectsBox(enemyBox)) {
          bullet.die(this.scene, this.bullets, this.blasts);
          this.enemySpawner.die(
            enemy);
        }
      }
    }

    // faffing with the camera position and target to follow a player
    this.camera.position.set(this.player1.group.position.x, 20, this.player1.group.position.z + 20);
    this.camera.lookAt(this.player1.group.position);

    this.renderer.render(this.scene, this.camera);
  }
}