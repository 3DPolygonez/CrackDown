import { Person } from './Person.js';

export class Engineer extends Person {
    constructor(debugSystem, maxSpeed) {
        super(
            debugSystem,
            maxSpeed,
            "./resources/textures/person/engineer");
    }
}