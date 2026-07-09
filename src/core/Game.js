import * as THREE from 'three';
import { Input } from './Input';
import { Player } from '../entities/Player';
import { BlastSystem } from '../systems/BlastSystem';
import { BulletSystem } from '../systems/BulletSystem';
import { CollisionSystem } from '../systems/CollisionSystem';
import { EnemySystem } from '../systems/EnemySystem';
import { EnvironmentSystem } from '../systems/EnvironmentSystem';

/*
TO DO:
Give enemy a patrol path to follow, 
and have it chase the player if they are within a certain distance. 
If the player is too far away, the enemy should return to its patrol path.
*/

export class Game {
  constructor() {
    this.blasts = [];

    this.scene = new THREE.Scene();

    /*
    this.camera = new THREE.OrthographicCamera(
      window.innerWidth / -50,
      window.innerWidth / 50,
      window.innerHeight / 50,
      window.innerHeight / -50,
      0.1,
      1000
    );
    */

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.cameraX = 0;
    this.cameraY = 25;
    this.cameraZ = 25;
    this.camera.position.set(0, this.cameraY, this.cameraZ);
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

    const ambientLight = new THREE.AmbientLight(
        0xffffff,
        0.5);
    this.scene.add(ambientLight);

    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load("../resources/textures/floor/tile.png");
    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(40, 40);
    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(40, 40),
        new THREE.MeshStandardMaterial({
          map: map
        })
      );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(floor);

    this.blastSystem = new BlastSystem(
      this.scene);
    this.bulletSystem = new BulletSystem(
      this.scene,
      this.blastSystem);

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
      this.bulletSystem.bullets,
      this.blastSystem.blasts);
    this.player1.group.position.x = -19;
    this.player1.group.position.z = -17;
    
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
      this.bulletSystem.bullets,
      this.blastSystem.blasts);

    this.enemySystem = new EnemySystem(
      this.scene,
      [this.player1, this.player2],
      this.blasts);

    this.environmentSystem = new EnvironmentSystem(
      this.scene);

    this.collisionSystem = new CollisionSystem(
      this.scene,
      this.bulletSystem,
      this.blastSystem,
      this.enemySystem,
      this.environmentSystem);

    this.scene.add(this.player1.group);
    //this.scene.add(this.player2.group);

    this.timer = new THREE.Timer();
  }

  start() {
    this.animate();
  }

  animate() {
    //  The requestAnimationFrame() method of the DedicatedWorkerGlobalScope 
    //  interface tells the browser you wish to perform an animation frame 
    //  request and call a user-supplied callback function before the next repaint.
    requestAnimationFrame(() => this.animate());
     
    //  update the timer
    this.timer.update();

    //  get the delta time since the last update
    const delta = this.timer.getDelta();

    //  update all game components
    this.player1.update(delta);
    this.player2.update(delta);
    this.blastSystem.update(delta);
    this.bulletSystem.update(delta);
    this.enemySystem.update(delta);
    this.environmentSystem.update(delta);
    this.collisionSystem.update(delta);

    //  camera management
    /*
    this.camera.position.set(
      this.enemySystem.enemies[0].mesh.group.position.x, 
      this.cameraY, 
      this.enemySystem.enemies[0].mesh.group.position.z + this.cameraZ);
    */
    /*
    this.camera.position.set(
      this.player1.group.position.x, 
      this.cameraY, 
      this.player1.group.position.z + this.cameraZ);
    */
    //this.camera.lookAt(this.player1.group.position);
    this.camera.position.x = this.enemySystem.enemies[0].mesh.group.position.x;
    this.camera.position.z = this.enemySystem.enemies[0].mesh.group.position.z + 30;
    this.camera.lookAt(this.enemySystem.enemies[0].mesh.group.position);

    //  render all output
    this.renderer.render(this.scene, this.camera);
  }
}