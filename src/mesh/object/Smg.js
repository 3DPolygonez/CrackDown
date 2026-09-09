import * as THREE from 'three';
import { Object } from './Object';
import { ObjectDefinition } from './ObjectDefinition';
import { AttachmentPoint } from '../AttachmentPoint';

export class Smg extends Object{
    constructor(debugSystem, bulletSystem, definition = {}){
        const material = new THREE.MeshPhongMaterial({ color: "#333333" });

        let smgGrip = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 2, 4), material);
        smgGrip.geometry.translate(
          0, 
          1, 
          -4);
        smgGrip.castShadow = true;
        smgGrip.receiveShadow = true;

        let smgTop = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 12, 2), material);
        smgTop.geometry.translate(
          0, 
          -3, 
          -1);
        smgTop.castShadow = true;
        smgTop.receiveShadow = true;

        let smgMag = new THREE.Mesh(
          new THREE.BoxGeometry(1.5, 2, 6), material);
        smgMag.geometry.translate(
          0, 
          -3, 
          -5);
        smgMag.castShadow = true;
        smgMag.receiveShadow = true;
        
        super(
            debugSystem,
            new ObjectDefinition(
            {
                ...definition,
                meshes: [
                    smgGrip,
                    smgTop,
                    smgMag
                ],
                attachmentPoint: new AttachmentPoint(-1, -0.75, 2, -Math.PI / 2)
            }));

        this.bulletSystem = bulletSystem;
        this.shootCooldown = 0;
        this.shootWait = 0.25;
    }
    update(delta){
      this.shootCooldown -= delta;
    }
    use(source, target){
      // SPEED == ZERO?
      // this.mesh.rightForeArmGroup.rotation.x = 0;
      // this.mesh.rightForeArmGroup.rotateX(this.object.getAttachmentPoint().onUserGroupRotateX);
      if (this.shootCooldown <= 0) {
        let targetWorldPosition = new THREE.Vector3();
        let smgWorlPosition = new THREE.Vector3();

        target.get3DObject().getWorldPosition(targetWorldPosition);
        this.get3DObject().getWorldPosition(smgWorlPosition);

        const directionVector = new THREE.Vector3().subVectors(
          targetWorldPosition, 
          smgWorlPosition);

        this.bulletSystem.shoot(
          smgWorlPosition, 
          directionVector);
        this.shootCooldown = this.shootWait;
      }
    }
}