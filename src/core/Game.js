import * as THREE from 'three';
import { Input } from './Input';
import { Player } from '../entities/Player';
import { EnemySpawner } from '../systems/EnemySpawner';

export class Game {
  constructor() {
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
    light.position.set(0, 5, -5);
    light.castShadow = true;
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

    this.player1 = new Player(
      0x00ff00, 
      {
        up: 'KeyW',
        down: 'KeyS',
        left: 'KeyA',
        right: 'KeyD',
        fire: 'Enter'
      },
      5);

    this.player2 = new Player(
      0x00aaff, 
      {
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight',
        fire: 'Space',
      },
    5);
    this.player2.group.position.x = 2;

    this.enemySpawner = new EnemySpawner(
      this.scene,
      [this.player1, this.player2]
    );

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

    this.player1.update(delta, this.input, this.scene);
    this.player2.update(delta, this.input, this.scene);
    this.enemySpawner.update(delta);

    this.renderer.render(this.scene, this.camera);
  }
}