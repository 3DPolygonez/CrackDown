import { Person } from './Person.js';

export class Soldier extends Person {
    constructor(maxSpeed) {
        super(
            maxSpeed,
            "./resources/textures/person/soldier");
    }
}