export class EnvironmentSystem {
    constructor(scene, width, depth, items) {
        this.scene = scene;
        this.width = width;
        this.depth = depth; 
        this.items = items;
        for (const item of this.items) {
            this.scene.add(item.mesh.group); 
        }   
    }
    update(delta) {
        for (const item of this.items) {
            item.update(
                delta);
        }
    }
    getPositions(){
        const positions = [];
        for (const item of this.items) {
            positions.push(item.mesh.group); 
        }  
        return positions;
    }
}