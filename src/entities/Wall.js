import { BuildingBlock } from "../mesh/environment/BuildingBlock";

export class Wall {
    constructor(name, x, z, width, height, depth) {
        this.name = name;
        this.mesh = new BuildingBlock(x, z, width, height, depth, false, 1, "grey");
    }
    update(delta) {

    }
}