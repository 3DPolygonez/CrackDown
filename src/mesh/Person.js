import * as THREE from 'three';
import { LegIdleAnimation } from '../entities/animations/person/legs/LegIdleAnimation.js';
import { LegMovingAnimation } from '../entities/animations/person/legs/LegsMovingAnimation.js';
import { ArmIdleAnimation } from '../entities/animations/person/arm/ArmIdleAnimation.js';
import { ArmMovingAnimation } from '../entities/animations/person/arm/ArmMovingAnimation.js';  
import { HeadIdleAnimation } from '../entities/animations/person/head/HeadIdleAnimation.js';
import { HeadMovingAnimation } from '../entities/animations/person/head/HeadMovingAnimation.js';
import { ChestIdleAnimation } from '../entities/animations/person/chest/ChestIdleAnimation.js';
import { ChestMovingAnimation } from '../entities/animations/person/chest/ChestMovingAnimation.js';
import { BackpackIdleAnimation } from '../entities/animations/person/backpack/BackpackIdleAnimation.js';
import { BackpackMovingAnimation } from '../entities/animations/person/backpack/BackpackMovingAnimation.js';

export class Person {
    constructor(maxSpeed) {
        this.deltaSum = 0;
        this.headDeltaSum = 0;
        this.maxSpeed = maxSpeed;
        this.state = "Idle"; // Default state
        this.animations = this.idleAnimations(); // Default animations

        const textureLoader = new THREE.TextureLoader();
        const textures = [
            textureLoader.load("./resources/textures/person/soldier/head/right.png"),
            textureLoader.load("./resources/textures/person/soldier/head/left.png"),
            textureLoader.load("./resources/textures/person/soldier/head/top.png"),
            textureLoader.load("./resources/textures/person/soldier/head/bottom.png"),
            textureLoader.load("./resources/textures/person/soldier/head/front.png"),
            textureLoader.load("./resources/textures/person/soldier/head/back.png")
        ];
        const materials = textures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        
        const material = new THREE.MeshPhongMaterial({ color: this.maxSpeed == 2 ? "green" : (this.maxSpeed == 4 ? "orange" : "red") });
        const faceMaterial = new THREE.MeshPhongMaterial({ color: "#ffffff" });

        this.group = new THREE.Group();
    
        this.head = new THREE.Mesh(
          new THREE.BoxGeometry(0.43, 0.33, 0.43), material);
        this.head.position.y = 0.7 + 0.166;
        this.head.position.z = 0.05;
        this.head.castShadow = true;
        this.head.receiveShadow = true;
        this.group.add(this.head);
    
        this.face = new THREE.Mesh(
          new THREE.BoxGeometry(0.29, 0.20, 0.29), faceMaterial);
        this.face.position.y = 0.7 + 0.10;
        this.face.position.z = 0.15;
        this.face.castShadow = true;
        this.face.receiveShadow = true;
        this.face.geometry.translate(0, 0, 0); // Translate geometry to rotate around the back  
        this.group.add(this.face);
    
        this.chest = new THREE.Mesh(
          new THREE.BoxGeometry(0.57, 0.20, 0.30), material);
        this.chest.position.y = 0.466 + 0.10;
        this.chest.position.z = 0;
        this.chest.castShadow = true;
        this.chest.receiveShadow = true;
        this.group.add(this.chest);
    
        this.waist = new THREE.Mesh(
          new THREE.BoxGeometry(0.36, 0.13, 0.20), material);
        this.waist.position.y = 0.333 + 0.065;
        this.waist.position.z = 0;
        this.waist.castShadow = true;
        this.waist.receiveShadow = true;
        this.group.add(this.waist);
    
        this.rightArm = new THREE.Mesh(
          new THREE.BoxGeometry(0.21, 0.5, 0.21), material);
        this.rightArm.position.y = 0.5 + 0.166;
        this.rightArm.position.z = 0;
        this.rightArm.position.x = -(0.57 / 2 + 0.21 / 2);
        this.rightArm.castShadow = true;
        this.rightArm.receiveShadow = true;
        this.rightArm.geometry.translate(0, -0.5 / 2, 0); // Translate geometry to rotate around the top
        this.group.add(this.rightArm);
    
        this.leftArm = new THREE.Mesh(
          new THREE.BoxGeometry(0.21, 0.5, 0.21), material);
        this.leftArm.position.y = 0.5 + 0.166;
        this.leftArm.position.z = 0;
        this.leftArm.position.x = 0.57 / 2 + 0.21 / 2;
        this.leftArm.castShadow = true;
        this.leftArm.receiveShadow = true;
        this.leftArm.geometry.translate(0, -0.5 / 2, 0);
        this.group.add(this.leftArm);
    
        this.rightLeg = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.33, 0.14), material);
        this.rightLeg.position.y = 0.333;
        this.rightLeg.position.z = 0;
        this.rightLeg.position.x = -0.18;
        this.rightLeg.castShadow = true;
        this.rightLeg.receiveShadow = true;
        this.rightLeg.geometry.translate(0, -0.33 / 2, 0);
        this.rightLeg.rotateZ(Math.PI / 32); // Slightly rotate the right leg for a more natural stance
        this.group.add(this.rightLeg);
    
        this.leftLeg = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.33, 0.14), material);
        this.leftLeg.position.y = 0.333;
        this.leftLeg.position.z = 0;
        this.leftLeg.position.x = 0.18;
        this.leftLeg.castShadow = true;
        this.leftLeg.receiveShadow = true;
        this.leftLeg.geometry.translate(0, -0.33 / 2, 0);
        this.leftLeg.rotateZ(-Math.PI / 32); // Slightly rotate the left leg for a more natural stance
        this.group.add(this.leftLeg);
    
        this.backpack = new THREE.Mesh(
          new THREE.BoxGeometry(0.30, 0.30, 0.2), material);
        this.backpack.position.y = 0.65;
        this.backpack.position.z = -(0.30 / 2 + 0.2 / 2);
        this.backpack.castShadow = true;
        this.backpack.receiveShadow = true;
        [Math.floor(Math.random() * 3)] + 1 == 1 ? this.group.add(this.backpack) : null;
    }
    update(delta, state){
      const swingSpeed = this.maxSpeed * (this.maxSpeed <= 2 ? 4 : (this.maxSpeed <= 4 ? 3 : 1.5));
      const maxSwingAngle = (Math.PI / (this.maxSpeed <= 2 ? 8 : (this.maxSpeed <= 4 ? 4 : 2))) * (this.state === "Turning" ? 0.25 : 1);
      const headSwingSpeed = this.maxSpeed;
      const maxHeadSwingAngle = Math.PI / 8; // 45 degrees
      const armsAndLegsAngle = state === "Idle" ? 0 : Math.sin(this.deltaSum * swingSpeed) * maxSwingAngle;
      const centralBodyAngle = state === "Idle" ? Math.sin(this.headDeltaSum * headSwingSpeed) * maxHeadSwingAngle : Math.sin(this.deltaSum * swingSpeed) * (maxSwingAngle / 8);
      const headAngle = Math.sin(this.headDeltaSum * headSwingSpeed) * maxHeadSwingAngle;
      this.deltaSum += delta;
      if (state === "Idle"){
        this.deltaSum = 0;
        this.headDeltaSum += delta;
      }
      else {
        this.headDeltaSum = 0;
      }

      // I guess this is where we check the state of the person and apply the appropriate animations. 
      // For example, if the person is walking, we might want to swing their arms and legs. 
      // If they are idle, we might want to have them sway slightly or look around.
      if (this.state !== state) {
        this.deltaSum = 0;
        this.headDeltaSum = 0;
        this.state = state;
        switch (this.state){
          case "Idle":
            this.animations = this.idleAnimations();
            break;
          case "Turning":
            this.animations = this.turningAnimations();
            break;
          case "Moving":
            this.animations = this.movingAnimations();
            break;
          default:
        }
      }
      //  run the animations
      this.animations.forEach(animation => {
        animation.animate(armsAndLegsAngle, headAngle, centralBodyAngle);
      });
    }
    idleAnimations() {
      return [
        new LegIdleAnimation(this),
        new ArmIdleAnimation(this),
        new HeadIdleAnimation(this),
        new ChestIdleAnimation(this),
        new BackpackIdleAnimation(this)
      ];
    }
    movingAnimations() {
      return [
        new LegMovingAnimation(this),
        new ArmMovingAnimation(this),
        new HeadMovingAnimation(this),
        new ChestMovingAnimation(this),
        new BackpackMovingAnimation(this)
      ];
    }
    turningAnimations() {
      return [
        new LegMovingAnimation(this),
        new ArmMovingAnimation(this),
        new HeadIdleAnimation(this),
        new ChestIdleAnimation(this),
        new BackpackIdleAnimation(this)
      ];
    }
}