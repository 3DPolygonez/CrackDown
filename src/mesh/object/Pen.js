import * as THREE from 'three';
import { Object } from './Object';
import { ObjectDefinition } from './ObjectDefinition';
import { AttachmentPoint } from '../AttachmentPoint';

export class Pen extends Object{
    constructor(debugSystem, definition = {}){
        super(
            debugSystem,
            new ObjectDefinition(
            {
                ...definition,
                meshes: [],
                attachmentPoint: new AttachmentPoint(0, 0, 0)
            }));
    }
    update(delta){

    }
    use(source, target){
        
    }
}