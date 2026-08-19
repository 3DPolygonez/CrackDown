import * as THREE from 'three';
import { Object } from './Object';
import { ObjectDefinition } from './ObjectDefinition';
import { AttachmentPoint } from '../AttachmentPoint';

export class Box extends Object{
    constructor(debugSystem, definition = {}){
        const material = new THREE.MeshPhongMaterial({ color: "#000000" });

        let item = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1), material);
        item.geometry.translate(
          0, 
          0, 
          0);
        item.castShadow = true;
        item.receiveShadow = true;
        
        super(
            debugSystem,
            new ObjectDefinition(
            {
                ...definition,
                meshes: [
                    item
                ],
                attachmentPoint: new AttachmentPoint(0, 0, 0)
            }));
    }
}