import { BuildingBlock } from "../mesh/environment/BuildingBlock";

export class Grass {
    constructor(name, x, z, width, depth) {
        this.name = name;
        this.mesh = new BuildingBlock(x, z, width, 0.25, depth, false, 0.75, "green", false);
    }
    update(delta) {

    }
}