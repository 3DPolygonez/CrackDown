import * as THREE from 'three';

export class Object{
    #debugSystem;
    #group;
    #meshes;
    #attachmentPoint;
    constructor(debugSystem, definition = {}){
        console.log(definition);
        this.#debugSystem = debugSystem;
        this.#group = new THREE.Group();
        this.#meshes = definition.meshes;
        for (const mesh of this.#meshes) {
            this.#group.add(mesh);
        }
        this.#group.rotateX(definition.rotateX);
        this.#group.rotateY(definition.rotateY);
        this.#group.rotateZ(definition.rotateZ);
        this.#attachmentPoint = definition.attachmentPoint;
        if (debugSystem.showAxisHelper){
            this.#group.add(new THREE.AxesHelper(5));
        }
    }
    getAttachmentPoint(){
        return this.#attachmentPoint.getPoint();
    }
    getPosition(){
        return this.#group.position;
    }
    get3DObject(){
        return this.#group;
    }
    update(delta, animationState){
        
    }
}