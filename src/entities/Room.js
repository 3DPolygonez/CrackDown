import { BuildingBlock } from "../mesh/environment/BuildingBlock";

export class Room {
    constructor(name, x, z, width, height, depth) {
        this.name = name;
        this.mesh = new BuildingBlock(x, z, width, height, depth, true, 1, "grey");
    }
    update(delta) {

    }
}