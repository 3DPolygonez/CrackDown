import { BuildingBlock } from "../mesh/BuildingBlock";

export class Window {
    constructor(name, x, z, width, height, depth) {
        this.name = name;
        this.mesh = new BuildingBlock(x, z, width, height, depth, false, 0.3, "orange");
    }
    update(delta) {

    }
}