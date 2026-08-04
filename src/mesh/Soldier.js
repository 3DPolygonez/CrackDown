import { Person } from './Person.js';
import { PersonDefinition } from './PersonDefinition.js';

export class Soldier extends Person {
    constructor(debugSystem, maxSpeed) {
        super(
            debugSystem,
            maxSpeed,
            "./resources/textures/person/soldier",
            new PersonDefinition());
    }
}