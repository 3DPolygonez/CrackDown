import { BuildingBlock } from "../mesh/BuildingBlock";

export class Wall {
    constructor(name, x, z, width, height, depth) {
        this.name = name;
        this.mesh = new BuildingBlock(x, z, width, height, depth, false);
    }
    update(delta) {

    }
}