import { Room } from "../entities/Room";
import { Wall } from "../entities/Wall";

export class EnvironmentSystem {
    constructor(scene) {
        this.scene = scene;
        this.items = [
            new Wall(
                "top wall", 
                -20, -20, 
                40, 1.5, 1),
            new Wall(
                "right wall", 
                19, -20, 
                1, 1.5, 40),
            new Wall(
                "bottom wall", 
                -20, 19, 
                40, 1.5, 1),
            new Wall(
                "left wall", 
                -20, -15, 
                1, 1.5, 34),
            new Room(
                "main room TL", 
                -15, -15, 
                10, 2, 10),
            new Room(
                "main room TR", 
                5, -15, 
                10, 3, 10),
            new Room(
                "main room BL", 
                -15, 5, 
                10, 1.5, 10),
            new Room(
                "main room BR", 
                5, 5, 
                10, 5, 10)
        ];
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
}