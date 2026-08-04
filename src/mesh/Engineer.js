import { Person } from './Person.js';
import { PersonDefinition } from './PersonDefinition.js';

export class Engineer extends Person {
    constructor(debugSystem, maxSpeed) {
        super(
            debugSystem,
            maxSpeed,
            "./resources/textures/person/engineer",
            new PersonDefinition());
    }
}