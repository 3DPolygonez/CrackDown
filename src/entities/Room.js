import { BuildingBlock } from "../mesh/BuildingBlock";

export class Room {
    constructor(name, x, z, width, height, depth) {
        this.name = name;
        this.mesh = new BuildingBlock(x, z, width, height, depth, true);
    }
    update(delta) {

    }
}