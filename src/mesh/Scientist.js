import { Person } from './Person.js';

export class Scientist extends Person {
    constructor(debugSystem, maxSpeed) {
        super(
            debugSystem,
            maxSpeed,
            "./resources/textures/person/scientist");
    }
}