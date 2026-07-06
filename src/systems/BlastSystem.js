export class BlastSystem {
    constructor(scene) {
        this.scene = scene;
        this.blasts = [];
    }
    update(delta) {
        for (const blast of this.blasts) {
            blast.update(
                delta, 
                this.scene, 
                this.blasts);
        }
    }
}