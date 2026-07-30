import { Person } from './Person.js';

export class Soldier extends Person {
    constructor(debugSystem, maxSpeed) {
        super(
            debugSystem,
            maxSpeed,
            "./resources/textures/person/soldier");
    }
}