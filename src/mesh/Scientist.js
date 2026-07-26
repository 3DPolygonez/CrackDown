import { Person } from './Person.js';

export class Scientist extends Person {
    constructor(maxSpeed) {
        super(
            maxSpeed,
            "./resources/textures/person/scientist");
    }
}