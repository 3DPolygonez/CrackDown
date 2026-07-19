import { Person } from './Person.js';

export class Engineer extends Person {
    constructor(maxSpeed) {
        super(
            maxSpeed,
            "./resources/textures/person/engineer");
    }
}