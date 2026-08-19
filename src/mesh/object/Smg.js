import * as THREE from 'three';
import { Object } from './Object';
import { ObjectDefinition } from './ObjectDefinition';
import { AttachmentPoint } from '../AttachmentPoint';

export class Smg extends Object{
    constructor(debugSystem, definition = {}){
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
                attachmentPoint: new AttachmentPoint(-1, -0.75, 2)
            }));
    }
}