import * as THREE from 'three';
import { Object } from './Object';
import { ObjectDefinition } from './ObjectDefinition';
import { AttachmentPoint } from '../AttachmentPoint';
import { rotate } from 'three/tsl';

export class ClipBoard extends Object{
    constructor(debugSystem, definition = {}){
        const textureLoader = new THREE.TextureLoader();
        const textures = [
          textureLoader.load("./resources/textures/object/clipboard/right.png"),
          textureLoader.load("./resources/textures/object/clipboard/left.png"),
          textureLoader.load("./resources/textures/object/clipboard/top.png"),
          textureLoader.load("./resources/textures/object/clipboard/bottom.png"),
          textureLoader.load("./resources/textures/object/clipboard/front.png"),
          textureLoader.load("./resources/textures/object/clipboard/back.png")
        ];
        textures.forEach(texture => {
          texture.colorSpace = THREE.SRGBColorSpace;
        });
        const material = textures.map(t => new THREE.MeshStandardMaterial({ map: t }));

        let item = new THREE.Mesh(
            new THREE.BoxGeometry(10, 6, 0.5), material);
        item.geometry.translate(
            0, 
            3, 
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
                attachmentPoint: new AttachmentPoint(0.25, 0, 0),
                rotateY: Math.PI / 2
            }));
    }
}