export class Level001 extends BaseLevel {
    constructor() {
        super();
        this.name = "Level001";
        this.buildings = [];
        this.buildings.push(new BuildingBlock(0, 0, 10, 5, 10, false, 1, 0x00ff00));
        this.buildings.push(new BuildingBlock(12, 0, 8, 4, 8, true, 1, 0xff0000));
        this.buildings.push(new BuildingBlock(0, 12, 6, 3, 6, false, 1, 0x0000ff));
        this.buildings.push(new BuildingBlock(10, 10, 12, 6, 12, true, 0.5, 0xffff00));
    }
}