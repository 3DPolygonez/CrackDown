import * as THREE from 'three';
import { LegIdleAnimation } from '../entities/animations/person/legs/LegIdleAnimation.js';
import { LegMovingAnimation } from '../entities/animations/person/legs/LegsMovingAnimation.js';
import { ArmIdleAnimation } from '../entities/animations/person/arm/ArmIdleAnimation.js';
import { ArmMovingAnimation } from '../entities/animations/person/arm/ArmMovingAnimation.js';  
import { HeadIdleAnimation } from '../entities/animations/person/head/HeadIdleAnimation.js';
import { HeadMovingAnimation } from '../entities/animations/person/head/HeadMovingAnimation.js';
import { ChestIdleAnimation } from '../entities/animations/person/chest/ChestIdleAnimation.js';
import { ChestMovingAnimation } from '../entities/animations/person/chest/ChestMovingAnimation.js';
import { WaistIdleAnimation } from '../entities/animations/person/waist/WaistIdleAnimation.js';
import { WaistMovingAnimation } from '../entities/animations/person/waist/WaistMovingAnimation.js';
import { BackpackIdleAnimation } from '../entities/animations/person/backpack/BackpackIdleAnimation.js';
import { BackpackMovingAnimation } from '../entities/animations/person/backpack/BackpackMovingAnimation.js';

export class Person {
    constructor(maxSpeed, baseTexturePath) {
        this.deltaSum = 0;
        this.headDeltaSum = 0;
        this.maxSpeed = maxSpeed;
        this.state = "Idle"; // Default state
        this.animations = this.idleAnimations(); // Default animations

        const textureLoader = new THREE.TextureLoader();
        const faceTextures = [
          textureLoader.load(baseTexturePath + "/face/right.png"),
          textureLoader.load(baseTexturePath + "/face/left.png"),
          textureLoader.load(baseTexturePath + "/face/top.png"),
          textureLoader.load(baseTexturePath + "/face/bottom.png"),
          textureLoader.load(baseTexturePath + "/face/front.png"),
          textureLoader.load(baseTexturePath + "/face/back.png")
        ];
        faceTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const chestTextures = [
          textureLoader.load(baseTexturePath + "/chest/right.png"),
          textureLoader.load(baseTexturePath + "/chest/left.png"),
          textureLoader.load(baseTexturePath + "/chest/top.png"),
          textureLoader.load(baseTexturePath + "/chest/bottom.png"),
          textureLoader.load(baseTexturePath + "/chest/front.png"),
          textureLoader.load(baseTexturePath + "/chest/back.png")
        ];
        chestTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const rightArmTextures = [
          textureLoader.load(baseTexturePath + "/rightArm/right.png"),
          textureLoader.load(baseTexturePath + "/rightArm/left.png"),
          textureLoader.load(baseTexturePath + "/rightArm/top.png"),
          textureLoader.load(baseTexturePath + "/rightArm/bottom.png"),
          textureLoader.load(baseTexturePath + "/rightArm/front.png"),
          textureLoader.load(baseTexturePath + "/rightArm/back.png")
        ];
        rightArmTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const leftArmTextures = [
          textureLoader.load(baseTexturePath + "/leftArm/right.png"),
          textureLoader.load(baseTexturePath + "/leftArm/left.png"),
          textureLoader.load(baseTexturePath + "/leftArm/top.png"),
          textureLoader.load(baseTexturePath + "/leftArm/bottom.png"),
          textureLoader.load(baseTexturePath + "/leftArm/front.png"),
          textureLoader.load(baseTexturePath + "/leftArm/back.png")
        ];
        leftArmTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const waistTextures = [
          textureLoader.load(baseTexturePath + "/waist/right.png"),
          textureLoader.load(baseTexturePath + "/waist/left.png"),
          textureLoader.load(baseTexturePath + "/waist/top.png"),
          textureLoader.load(baseTexturePath + "/waist/bottom.png"),
          textureLoader.load(baseTexturePath + "/waist/front.png"),
          textureLoader.load(baseTexturePath + "/waist/back.png")
        ];
        waistTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const rightLegTextures = [
          textureLoader.load(baseTexturePath + "/rightLeg/right.png"),
          textureLoader.load(baseTexturePath + "/rightLeg/left.png"),
          textureLoader.load(baseTexturePath + "/rightLeg/top.png"),
          textureLoader.load(baseTexturePath + "/rightLeg/bottom.png"),
          textureLoader.load(baseTexturePath + "/rightLeg/front.png"),
          textureLoader.load(baseTexturePath + "/rightLeg/back.png")
        ];
        rightLegTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const leftLegTextures = [
          textureLoader.load(baseTexturePath + "/leftLeg/right.png"),
          textureLoader.load(baseTexturePath + "/leftLeg/left.png"),
          textureLoader.load(baseTexturePath + "/leftLeg/top.png"),
          textureLoader.load(baseTexturePath + "/leftLeg/bottom.png"),
          textureLoader.load(baseTexturePath + "/leftLeg/front.png"),
          textureLoader.load(baseTexturePath + "/leftLeg/back.png")
        ];
        leftLegTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const faceMaterial = faceTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const chestMaterial = chestTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const rightArmMaterial = rightArmTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const leftArmMaterial = leftArmTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const waistMaterial = waistTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const rightLegMaterial = rightLegTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const leftLegMaterial = leftLegTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));

        const material = new THREE.MeshPhongMaterial({ color: this.maxSpeed == 2 ? "green" : (this.maxSpeed == 4 ? "orange" : "red") });

        this.group = new THREE.Group();
    
        this.head = new THREE.Mesh(
          new THREE.BoxGeometry(12, 12, 12), material);
        this.head.position.y = 26;
        this.head.position.z = 2;
        this.head.castShadow = true;
        this.head.receiveShadow = true;
        //this.group.add(this.head);
    
        this.face = new THREE.Mesh(
          new THREE.BoxGeometry(10, 10, 10), faceMaterial);
        this.face.position.y = 25;
        this.face.position.z = 2;
        this.face.castShadow = true;
        this.face.receiveShadow = true;
        this.face.geometry.translate(0, 0, 0); // Translate geometry to rotate around the back  
        this.group.add(this.face);
    
        this.chest = new THREE.Mesh(
          new THREE.BoxGeometry(16, 6, 10), chestMaterial);
        this.chest.position.y = 16;
        this.chest.position.z = 0;
        this.chest.castShadow = true;
        this.chest.receiveShadow = true;
        this.group.add(this.chest);
    
        this.waist = new THREE.Mesh(
          new THREE.BoxGeometry(10, 4, 10), waistMaterial);
        this.waist.position.y = 11;
        this.waist.position.z = 0;
        this.waist.castShadow = true;
        this.waist.receiveShadow = true;
        this.group.add(this.waist);
    
        this.rightArm = new THREE.Mesh(
          new THREE.BoxGeometry(6, 12, 6), rightArmMaterial);
        this.rightArm.position.y = 19;
        this.rightArm.position.z = 0;
        this.rightArm.position.x = -11;
        this.rightArm.castShadow = true;
        this.rightArm.receiveShadow = true;
        this.rightArm.geometry.translate(0, -7, 0); // Translate geometry to rotate around the top
        this.group.add(this.rightArm);
    
        this.leftArm = new THREE.Mesh(
          new THREE.BoxGeometry(6, 12, 6), leftArmMaterial);
        this.leftArm.position.y = 19;
        this.leftArm.position.z = 0;
        this.leftArm.position.x = 11;
        this.leftArm.castShadow = true;
        this.leftArm.receiveShadow = true;
        this.leftArm.geometry.translate(0, -7, 0);
        this.group.add(this.leftArm);
    
        this.rightLeg = new THREE.Mesh(
          new THREE.BoxGeometry(4, 9, 4), rightLegMaterial);
        this.rightLeg.position.y = 9;
        this.rightLeg.position.z = 0;
        this.rightLeg.position.x = -5;
        this.rightLeg.castShadow = true;
        this.rightLeg.receiveShadow = true;
        this.rightLeg.geometry.translate(0, -5, 0);
        this.rightLeg.rotateZ(Math.PI / 32); // Slightly rotate the right leg for a more natural stance
        this.group.add(this.rightLeg);
    
        this.leftLeg = new THREE.Mesh(
          new THREE.BoxGeometry(4, 9, 4), leftLegMaterial);
        this.leftLeg.position.y = 9;
        this.leftLeg.position.z = 0;
        this.leftLeg.position.x = 5;
        this.leftLeg.castShadow = true;
        this.leftLeg.receiveShadow = true;
        this.leftLeg.geometry.translate(0, -5, 0);
        this.leftLeg.rotateZ(-Math.PI / 32); // Slightly rotate the left leg for a more natural stance
        this.group.add(this.leftLeg);
    
        this.backpack = new THREE.Mesh(
          new THREE.BoxGeometry(10, 8, 6), material);
        this.backpack.position.y = 18;
        this.backpack.position.z = -8;
        this.backpack.castShadow = true;
        this.backpack.receiveShadow = true;
        //this.group.add(this.backpack);

        this.coneOfVision = new THREE.Mesh(
          new THREE.ConeGeometry(250, 500, 32), 
          new THREE.MeshStandardMaterial({ 
              color: "red", 
              transparent: true, 
              opacity: 0.1 
          }));
        this.coneOfVision.position.y = 25;
        this.coneOfVision.position.z = 250;
        this.coneOfVision.rotateX(-Math.PI / 2);
        this.group.add(this.coneOfVision);

        this.group.scale.x = 0.025;
        this.group.scale.y = 0.025;
        this.group.scale.z = 0.025;
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
        new WaistIdleAnimation(this),
        new BackpackIdleAnimation(this)
      ];
    }
    movingAnimations() {
      return [
        new LegMovingAnimation(this),
        new ArmMovingAnimation(this),
        new HeadMovingAnimation(this),
        new ChestMovingAnimation(this),
        new WaistMovingAnimation(this),
        new BackpackMovingAnimation(this)
      ];
    }
    turningAnimations() {
      return [
        new LegMovingAnimation(this),
        new ArmMovingAnimation(this),
        new HeadIdleAnimation(this),
        new ChestIdleAnimation(this),
        new WaistIdleAnimation(this),
        new BackpackIdleAnimation(this)
      ];
    }
}