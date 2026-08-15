import { Room } from "../entities/Room";
import { Wall } from "../entities/Wall";
import { Window } from "../entities/Window";

export class EnvironmentSystem {
    constructor(scene, width, depth) {
        this.scene = scene;
        this.width = width;
        this.depth = depth; 
        this.items = [
            new Wall(
                "mid horiz window", 
                -15, 0, 
                30, 1, 1),
            new Wall(
                "mid vert wall", 
                0, -15, 
                1, 1, 30),
            new Wall(
                "top wall", 
                -20, -20, 
                40, 1, 1),
            new Wall(
                "right wall", 
                19, -20, 
                1, 1, 40),
            new Wall(
                "bottom wall", 
                -20, 19, 
                40, 1, 1),
            new Wall(
                "left wall", 
                -20, -15, 
                1, 1, 34),
            new Room(
                "main room TL", 
                -15, -15, 
                10, 1, 10),
            new Room(
                "main room TR", 
                5, -15, 
                10, 1, 10),
            new Room(
                "main room BL", 
                -15, 5, 
                10, 1, 10),
            new Room(
                "main room BR", 
                5, 5, 
                10, 1, 10)
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
    getPositions(){
        const positions = [];
        for (const item of this.items) {
            positions.push(item.mesh.group); 
        }  
        return positions;
    }
}