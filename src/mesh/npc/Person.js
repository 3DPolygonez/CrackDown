import * as THREE from 'three';
import { PersonDefinition } from './PersonDefinition.js';
import { LegIdleAnimation } from '../../entities/animations/person/legs/LegIdleAnimation.js';
import { LegMovingAnimation } from '../../entities/animations/person/legs/LegsMovingAnimation.js';
import { ArmIdleAnimation } from '../../entities/animations/person/arm/ArmIdleAnimation.js';
import { ArmMovingAnimation } from '../../entities/animations/person/arm/ArmMovingAnimation.js';  
import { HandIdleAnimation } from '../../entities/animations/person/hand/HandIdleAnimation.js';
import { HandMovingAnimation } from '../../entities/animations/person/hand/HandMovingAnimation.js';
import { HeadIdleAnimation } from '../../entities/animations/person/head/HeadIdleAnimation.js';
import { HeadMovingAnimation } from '../../entities/animations/person/head/HeadMovingAnimation.js';
import { ChestIdleAnimation } from '../../entities/animations/person/chest/ChestIdleAnimation.js';
import { ChestMovingAnimation } from '../../entities/animations/person/chest/ChestMovingAnimation.js';
import { WaistIdleAnimation } from '../../entities/animations/person/waist/WaistIdleAnimation.js';
import { WaistMovingAnimation } from '../../entities/animations/person/waist/WaistMovingAnimation.js';
import { BackpackIdleAnimation } from '../../entities/animations/person/backpack/BackpackIdleAnimation.js';
import { BackpackMovingAnimation } from '../../entities/animations/person/backpack/BackpackMovingAnimation.js';

export class Person {
    constructor(debugSystem, maxSpeed, definition) {
        this.debugSystem = debugSystem;
        this.deltaSum = 0;
        this.headDeltaSum = 0;
        this.maxSpeed = maxSpeed;
        this.animationState = "Idle"; // Default state
        this.animations = this.idleAnimations(); // Default animations

        const textureLoader = new THREE.TextureLoader();
        const faceTextures = [
          textureLoader.load(definition.baseTexturePath + "/face/right.png"),
          textureLoader.load(definition.baseTexturePath + "/face/left.png"),
          textureLoader.load(definition.baseTexturePath + "/face/top.png"),
          textureLoader.load(definition.baseTexturePath + "/face/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/face/front.png"),
          textureLoader.load(definition.baseTexturePath + "/face/back.png")
        ];
        faceTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const chestTextures = [
          textureLoader.load(definition.baseTexturePath + "/chest/right.png"),
          textureLoader.load(definition.baseTexturePath + "/chest/left.png"),
          textureLoader.load(definition.baseTexturePath + "/chest/top.png"),
          textureLoader.load(definition.baseTexturePath + "/chest/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/chest/front.png"),
          textureLoader.load(definition.baseTexturePath + "/chest/back.png")
        ];
        chestTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const rightArmTextures = [
          textureLoader.load(definition.baseTexturePath + "/rightArm/right.png"),
          textureLoader.load(definition.baseTexturePath + "/rightArm/left.png"),
          textureLoader.load(definition.baseTexturePath + "/rightArm/top.png"),
          textureLoader.load(definition.baseTexturePath + "/rightArm/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/rightArm/front.png"),
          textureLoader.load(definition.baseTexturePath + "/rightArm/back.png")
        ];
        rightArmTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const rightHandTextures = [
          textureLoader.load(definition.baseTexturePath + "/rightHand/right.png"),
          textureLoader.load(definition.baseTexturePath + "/rightHand/left.png"),
          textureLoader.load(definition.baseTexturePath + "/rightHand/top.png"),
          textureLoader.load(definition.baseTexturePath + "/rightHand/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/rightHand/front.png"),
          textureLoader.load(definition.baseTexturePath + "/rightHand/back.png")
        ];
        rightHandTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const leftArmTextures = [
          textureLoader.load(definition.baseTexturePath + "/leftArm/right.png"),
          textureLoader.load(definition.baseTexturePath + "/leftArm/left.png"),
          textureLoader.load(definition.baseTexturePath + "/leftArm/top.png"),
          textureLoader.load(definition.baseTexturePath + "/leftArm/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/leftArm/front.png"),
          textureLoader.load(definition.baseTexturePath + "/leftArm/back.png")
        ];
        leftArmTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const leftHandTextures = [
          textureLoader.load(definition.baseTexturePath + "/leftHand/right.png"),
          textureLoader.load(definition.baseTexturePath + "/leftHand/left.png"),
          textureLoader.load(definition.baseTexturePath + "/leftHand/top.png"),
          textureLoader.load(definition.baseTexturePath + "/leftHand/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/leftHand/front.png"),
          textureLoader.load(definition.baseTexturePath + "/leftHand/back.png")
        ];
        leftHandTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const waistTextures = [
          textureLoader.load(definition.baseTexturePath + "/waist/right.png"),
          textureLoader.load(definition.baseTexturePath + "/waist/left.png"),
          textureLoader.load(definition.baseTexturePath + "/waist/top.png"),
          textureLoader.load(definition.baseTexturePath + "/waist/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/waist/front.png"),
          textureLoader.load(definition.baseTexturePath + "/waist/back.png")
        ];
        waistTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const rightLegTextures = [
          textureLoader.load(definition.baseTexturePath + "/rightLeg/right.png"),
          textureLoader.load(definition.baseTexturePath + "/rightLeg/left.png"),
          textureLoader.load(definition.baseTexturePath + "/rightLeg/top.png"),
          textureLoader.load(definition.baseTexturePath + "/rightLeg/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/rightLeg/front.png"),
          textureLoader.load(definition.baseTexturePath + "/rightLeg/back.png")
        ];
        rightLegTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const leftLegTextures = [
          textureLoader.load(definition.baseTexturePath + "/leftLeg/right.png"),
          textureLoader.load(definition.baseTexturePath + "/leftLeg/left.png"),
          textureLoader.load(definition.baseTexturePath + "/leftLeg/top.png"),
          textureLoader.load(definition.baseTexturePath + "/leftLeg/bottom.png"),
          textureLoader.load(definition.baseTexturePath + "/leftLeg/front.png"),
          textureLoader.load(definition.baseTexturePath + "/leftLeg/back.png")
        ];
        leftLegTextures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const faceMaterial = faceTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const chestMaterial = chestTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const rightArmMaterial = rightArmTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const rightHandMaterial = rightHandTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const leftArmMaterial = leftArmTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const leftHandMaterial = leftHandTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const waistMaterial = waistTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const rightLegMaterial = rightLegTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        const leftLegMaterial = leftLegTextures.map(t => new THREE.MeshStandardMaterial({ map: t }));

        const material = new THREE.MeshPhongMaterial({ color: "#333333" });

        this.group = new THREE.Group();
        this.headGroup = new THREE.Group;
    
        this.head = new THREE.Mesh(
          new THREE.BoxGeometry(definition.headWidth, definition.headHeight, definition.headDepth), material);
        this.head.position.y = definition.headPositionY;
        this.head.position.z = definition.headPositionZ;
        this.head.castShadow = true;
        this.head.receiveShadow = true;
        //this.headGroup.add(this.head);
    
        this.face = new THREE.Mesh(
          new THREE.BoxGeometry(definition.faceWidth, definition.faceHeight, definition.faceDepth), faceMaterial);
        this.face.position.y = definition.facePositionY;
        this.face.position.z = definition.facePositionZ;
        this.face.castShadow = true;
        this.face.receiveShadow = true;
        this.face.geometry.translate(0, 0, 0); // Translate geometry to rotate around the back  
        if (definition.includeFace){
          this.headGroup.add(this.face);
        }
    
        this.chest = new THREE.Mesh(
          new THREE.BoxGeometry(definition.chestWidth, definition.chestHeight, definition.chestDepth), chestMaterial);
        this.chest.position.y = definition.chestPositionY;
        this.chest.position.z = definition.chestPositionZ;
        this.chest.castShadow = true;
        this.chest.receiveShadow = true;
        if (definition.includeChest){
          this.group.add(this.chest);
        }
    
        this.waist = new THREE.Mesh(
          new THREE.BoxGeometry(definition.waistWidth, definition.waistHeight, definition.waistDepth), waistMaterial);
        this.waist.position.y = definition.waistPositionY;
        this.waist.position.z = definition.waistPositionZ;
        this.waist.castShadow = true;
        this.waist.receiveShadow = true;
        if (definition.includeWaist){
          this.group.add(this.waist);
        }
    
        /*
            right arm
        */
        this.rightArmGroup = new THREE.Group;
        if (debugSystem.showAxisHelper){
          this.rightArmGroup.add(new THREE.AxesHelper(5));
        }
        this.rightArmGroup.position.x = definition.rightArmPositionX + definition.rightArmWidth / 2;
        this.rightArmGroup.position.y = definition.rightArmPositionY;

        this.rightArm = new THREE.Mesh(
          new THREE.BoxGeometry(definition.rightArmWidth, definition.rightArmHeight, definition.rightArmDepth), rightArmMaterial);
        this.rightArm.castShadow = true;
        this.rightArm.receiveShadow = true;
        this.rightArm.geometry.translate(
          -definition.rightArmWidth / 2, 
          -definition.rightArmHeight / 2 - 1, 
          0);
        if (definition.includeRightArm){
          this.rightArmGroup.add(this.rightArm);
        }

        this.rightHand = new THREE.Mesh(
          new THREE.BoxGeometry(definition.rightHandWidth, definition.rightHandHeight, definition.rightHandDepth), rightHandMaterial);
        this.rightHand.castShadow = true;
        this.rightHand.receiveShadow = true;
        this.rightHand.geometry.translate(
          -definition.rightHandWidth / 2, 
          -definition.rightArmHeight - definition.rightHandHeight + 0.5, 
          0);
        if (definition.includeRightHand){
          this.rightArmGroup.add(this.rightHand);
        }

        this.weaponGroup = new THREE.Group;
        if (debugSystem.showAxisHelper){
          this.weaponGroup.add(new THREE.AxesHelper(5));
        }
        this.weaponGroup.position.y = -definition.rightArmHeight;
        this.weaponGroup.position.x = -definition.rightArmWidth / 2;
        this.weaponGroup.position.z = definition.rightArmDepth + 0.5;

        this.smgGrip = new THREE.Mesh(
          new THREE.BoxGeometry(2, 2, 4), material);
        this.smgGrip.geometry.translate(
          0, 
          1, 
          -4);
        this.smgGrip.castShadow = true;
        this.smgGrip.receiveShadow = true;
        this.weaponGroup.add(this.smgGrip);

        this.smgTop = new THREE.Mesh(
          new THREE.BoxGeometry(2, 16, 4), material);
        this.smgTop.geometry.translate(
          0, 
          -4, 
          0);
        this.smgTop.castShadow = true;
        this.smgTop.receiveShadow = true;
        this.weaponGroup.add(this.smgTop);

        this.smgMag = new THREE.Mesh(
          new THREE.BoxGeometry(2, 3, 6), material);
        this.smgMag.geometry.translate(
          0, 
          -4, 
          -5);
        this.smgMag.castShadow = true;
        this.smgMag.receiveShadow = true;
        this.weaponGroup.add(this.smgMag);

        this.smgBarrel = new THREE.Mesh(
          new THREE.BoxGeometry(2, 1, 2), material);
        this.smgBarrel.geometry.translate(
          0, 
          -12, 
          -1);
        this.smgBarrel.castShadow = true;
        this.smgBarrel.receiveShadow = true;
        this.weaponGroup.add(this.smgBarrel);

        if (definition.includeObject){
          this.rightArmGroup.add(this.weaponGroup);
        }

        /*
            left arm
        */
        this.leftArmGroup = new THREE.Group;
        if (debugSystem.showAxisHelper){
          this.leftArmGroup.add(new THREE.AxesHelper(5));
        }
        this.leftArmGroup.position.x = definition.leftArmPositionX - definition.leftArmWidth / 2;
        this.leftArmGroup.position.y = definition.leftArmPositionY;

        this.leftArm = new THREE.Mesh(
          new THREE.BoxGeometry(definition.leftArmWidth, definition.leftArmHeight, definition.leftArmDepth), leftArmMaterial);
        this.leftArm.castShadow = true;
        this.leftArm.receiveShadow = true;
        this.leftArm.geometry.translate(
          definition.leftArmWidth / 2, 
          -definition.leftArmHeight / 2 - 1, 
          0);
        if (definition.includeLeftArm){
          this.leftArmGroup.add(this.leftArm);
        }
    
        this.leftHand = new THREE.Mesh(
          new THREE.BoxGeometry(definition.leftHandWidth, definition.leftHandHeight, definition.leftHandDepth), leftHandMaterial);
        this.leftHand.castShadow = true;
        this.leftHand.receiveShadow = true;
        this.leftHand.geometry.translate(
          definition.leftHandWidth / 2, 
          -definition.leftArmHeight - definition.leftHandHeight + 0.5, 
          0);
        if (definition.includeLeftHand){
          this.leftArmGroup.add(this.leftHand);
        }

        this.rightLeg = new THREE.Mesh(
          new THREE.BoxGeometry(definition.rightLegWidth, definition.rightLegHeight, definition.rightLegDepth), rightLegMaterial);
        this.rightLeg.position.y = definition.rightLegPositionY;
        this.rightLeg.position.z = definition.rightLegPositionZ;
        this.rightLeg.position.x = definition.rightLegPositionX;
        this.rightLeg.castShadow = true;
        this.rightLeg.receiveShadow = true;
        this.rightLeg.geometry.translate(0, -definition.rightLegHeight / 2 - 1, 0);
        this.rightLeg.rotateZ(Math.PI / 32); // Slightly rotate the right leg for a more natural stance
        if (definition.includeRightLeg){
          this.group.add(this.rightLeg);
        }
    
        this.leftLeg = new THREE.Mesh(
          new THREE.BoxGeometry(definition.leftLegWidth, definition.leftLegHeight, definition.leftLegDepth), leftLegMaterial);
        this.leftLeg.position.y = definition.leftLegPositionY;
        this.leftLeg.position.z = definition.leftLegPositionZ;
        this.leftLeg.position.x = definition.leftLegPositionX;
        this.leftLeg.castShadow = true;
        this.leftLeg.receiveShadow = true;
        this.leftLeg.geometry.translate(0, -definition.leftLegHeight / 2 - 1, 0);
        this.leftLeg.rotateZ(-Math.PI / 32); // Slightly rotate the left leg for a more natural stance
        if (definition.includeLeftLeg){
          this.group.add(this.leftLeg);
        }
    
        this.backpack = new THREE.Mesh(
          new THREE.BoxGeometry(10, 8, 6), material);
        this.backpack.position.y = 18;
        this.backpack.position.z = -8;
        this.backpack.castShadow = true;
        this.backpack.receiveShadow = true;
        //this.group.add(this.backpack);

        this.detectionState = new THREE.Mesh(
          new THREE.SphereGeometry(6),
          new THREE.MeshStandardMaterial({ 
              color: "green", // green: Patrolling, orange: Player in FOV, red: Target visible, blue: investigating, black: disabled
              transparent: true, 
              opacity: 0.5
          }));
        this.detectionState.position.y = this.head.position.y + 40;
        this.detectionState.receiveShadow = true;
        this.headGroup.add(this.detectionState);

        this.group.add(this.headGroup);
        this.group.add(this.rightArmGroup);
        this.group.add(this.leftArmGroup);

        this.group.scale.x = definition.scale;
        this.group.scale.y = definition.scale;
        this.group.scale.z = definition.scale;
    }
    update(delta, animationState){
      const swingSpeed = this.maxSpeed * (this.maxSpeed <= 2 ? 4 : (this.maxSpeed <= 4 ? 3 : 1.5));
      const maxSwingAngle = (Math.PI / (this.maxSpeed <= 2 ? 8 : (this.maxSpeed <= 4 ? 4 : 2))) * (this.animationState === "Turning" ? 0.25 : 1);
      const headSwingSpeed = this.maxSpeed;
      const maxHeadSwingAngle = Math.PI / 8; // 45 degrees
      const armsAndLegsAngle = animationState === "Idle" ? 0 : Math.sin(this.deltaSum * swingSpeed) * maxSwingAngle;
      const centralBodyAngle = animationState === "Idle" ? Math.sin(this.headDeltaSum * headSwingSpeed) * maxHeadSwingAngle : Math.sin(this.deltaSum * swingSpeed) * (maxSwingAngle / 8);
      const headAngle = Math.sin(this.headDeltaSum * headSwingSpeed) * maxHeadSwingAngle;
      this.deltaSum += delta;
      if (animationState === "Idle"){
        this.deltaSum = 0;
        this.headDeltaSum += delta;
      }
      else {
        this.headDeltaSum = 0;
      }

      // I guess this is where we check the state of the person and apply the appropriate animations. 
      // For example, if the person is walking, we might want to swing their arms and legs. 
      // If they are idle, we might want to have them sway slightly or look around.
      if (this.animationState !== animationState) {
        this.deltaSum = 0;
        this.headDeltaSum = 0;
        this.animationState = animationState;
        switch (this.animationState){
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
        new HandIdleAnimation(this),
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
        new HandMovingAnimation(this),
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
        new HandMovingAnimation(this),
        new HeadIdleAnimation(this),
        new ChestIdleAnimation(this),
        new WaistIdleAnimation(this),
        new BackpackIdleAnimation(this)
      ];
    }
}