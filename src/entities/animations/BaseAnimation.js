export class BaseAnimation {
    constructor(mesh) {
        this.mesh = mesh;
    }
    animate(angleX, angleY, angleZ) {
        throw new Error("animate() method must be implemented in subclasses.");
    } 
}