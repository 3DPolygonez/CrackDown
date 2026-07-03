import * as THREE from 'three';

export class Person {
    constructor(maxSpeed) {
        this.deltaSum = 0;
        this.maxSpeed = maxSpeed;

        const textureLoader = new THREE.TextureLoader();
        const textures = [
            textureLoader.load("../resources/textures/person/soldier/head/right.png"),
            textureLoader.load("../resources/textures/person/soldier/head/left.png"),
            textureLoader.load("../resources/textures/person/soldier/head/top.png"),
            textureLoader.load("../resources/textures/person/soldier/head/bottom.png"),
            textureLoader.load("../resources/textures/person/soldier/head/front.png"),
            textureLoader.load("../resources/textures/person/soldier/head/back.png")
        ];
        const materials = textures.map(t => new THREE.MeshStandardMaterial({ map: t }));
        
        const material = new THREE.MeshPhongMaterial({ color: this.maxSpeed == 2 ? "green" : (this.maxSpeed == 4 ? "orange" : "red") });
        const faceMaterial = new THREE.MeshPhongMaterial({ color: "white" });

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
    
        const scale = Math.floor(Math.random() * 3) + 1; // Random scale between 1 and 3
        //this.group.scale.set(scale, scale, scale);
    }
    update(delta, paused){
      this.deltaSum += delta;

      const swingSpeed = this.maxSpeed * (this.maxSpeed <= 2 ? 4 : (this.maxSpeed <= 4 ? 3 : 1.5));
      const maxSwingAngle = Math.PI / (this.maxSpeed <= 2 ? 8 : (this.maxSpeed <= 4 ? 4 : 2)); // 45 degrees
      const angle = paused ? 0 : Math.sin(this.deltaSum * swingSpeed) * maxSwingAngle;

      this.rightArm.rotation.x = angle;
      this.leftArm.rotation.x = -angle;
      this.rightLeg.rotation.x = -angle;
      this.leftLeg.rotation.x = angle;

      this.head.rotation.y = -angle / 8;
      this.face.rotation.y = -angle/ 8;

      this.head.rotation.z = paused ? 0 :Math.sin(this.deltaSum * swingSpeed) * (maxSwingAngle / 8);  
      this.face.rotation.z = paused ? 0 :Math.sin(this.deltaSum * swingSpeed) * (maxSwingAngle / 8);  
      this.chest.rotation.z = paused ? 0 :Math.sin(this.deltaSum * swingSpeed) * (maxSwingAngle / 8);
    }
}